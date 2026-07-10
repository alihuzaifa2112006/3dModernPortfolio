import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { BackgroundRippleEffect } from './ui/background-ripple-effect'

const ease = [0.16, 1, 0.3, 1] as const

const experiences = [
  {
    company: 'ITG UAE',
    role: 'Frontend Developer',
    duration: 'Jun 2025 – Present',
    location: 'Karachi, Pakistan',
    current: true,
    points: [
      'Developed and maintained ERP modules using React.js and Next.js for enterprise sourcing systems.',
      'Migrated legacy ASP.NET (VB.NET) ERP architecture into a modern React-based frontend system.',
      'Optimized frontend performance and improved responsiveness across enterprise dashboards.',
      'Integrated RESTful APIs with backend systems for smooth data flow and business operations.',
      'Worked directly with clients for requirements gathering, troubleshooting, and deployment support.',
      'Built reusable components and scalable frontend architecture across multiple concurrent projects.',
    ],
  },
  {
    company: 'Data Tronex',
    role: 'Frontend Developer Intern',
    duration: 'Jan 2025 – May 2025',
    location: 'Karachi, Pakistan',
    current: false,
    points: [
      'Worked on real-world client projects using WordPress, HTML, CSS, and JavaScript.',
      'Developed and customized responsive UI components for business websites.',
      'Handled website maintenance, bug fixing, and frontend improvements.',
      'Collaborated with team members and clients to implement feature requests and UI changes.',
      'Gained practical experience in frontend workflows, client communication, and project delivery.',
    ],
  },
]

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const orbOneY = useTransform(sectionProgress, [0, 1], [-100, 140])
  const orbTwoY = useTransform(sectionProgress, [0, 1], [120, -160])
  const orbRotate = useTransform(sectionProgress, [0, 1], [0, 60])
  const headingY = useTransform(sectionProgress, [0, 0.3], [0, -20])

  const { scrollYProgress: lineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.35'],
  })
  const lineScale = useSpring(lineProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  return (
    <section
      id="Experience"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#0a0a0a] py-24 text-white"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-[50%] w-[50%] -translate-x-1/4 rounded-full bg-[#c5f82a]/5 blur-[100px]"
          style={{ y: orbOneY, rotate: orbRotate }}
        />
        <motion.div
          className="absolute top-[10%] right-0 h-[45%] w-[45%] translate-x-1/4 rounded-full bg-[#7c5cfc]/6 blur-[90px]"
          style={{ y: orbTwoY }}
        />
      </div>

      <BackgroundRippleEffect rows={12} cols={22} cellSize={42} fill />

      <div className="relative z-10 mx-auto max-w-[1300px] px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Heading */}
        <motion.div
          style={{ y: headingY }}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
            transition={{ duration: 0.9, ease }}
            viewport={{ once: true }}
            className="mb-3 text-[12px] font-bold text-[#c5f82a] uppercase"
          >
            Experience
          </motion.p>

          <h2 className="text-4xl font-black uppercase sm:text-5xl md:text-6xl">
            {'MY WORK '.split('').map((char, i) => (
              <motion.span
                key={`a-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.02, ease }}
                viewport={{ once: true }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            {'JOURNEY'.split('').map((char, i) => (
              <motion.span
                key={`b-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.03, ease }}
                viewport={{ once: true }}
                className="inline-block text-[#c5f82a]"
              >
                {char}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-2xl text-[13px] leading-[1.9] text-[#888] sm:text-[14px]"
          >
            Building scalable enterprise applications, modern frontend systems,
            and responsive user experiences across real-world business projects.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mx-auto max-w-5xl">
          {/* Base line */}
          <div className="absolute top-0 left-[18px] h-full w-[2px] bg-[#1a1a1a] md:left-1/2 md:-translate-x-1/2" />
          {/* Animated glowing draw-on-scroll line */}
          <motion.div
            className="absolute top-0 left-[18px] h-full w-[2px] origin-top bg-gradient-to-b from-[#c5f82a] via-[#c5f82a] to-[#7c5cfc] md:left-1/2 md:-translate-x-1/2"
            style={{
              scaleY: lineScale,
              boxShadow: '0 0 12px 1px rgba(197,248,42,0.5)',
            }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <TimelineCard key={exp.company} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineCardProps {
  exp: (typeof experiences)[number]
  index: number
}

const bulletContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.25 },
  },
}

const bulletVariants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
}

const TimelineCard: React.FC<TimelineCardProps> = ({ exp, index }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const fromLeft = index % 2 === 0

  const rotateXRaw = useMotionValue(0)
  const rotateYRaw = useMotionValue(0)
  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 20 })
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 20 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateYRaw.set(px * 10)
    rotateXRaw.set(-py * 10)
    setGlowPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  const handleLeave = () => {
    rotateXRaw.set(0)
    rotateYRaw.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: fromLeft ? -35 : 35, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: index * 0.12, ease }}
      viewport={{ once: true, amount: 0.35 }}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
        }`}
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.2, ease: 'backOut' }}
        viewport={{ once: true }}
        className="absolute top-6 left-[10px] z-20 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#0a0a0a] bg-[#c5f82a] md:left-1/2 md:-translate-x-1/2"
      >
        <div className="h-2 w-2 rounded-full bg-black" />
        {exp.current && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#c5f82a]"
            animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>

      {/* Spacer */}
      <div className="hidden md:block md:w-1/2" />

      {/* Card */}
      <div className="ml-12 md:ml-0 md:w-1/2 md:px-10">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          whileHover={{ y: -6 }}
          className="group relative overflow-hidden rounded-[28px] border border-[#1f1f1f] bg-[#111] p-7 transition-colors duration-500 hover:border-[#c5f82a]/40"
        >
          {/* Cursor-follow glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(300px circle at ${glowPos.x}% ${glowPos.y}%, rgba(197,248,42,0.12), transparent 70%)`,
            }}
          />
          {/* Corner glow */}
          <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-[#c5f82a]/10 blur-3xl transition-all duration-500 group-hover:bg-[#7c5cfc]/20" />

          <div style={{ transform: 'translateZ(30px)' }}>
            {/* Duration */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.15, ease }}
              viewport={{ once: true }}
              className="inline-block rounded-full border border-[#2a2a2a] bg-[#181818] px-4 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#c5f82a] uppercase"
            >
              {exp.duration}
            </motion.span>

            {/* Company */}
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.22, ease }}
              viewport={{ once: true }}
              className="mt-5 text-2xl font-black text-white"
            >
              {exp.company}
            </motion.h3>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.28, ease }}
              viewport={{ once: true }}
              className="mt-1 text-[14px] font-semibold text-[#c5f82a]"
            >
              {exp.role}
            </motion.p>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.34, ease }}
              viewport={{ once: true }}
              className="mt-1 text-[12px] text-[#777]"
            >
              {exp.location}
            </motion.p>

            {/* Points */}
            <motion.ul
              variants={bulletContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="mt-6 space-y-4"
            >
              {exp.points.map((point, i) => (
                <motion.li
                  key={i}
                  variants={bulletVariants}
                  className="flex items-start gap-3 text-[13px] leading-[1.8] text-[#9b9b9b]"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c5f82a]" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#c5f82a] to-[#7c5cfc] transition-all duration-500 group-hover:w-full" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Experience