import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { cn } from '../../lib/utils'

interface TiltProps {
  children: React.ReactNode
  className?: string
  /** Max rotation in degrees on each axis. */
  max?: number
  perspective?: number
  glare?: boolean
}

/**
 * Rotates in 3D toward the cursor. Children can use `translateZ` (e.g. `[transform:translateZ(40px)]`)
 * to float above the surface, since the card keeps `preserve-3d`.
 */
export const Tilt: React.FC<TiltProps> = ({ children, className, max = 8, perspective = 1100, glare = false }) => {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 160, damping: 18 })
  const rotateY = useSpring(ry, { stiffness: 160, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glareOpacity = useSpring(0, { stiffness: 120, damping: 20 })
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.28), transparent 55%)`

  const handleMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * max * 2)
    rx.set(-(py - 0.5) * max * 2)
    gx.set(px * 100)
    gy.set(py * 100)
    glareOpacity.set(1)
  }

  const reset = () => {
    rx.set(0)
    ry.set(0)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: perspective, transformStyle: 'preserve-3d' }}
      className={cn('relative will-change-transform', className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-overlay"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  )
}
