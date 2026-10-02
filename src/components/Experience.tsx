import React, { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { MapPin } from 'lucide-react'
import { SectionHeading } from './ui/section-heading'
import { Tilt } from './ui/tilt'
import { experiences } from '../data/site'
import { cn } from '../lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

const TimelineCard: React.FC<{ exp: (typeof experiences)[number]; index: number }> = ({ exp, index }) => (
  <div className="relative pl-12 sm:pl-16">
    {/* Node */}
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.6, ease: 'backOut' }}
      className="absolute top-9 left-[11px] z-10 grid h-[18px] w-[18px] place-items-center rounded-full border-[3px] border-ink bg-brand sm:left-[19px]"
    >
      {exp.current && <span className="absolute inset-0 animate-ping rounded-full bg-brand/60" />}
    </motion.span>

    <motion.div
      initial={{ opacity: 0, y: 70, rotateX: 22 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease }}
      style={{ transformPerspective: 1200, transformOrigin: 'center top' }}
    >
      <Tilt max={4} className="rounded-[28px]">
        <div
          className={cn(
            'relative overflow-hidden rounded-[28px] border bg-ink-2 p-7 sm:p-10',
            exp.current ? 'border-brand/25' : 'border-line',
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-6 right-4 font-display text-[9rem] leading-none font-bold tracking-[-0.06em] text-white/[0.025] select-none"
          >
            0{index + 1}
          </span>
          {exp.current && (
            <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(197,248,42,0.14),transparent_65%)]" />
          )}

          <div className="relative flex flex-wrap items-center gap-3 [transform:translateZ(30px)]">
            <span className="rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-1 font-mono text-[11px] tracking-wider text-white/80">
              {exp.duration}
            </span>
            {exp.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 font-mono text-[10px] font-medium tracking-wider text-ink uppercase">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
                Current
              </span>
            )}
          </div>

          <h3 className="relative mt-6 font-display text-[clamp(2rem,3.4vw,2.8rem)] leading-none font-semibold tracking-[-0.045em] text-white">
            {exp.company}
          </h3>
          <p className="relative mt-2 font-serif text-xl text-brand italic sm:text-2xl">{exp.role}</p>
          <p className="relative mt-3 flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-mute uppercase">
            <MapPin size={12} /> {exp.location}
          </p>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
            className="relative mt-8 grid gap-4 border-t border-line pt-8"
          >
            {exp.points.map((point) => (
              <motion.li
                key={point}
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.6, ease }}
                className="flex gap-4 text-[14px] leading-[1.75] text-white/65 sm:text-[15px]"
              >
                <span className="mt-[9px] h-px w-4 shrink-0 bg-brand" />
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Tilt>
    </motion.div>
  </div>
)

const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.7', 'end 0.5'] })
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const current = experiences.find((e) => e.current)

  return (
    <section id="experience" className="relative py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              index="05"
              label="Experience"
              title="My work"
              accent="journey."
              description="Building scalable enterprise applications, modern frontend systems, and responsive user experiences across real-world business projects."
            />
            {current && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
                className="glass mt-10 inline-flex items-center gap-4 rounded-2xl px-5 py-4"
              >
                <span className="relative flex h-3 w-3">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
                  <span className="relative h-3 w-3 rounded-full bg-emerald-400" />
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-mute uppercase">Currently at</p>
                  <p className="mt-0.5 text-[15px] font-medium text-white">
                    {current.company} · <span className="text-white/60">{current.role}</span>
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div ref={timelineRef} className="relative lg:col-span-7">
          <div className="absolute top-0 bottom-0 left-[19px] w-px bg-line sm:left-[27px]" />
          <motion.div
            className="absolute top-0 bottom-0 left-[19px] w-px origin-top bg-gradient-to-b from-brand via-brand to-violet sm:left-[27px]"
            style={{ scaleY: lineScale, boxShadow: '0 0 14px 1px rgba(197,248,42,0.5)' }}
          />
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <TimelineCard key={exp.company} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
