import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { cn } from '../../lib/utils'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

/** Pulls its child toward the cursor while hovered. */
export const Magnetic: React.FC<MagneticProps> = ({ children, className, strength = 0.3 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const handleMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  )
}
