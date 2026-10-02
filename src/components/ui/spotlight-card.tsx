import React from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { cn } from '../../lib/utils'

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  /** rgb triplet, e.g. "197,248,42" */
  rgb?: string
}

/** Card whose border and surface light up around the cursor. */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className, rgb = '197,248,42', ...rest }) => {
  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const surface = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(${rgb},0.10), transparent 60%)`
  const border = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, rgba(${rgb},0.75), transparent 60%)`

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  return (
    <div
      onPointerMove={handleMove}
      className={cn(
        'group/spot relative overflow-hidden rounded-[28px] border border-line bg-ink-2',
        className,
      )}
      {...rest}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: surface }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: border,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {children}
    </div>
  )
}
