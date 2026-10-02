import React from 'react'
import { motion } from 'motion/react'
import { Bot, CodeXml, Layers, PenTool, Server, Smartphone, type LucideIcon } from 'lucide-react'
import { SectionHeading } from './ui/section-heading'
import { SpotlightCard } from './ui/spotlight-card'
import CodeEditorVisual from './visuals/CodeEditorVisual'
import ScanAppVisual from './visuals/ScanAppVisual'
import { cn } from '../lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

type Visual = 'browser' | 'chat' | 'phone'

interface Service {
  title: string
  desc: string
  icon: LucideIcon
  tags: string[]
  wide?: boolean
  visual?: Visual
}

const services: Service[] = [
  {
    title: 'Web Development',
    desc: 'Modern responsive websites and scalable web applications using React, Next.js, and MERN stack technologies.',
    icon: CodeXml,
    tags: ['React', 'Next.js', 'MERN'],
    wide: true,
    visual: 'browser',
  },
  {
    title: 'Frontend Development',
    desc: 'Beautiful UI/UX interfaces with animations, responsive layouts, performance optimization, and premium interactions.',
    icon: Layers,
    tags: ['UI/UX', 'Motion', 'Performance'],
  },
  {
    title: 'Backend & APIs',
    desc: 'Secure backend systems, REST APIs, authentication, database architecture, and scalable server-side solutions.',
    icon: Server,
    tags: ['REST', 'Auth', 'Databases'],
  },
  {
    title: 'AI Chatbots',
    desc: 'AI-powered chatbots, automation systems, Gemini/OpenAI integrations, and intelligent assistant applications.',
    icon: Bot,
    tags: ['Gemini', 'OpenAI', 'Automation'],
    wide: true,
    visual: 'chat',
  },
  {
    title: 'Android & iOS Apps',
    desc: 'Cross-platform mobile applications with smooth UI experiences and modern scalable app architecture.',
    icon: Smartphone,
    tags: ['React Native', 'Expo'],
    wide: true,
    visual: 'phone',
  },
  {
    title: 'Graphics & Branding',
    desc: 'Professional branding, social media creatives, thumbnails, banners, UI mockups, and business identity design.',
    icon: PenTool,
    tags: ['Branding', 'Social', 'Mockups'],
  },
]

const ChatVisual = () => (
  <div className="flex h-full w-full flex-col justify-center gap-3">
    {[
      { me: true, text: 'Summarise this month’s expenses' },
      { me: false, text: 'You spent 12% less on food. Savings are up Rs 8,400 🎉' },
      { me: true, text: 'Create a plan for next month' },
    ].map((m, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 14, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.25 }}
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-[12px] leading-snug',
          m.me ? 'self-end rounded-br-md bg-brand text-ink' : 'self-start rounded-bl-md border border-line bg-white/[0.04] text-white/80',
        )}
      >
        {m.text}
      </motion.div>
    ))}
    <div className="flex items-center gap-1.5 self-start rounded-full border border-line bg-white/[0.04] px-3 py-2">
      {[0, 1, 2].map((d) => (
        <motion.span
          key={d}
          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
          className="h-1.5 w-1.5 rounded-full bg-white/70"
        />
      ))}
    </div>
  </div>
)

const VISUALS: Record<Visual, React.FC> = { browser: CodeEditorVisual, chat: ChatVisual, phone: ScanAppVisual }

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const Icon = service.icon
  const VisualComp = service.visual ? VISUALS[service.visual] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 14 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease, delay: (index % 2) * 0.1 }}
      style={{ transformPerspective: 1200 }}
      className={cn(service.wide && 'lg:col-span-2')}
    >
      <SpotlightCard className={cn('h-full p-7 sm:p-9', service.wide && 'lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10')}>
        <div className="relative z-10 flex h-full min-h-[260px] flex-col">
          <div className="flex items-start justify-between">
            <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-line-strong bg-gradient-to-b from-white/10 to-white/[0.02] text-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover/spot:-translate-y-1 group-hover/spot:rotate-[-6deg]">
              <Icon size={24} strokeWidth={1.6} />
            </div>
            <span className="font-mono text-xs text-dim">0{index + 1}</span>
          </div>

          <div className="mt-auto pt-10">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[1.7rem]">
              {service.title}
            </h3>
            <p className="mt-3 max-w-md text-[14px] leading-[1.75] text-mute">{service.desc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-wider text-white/60 uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {VisualComp && (
          <div className="relative z-10 mt-10 hidden lg:mt-0 lg:flex lg:min-h-[300px] lg:items-center">
            <VisualComp />
          </div>
        )}
      </SpotlightCard>
    </motion.div>
  )
}

const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading index="02" label="Services" title="What I" accent="provide." />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease }}
            className="max-w-md text-[15px] leading-relaxed text-mute lg:pb-3"
          >
            Delivering scalable digital solutions, modern user interfaces, AI-powered systems, and impactful brand
            experiences for startups, agencies, and businesses.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
