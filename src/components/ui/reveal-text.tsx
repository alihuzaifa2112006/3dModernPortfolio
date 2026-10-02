import React from 'react'
import { motion, type Variants } from 'motion/react'
import { cn } from '../../lib/utils'

export interface TextSegment {
  text: string
  className?: string
}

interface RevealTextProps {
  segments: TextSegment[]
  className?: string
  delay?: number
  stagger?: number
  /** When given, controls playback; otherwise plays once when scrolled into view. */
  play?: boolean
}

const word: Variants = {
  hidden: { y: '115%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
}

/** Masked word-by-word rise. */
export const RevealText: React.FC<RevealTextProps> = ({ segments, className, delay = 0, stagger = 0.06, play }) => {
  const controlled = play !== undefined
  const words = segments.flatMap((seg) =>
    seg.text.split(' ').filter(Boolean).map((w) => ({ w, className: seg.className })),
  )

  return (
    <motion.span
      className={cn('inline', className)}
      initial="hidden"
      {...(controlled
        ? { animate: play ? 'show' : 'hidden' }
        : { whileInView: 'show', viewport: { once: true, amount: 0.4 } })}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map(({ w, className: wc }, i) => (
        <React.Fragment key={i}>
          <span className="-mx-[0.06em] -mb-[0.12em] inline-block overflow-hidden px-[0.06em] pb-[0.12em] align-bottom">
            <motion.span variants={word} className={cn('inline-block origin-bottom-left', wc)}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </motion.span>
  )
}
