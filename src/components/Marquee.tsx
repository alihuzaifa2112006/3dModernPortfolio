import React from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const STACK = ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'NestJS', 'React Native', 'Tailwind CSS']
const SERVICES = ['Web Apps', 'AI Chatbots', 'SaaS Platforms', 'Mobile Apps', 'REST APIs', 'Dashboards', 'E-Commerce']

const Row: React.FC<{ items: string[]; reverse?: boolean; className?: string; star: string }> = ({
  items,
  reverse,
  className,
  star,
}) => (
  <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
    {[0, 1].map((copy) => (
      <div key={copy} aria-hidden={copy === 1} className={`flex shrink-0 items-center ${className}`}>
        {items.map((item) => (
          <span key={item} className="flex items-center">
            <span className="px-6 sm:px-8">{item}</span>
            <span className={star}>✦</span>
          </span>
        ))}
      </div>
    ))}
  </div>
)

const Marquee: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const skew = useTransform(scrollYProgress, [0, 1], [0, -4])

  return (
    <section aria-label="Stack and services" className="relative z-10 -my-6 overflow-hidden py-16 sm:py-20">
      <motion.div style={{ skewY: skew }} className="relative">
        <div className="relative z-10 -mx-[5%] w-[110%] -rotate-[3.5deg] bg-brand py-4 shadow-[0_20px_60px_-20px_rgba(197,248,42,0.45)] sm:py-5">
          <Row
            items={STACK}
            className="font-display text-[clamp(1.4rem,3vw,2.6rem)] font-semibold tracking-[-0.03em] text-ink"
            star="text-ink/50"
          />
        </div>
        <div className="absolute inset-x-0 top-1/2 -mx-[5%] w-[110%] -translate-y-1/2 rotate-[3deg] border-y border-line bg-ink-2/95 py-4 backdrop-blur sm:py-5">
          <Row
            items={SERVICES}
            reverse
            className="font-serif text-[clamp(1.4rem,3vw,2.6rem)] text-white/50 italic"
            star="not-italic text-brand/60 text-[0.6em]"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Marquee
