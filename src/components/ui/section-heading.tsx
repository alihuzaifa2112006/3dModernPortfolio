import React from 'react'
import { motion } from 'motion/react'
import { RevealText } from './reveal-text'
import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  index: string
  label: string
  title: string
  accent: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  label,
  title,
  accent,
  description,
  align = 'left',
  className,
}) => {
  const centered = align === 'center'

  return (
    <div className={cn(centered && 'mx-auto text-center', className)}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-mute uppercase',
          centered && 'justify-center',
        )}
      >
        <span className="text-brand">({index})</span>
        <span className="h-px w-10 bg-line-strong" />
        <span>{label}</span>
      </motion.div>

      <h2 className="mt-6 font-display text-[clamp(2.6rem,6.4vw,6rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-white">
        <RevealText
          segments={[
            { text: title },
            { text: accent, className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' },
          ]}
        />
      </h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn('mt-6 max-w-xl text-[15px] leading-relaxed text-mute sm:text-base', centered && 'mx-auto')}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
