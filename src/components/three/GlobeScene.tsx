import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { QuadraticBezierLine } from '@react-three/drei'

const RADIUS = 1.5
const damp = THREE.MathUtils.damp

const fibonacciSphere = (count: number, radius: number) => {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    positions[i * 3] = Math.cos(theta) * r * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return positions
}

const toVec = (lat: number, lon: number, radius = RADIUS) => {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

// Karachi out to a handful of hubs
const HOME = { lat: 24.86, lon: 67.0 }
const DESTINATIONS = [
  { lat: 25.2, lon: 55.27 }, // Dubai
  { lat: 51.5, lon: -0.12 }, // London
  { lat: 40.7, lon: -74.0 }, // New York
  { lat: 1.35, lon: 103.8 }, // Singapore
  { lat: -33.86, lon: 151.2 }, // Sydney
  { lat: 52.52, lon: 13.4 }, // Berlin
]

const atmosphereShader = {
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      gl_FragColor = vec4(0.77, 0.97, 0.16, 1.0) * intensity;
    }
  `,
}

function Arc({ to, delay }: { to: THREE.Vector3; delay: number }) {
  const lineRef = useRef<any>(null)
  const start = useMemo(() => toVec(HOME.lat, HOME.lon), [])
  const mid = useMemo(() => {
    const m = start.clone().add(to).multiplyScalar(0.5)
    const lift = 1 + start.distanceTo(to) * 0.35
    return m.normalize().multiplyScalar(RADIUS * lift)
  }, [start, to])

  useFrame((_, dt) => {
    if (lineRef.current?.material) lineRef.current.material.dashOffset -= dt * 0.6
  })

  return (
    <group>
      <QuadraticBezierLine
        ref={lineRef}
        start={start}
        end={to}
        mid={mid}
        color="#c5f82a"
        lineWidth={1.4}
        dashed
        dashScale={6}
        dashSize={0.6 + delay * 0.1}
        gapSize={0.5}
        transparent
        opacity={0.85}
      />
      <mesh position={to}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function Globe() {
  const group = useRef<THREE.Group>(null!)
  const pointer = useRef({ x: 0, y: 0 })
  const positions = useMemo(() => fibonacciSphere(2200, RADIUS), [])
  const home = useMemo(() => toVec(HOME.lat, HOME.lon, RADIUS * 1.005), [])
  const destinations = useMemo(() => DESTINATIONS.map((d) => toVec(d.lat, d.lon)), [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, dt) => {
    const g = group.current
    g.rotation.y += dt * 0.1
    g.rotation.x = damp(g.rotation.x, 0.35 - pointer.current.y * 0.2, 2, dt)
    g.rotation.z = damp(g.rotation.z, 0.12 + pointer.current.x * 0.1, 2, dt)
  })

  return (
    <group ref={group} rotation={[0.35, -2.2, 0.12]}>
      {/* occluder so back-facing dots fall away */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 64, 64]} />
        <meshBasicMaterial color="#07070a" />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.022} color="#9fb5a0" transparent opacity={0.8} sizeAttenuation depthWrite={false} />
      </points>

      <mesh position={home}>
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshBasicMaterial color="#c5f82a" toneMapped={false} />
      </mesh>

      {destinations.map((to, i) => (
        <Arc key={i} to={to} delay={i} />
      ))}

      <mesh scale={1.18}>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <shaderMaterial
          {...atmosphereShader}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[RADIUS * 1.45, 0.004, 8, 200]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

export default function GlobeScene({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Globe />
    </Canvas>
  )
}
