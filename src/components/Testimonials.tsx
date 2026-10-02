import React, { useCallback, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { SectionHeading } from './ui/section-heading'
import { CountUp } from './ui/count-up'
import { testimonials } from '../data/site'
import { cn } from '../lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

const STATS = [
  { value: '8+', label: 'Projects completed' },
  { value: '5+', label: 'Happy clients' },
  { value: '2+', label: 'Years experience' },
  { value: '100%', label: 'Responsive UI' },
]

const GRADIENTS = ['from-brand to-emerald-400', 'from-violet to-fuchsia-400', 'from-cyan-300 to-sky-500']

const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = testimonials.length

  const next = useCallback(() => setActive((a) => (a + 1) % n), [n])
  const prev = useCallback(() => setActive((a) => (a - 1 + n) % n), [n])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [paused, next, active])

  return (
    <section id="testimonials" className="relative overflow-hidden py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute top-1/3 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(139,92,246,0.12),transparent_65%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="06"
          label="Testimonials"
          title="Kind words from"
          accent="clients."
          align="center"
          description="Building modern web experiences with clean UI, scalable architecture, and powerful frontend engineering for startups and agencies."
        />

        <motion.div
          className="relative mt-16 h-[480px] touch-pan-y sm:h-[440px] lg:mt-20"
          style={{ perspective: 1600 }}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onPanEnd={(_, info) => {
            if (info.offset.x < -50) next()
            else if (info.offset.x > 50) prev()
          }}
        >
          {testimonials.map((item, i) => {
            let d = i - active
            if (d > n / 2) d -= n
            if (d < -n / 2) d += n
            const isActive = d === 0

            return (
              <motion.figure
                key={item.company}
                onClick={() => !isActive && setActive(i)}
                initial={false}
                animate={{
                  x: `${d * 68}%`,
                  rotateY: d * -32,
                  z: Math.abs(d) * -260,
                  scale: isActive ? 1 : 0.88,
                  opacity: Math.abs(d) > 1 ? 0 : isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.9, ease }}
                style={{ zIndex: 10 - Math.abs(d), transformStyle: 'preserve-3d' }}
                className={cn(
                  'absolute inset-x-0 top-0 mx-auto flex h-full w-[min(600px,88vw)] flex-col rounded-[30px] border bg-ink-2 p-7 sm:p-10',
                  isActive
                    ? 'border-line-strong shadow-[0_40px_100px_-30px_rgba(139,92,246,0.4)]'
                    : 'cursor-pointer border-line',
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif text-7xl leading-[0.6] text-brand">“</span>
                  <div className="flex gap-0.5 text-brand">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>

                <blockquote className="mt-6 flex-1 font-display text-[clamp(1.1rem,2vw,1.45rem)] leading-[1.5] font-medium tracking-[-0.015em] text-white/90">
                  {item.review}
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                  <span
                    className={cn(
                      'grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br font-display text-lg font-bold text-ink',
                      GRADIENTS[i % GRADIENTS.length],
                    )}
                  >
                    {item.company.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-white">{item.company}</p>
                    <p className="truncate text-[13px] text-mute">
                      {item.role} · <span className="text-white/50">{item.project}</span>
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            )
          })}
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="glass grid h-12 w-12 place-items-center rounded-full text-white transition-colors hover:border-brand/50 hover:text-brand"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.company}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show testimonial from ${t.company}`}
                className={cn('h-1.5 rounded-full transition-all duration-500', i === active ? 'w-8 bg-brand' : 'w-1.5 bg-white/25 hover:bg-white/50')}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="glass grid h-12 w-12 place-items-center rounded-full text-white transition-colors hover:border-brand/50 hover:text-brand"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              className="bg-ink-2 px-6 py-8 sm:px-10 sm:py-10"
            >
              <CountUp
                value={stat.value}
                className="block font-display text-[clamp(2.6rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.05em] text-white"
              />
              <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-mute uppercase sm:text-[11px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
