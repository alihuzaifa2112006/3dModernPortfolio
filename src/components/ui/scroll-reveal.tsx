import React, { useRef } from 'react'
import { motion, useInView, type Transition } from 'motion/react'
import { cn } from '../../lib/utils'

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'zoom'

const revealVariants: Record<
  RevealVariant,
  { hidden: Record<string, number | string>; visible: Record<string, number | string> }
> = {
  up: { hidden: { opacity: 0, y: 56 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -56 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -56 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 56 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.86 }, visible: { opacity: 1, scale: 1 } },
  blur: {
    hidden: { opacity: 0, y: 36, filter: 'blur(14px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  zoom: { hidden: { opacity: 0, scale: 0.72, y: 40 }, visible: { opacity: 1, scale: 1, y: 0 } },
}

const easeOut: Transition['ease'] = [0.16, 1, 0.3, 1]

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  variant?: RevealVariant
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  variant = 'up',
  delay = 0,
  duration = 0.75,
  once = true,
  amount = 0.12,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once,
    amount,
    margin: '0px 0px -48px 0px',
  })

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={revealVariants[variant]}
      transition={{ duration, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
  once?: boolean
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0.05,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: 0.08, margin: '0px 0px -40px 0px' })

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  variant?: RevealVariant
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
  variant = 'up',
}) => (
  <motion.div
    className={cn(className)}
    variants={revealVariants[variant]}
    transition={{ duration: 0.7, ease: easeOut }}
  >
    {children}
  </motion.div>
)
