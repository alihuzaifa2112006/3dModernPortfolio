import React, { useEffect, useRef } from 'react'
import { animate, useInView } from 'motion/react'

interface CountUpProps {
  /** e.g. "8+", "100%" — the leading integer animates, the rest is kept as a suffix. */
  value: string
  className?: string
  duration?: number
}

export const CountUp: React.FC<CountUpProps> = ({ value, className, duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : value

  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, target, suffix, duration])

  return (
    <span ref={ref} className={className}>
      {match ? `0${suffix}` : value}
    </span>
  )
}
