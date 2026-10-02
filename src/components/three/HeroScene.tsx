import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  RoundedBox,
  Sparkles,
} from '@react-three/drei'

type Quality = 'high' | 'low'

const damp = THREE.MathUtils.damp

/** Soft lime / violet / cyan blobs behind the glass so the refraction has colour to bend. */
function GlowBackdrop() {
  const texture = useMemo(() => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const blob = (x: number, y: number, r: number, color: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, color)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, size, size)
    }
    blob(190, 210, 210, 'rgba(197,248,42,0.85)')
    blob(330, 320, 230, 'rgba(139,92,246,0.9)')
    blob(340, 150, 130, 'rgba(34,211,238,0.55)')
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  useEffect(() => () => texture.dispose(), [texture])

  return (
    <mesh position={[0, 0, -2.6]} scale={7.5}>
      <planeGeometry />
      <meshBasicMaterial map={texture} transparent opacity={0.55} depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

function GlassKnot({ quality }: { quality: Quality }) {
  const ref = useRef<THREE.Mesh>(null!)
  const background = useMemo(() => new THREE.Color('#050507'), [])

  useFrame((_, dt) => {
    ref.current.rotation.x += dt * 0.12
    ref.current.rotation.y += dt * 0.18
  })

  const high = quality === 'high'

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.34, high ? 300 : 160, high ? 44 : 24]} />
      <MeshTransmissionMaterial
        background={background}
        backside={high}
        backsideThickness={0.4}
        samples={high ? 8 : 4}
        resolution={high ? 768 : 256}
        transmission={1}
        thickness={0.9}
        roughness={0.04}
        ior={1.32}
        chromaticAberration={0.55}
        anisotropicBlur={0.25}
        distortion={0.35}
        distortionScale={0.45}
        temporalDistortion={0.12}
        clearcoat={1}
        attenuationDistance={1.4}
        attenuationColor="#f1ffd1"
        color="#ffffff"
      />
    </mesh>
  )
}

function Satellites() {
  const group = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    group.current.rotation.y += dt * 0.08
  })

  return (
    <group ref={group}>
      <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.6}>
        <mesh position={[2.15, 1.15, 0.3]}>
          <sphereGeometry args={[0.15, 48, 48]} />
          <meshStandardMaterial color="#c5f82a" emissive="#c5f82a" emissiveIntensity={0.9} roughness={0.25} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={2} floatIntensity={1.2}>
        <RoundedBox args={[0.42, 0.42, 0.42]} radius={0.09} smoothness={4} position={[-2.15, -0.95, 0.7]}>
          <meshStandardMaterial color="#1a1a22" metalness={1} roughness={0.12} />
        </RoundedBox>
      </Float>
      <Float speed={1.9} rotationIntensity={2.4} floatIntensity={1.4}>
        <mesh position={[-1.75, 1.45, -0.5]}>
          <icosahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.5} roughness={0.18} flatShading />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={1.8} floatIntensity={1.8}>
        <mesh position={[1.7, -1.55, 0.9]} rotation={[0.6, 0.3, 0]}>
          <torusGeometry args={[0.2, 0.07, 24, 64]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.08} />
        </mesh>
      </Float>
      <Float speed={2.6} rotationIntensity={0.6} floatIntensity={2}>
        <mesh position={[0.4, 2.0, -1.2]}>
          <sphereGeometry args={[0.07, 32, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
        </mesh>
      </Float>
    </group>
  )
}

/** Positions the composition, eases it in once the intro lifts, and follows pointer + scroll. */
function Rig({ ready, children }: { ready: boolean; children: ReactNode }) {
  const group = useRef<THREE.Group>(null!)
  const pointer = useRef({ x: 0, y: 0 })
  const { viewport, size } = useThree()

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, dt) => {
    const g = group.current
    const wide = size.width >= 1024
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2)
    const { x: px, y: py } = pointer.current

    const baseX = wide ? viewport.width * 0.25 : 0
    const baseY = wide ? -0.1 : viewport.height * 0.25
    const baseScale = wide ? Math.min(0.82, viewport.width / 9.5) : Math.min(0.72, viewport.width / 4.9)
    const targetScale = ready ? baseScale * (1 - scroll * 0.2) : 0.001

    g.position.x = damp(g.position.x, baseX, 4, dt)
    g.position.y = damp(g.position.y, baseY + scroll * 1.6, 4, dt)
    g.rotation.y = damp(g.rotation.y, px * 0.35 + (ready ? 0 : -1.4), 2.5, dt)
    g.rotation.x = damp(g.rotation.x, -py * 0.22 + scroll * 0.7, 2.5, dt)
    g.scale.setScalar(damp(g.scale.x, targetScale, ready ? 2.6 : 10, dt))

    state.camera.position.x = damp(state.camera.position.x, px * 0.25, 2, dt)
    state.camera.position.y = damp(state.camera.position.y, py * 0.18, 2, dt)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group} scale={0.001}>
      {children}
    </group>
  )
}

interface HeroSceneProps {
  active: boolean
  ready: boolean
}

export default function HeroScene({ active, ready }: HeroSceneProps) {
  const quality: Quality = useMemo(
    () => (window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4 ? 'low' : 'high'),
    [],
  )

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={quality === 'high' ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 0, 6.5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 5]} intensity={1.4} />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#8b5cf6" />

      <Rig ready={ready}>
        <GlowBackdrop />
        <GlassKnot quality={quality} />
        <Satellites />
      </Rig>

      <Sparkles
        count={quality === 'high' ? 90 : 40}
        scale={[12, 7, 5]}
        size={2.4}
        speed={0.3}
        opacity={0.65}
        color="#c5f82a"
      />

      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          <Lightformer
            form="ring"
            color="#c5f82a"
            intensity={5}
            position={[10, 10, 0]}
            scale={10}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
          <Lightformer
            form="rect"
            color="#8b5cf6"
            intensity={5}
            position={[-8, -4, 4]}
            scale={[8, 3, 1]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </group>
      </Environment>
    </Canvas>
  )
}
