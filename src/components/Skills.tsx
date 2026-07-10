import React, { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { LampContainer } from './ui/lamp'
import { ScrollReveal, StaggerReveal, StaggerItem } from './ui/scroll-reveal'

const devicon = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}`

const skillCategories = [
  {
    title: 'Frontend',
    icon: '⚡',
    accent: '#c5f82a',
    skills: [
      { name: 'HTML', icon: devicon('html5/html5-original.svg'), color: '#E34F26', level: 95 },
      { name: 'CSS', icon: devicon('css3/css3-original.svg'), color: '#1572B6', level: 90 },
      { name: 'JavaScript', icon: devicon('javascript/javascript-original.svg'), color: '#F7DF1E', level: 88 },
      { name: 'TypeScript', icon: devicon('typescript/typescript-original.svg'), color: '#3178C6', level: 82 },
      { name: 'React', icon: devicon('react/react-original.svg'), color: '#61DAFB', level: 90 },
      { name: 'React Native', icon: devicon('react/react-original.svg'), color: '#61DAFB', level: 80 },
      { name: 'Next.js', icon: devicon('nextjs/nextjs-original.svg'), color: '#ffffff', level: 85 },
      { name: 'Tailwind CSS', icon: devicon('tailwindcss/tailwindcss-original.svg'), color: '#06B6D4', level: 92 },
      { name: 'Material UI', icon: devicon('materialui/materialui-original.svg'), color: '#007FFF', level: 78 },
    ],
  },
  {
    title: 'Backend',
    icon: '🔧',
    accent: '#00d4ff',
    skills: [
      { name: 'Node.js', icon: devicon('nodejs/nodejs-original.svg'), color: '#339933', level: 80 },
      { name: 'Express', icon: devicon('express/express-original.svg'), color: '#ffffff', level: 78 },
      { name: 'NestJS', icon: devicon('nestjs/nestjs-original.svg'), color: '#E0234E', level: 75 },
      { name: 'Firebase', icon: devicon('firebase/firebase-original.svg'), color: '#FFCA28', level: 78 },
      { name: 'Prisma', icon: devicon('prisma/prisma-original.svg'), color: '#ffffff', level: 74 },
      { name: 'Python', icon: devicon('python/python-original.svg'), color: '#3776AB', level: 70 },
    ],
  },
  {
    title: 'Database',
    icon: '🗄️',
    accent: '#e53e6b',
    skills: [
      { name: 'MongoDB', icon: devicon('mongodb/mongodb-original.svg'), color: '#47A248', level: 75 },
      { name: 'PostgreSQL', icon: devicon('postgresql/postgresql-original.svg'), color: '#4169E1', level: 73 },
      { name: 'MySQL', icon: devicon('mysql/mysql-original.svg'), color: '#4479A1', level: 72 },
    ],
  },
  {
    title: 'Deployment',
    icon: '🚀',
    accent: '#46E3B7',
    skills: [
      { name: 'Render', icon: 'https://cdn.simpleicons.org/render/46E3B7', color: '#46E3B7', level: 75 },
    ],
  },
]

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const orbOneY = useTransform(scrollYProgress, [0, 1], [-80, 120])
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [100, -140])
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-x-clip bg-gradient-to-b from-black via-[#0a0a0a] to-black"
    >
      <LampContainer>
        <ScrollReveal variant="blur" className="text-center">
          <p className="mb-2 text-[11px] font-bold tracking-[0.25em] text-[#c5f82a] uppercase">
            What I Know
          </p>
          <h2 className="text-3xl font-black text-white sm:text-4xl md:text-5xl">
            My <span className="text-[#c5f82a]">Skills</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md px-2 text-[12px] leading-relaxed text-[#666] sm:text-[13px]">
            Technologies and tools I use to bring products to life
          </p>
        </ScrollReveal>
      </LampContainer>

      {/* ambient parallax orbs — depth cue for the whole section */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full opacity-20 blur-[90px]"
        style={{ background: '#c5f82a', y: orbOneY, rotate: orbRotate }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-[60%] h-80 w-80 rounded-full opacity-[0.15] blur-[100px]"
        style={{ background: '#00d4ff', y: orbTwoY }}
      />

      <div className="relative mx-auto max-w-[1200px] px-4 pb-20 sm:px-6 md:px-12 md:pb-24 lg:px-16">
        <div className="space-y-16 sm:space-y-20">
          {skillCategories.map((category, i) => (
            <CategoryRow key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface CategoryRowProps {
  category: (typeof skillCategories)[number]
  index: number
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category, index }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.15'] })

  const fromSide = index % 2 === 0 ? -1 : 1
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [fromSide * -16, 0, fromSide * 10])
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [fromSide * -50, 0, fromSide * 30])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.15, 1, 1, 0.4])

  return (
    <div ref={ref} className="relative">
      <div className="mb-5 flex items-center gap-3 sm:mb-7">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `${category.accent}20`, border: `1px solid ${category.accent}40` }}
        >
          {category.icon}
        </div>
        <h3
          className="text-xs font-extrabold tracking-widest uppercase sm:text-sm"
          style={{ color: category.accent }}
        >
          {category.title}
        </h3>
        <div
          className="h-px flex-1"
          style={{ background: `linear-gradient(90deg, ${category.accent}40, transparent)` }}
        />
      </div>

      <div style={{ perspective: 1200 }}>
        <motion.div
          style={{ rotateY, x, opacity, transformStyle: 'preserve-3d' }}
          className="flex flex-wrap gap-4 sm:gap-5"
        >
          {category.skills.map((skill, si) => (
            <SkillCard3D key={skill.name} skill={skill} accent={category.accent} delay={si * 0.06} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

interface SkillCard3DProps {
  skill: { name: string; icon: string; color: string; level: number }
  accent: string
  delay: number
}

const SkillCard3D: React.FC<SkillCard3DProps> = ({ skill, accent, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const inView = useInView(cardRef, { once: true, amount: 0.4 })

  const rotateXRaw = useMotionValue(0)
  const rotateYRaw = useMotionValue(0)
  const rotateX = useSpring(rotateXRaw, { stiffness: 300, damping: 22 })
  const rotateY = useSpring(rotateYRaw, { stiffness: 300, damping: 22 })

  const circumference = 2 * Math.PI * 16

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateYRaw.set(px * 22)
    rotateXRaw.set(-py * 22)
  }

  const handleLeave = () => {
    rotateXRaw.set(0)
    rotateYRaw.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{ perspective: 800 }}
      className="group relative min-w-[136px] flex-1 sm:min-w-[156px] sm:flex-none"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-colors duration-300 group-hover:border-white/20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle at 50% 0%, ${skill.color}35, transparent 70%)` }}
        />

        <div
          className="relative flex flex-col items-center gap-2.5 px-4 py-5 sm:px-5 sm:py-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl transition-shadow duration-300"
            style={{
              background: `${skill.color}15`,
              border: `1px solid ${skill.color}30`,
              transform: 'translateZ(36px)',
              boxShadow: isHovered ? `0 10px 24px -8px ${skill.color}80` : 'none',
            }}
          >
            <img src={skill.icon} alt={skill.name} className="h-6 w-6" />
          </div>

          <span
            className="text-center text-[12px] font-semibold text-white sm:text-[13px]"
            style={{ transform: 'translateZ(24px)' }}
          >
            {skill.name}
          </span>

          <svg width="42" height="42" viewBox="0 0 40 40" style={{ transform: 'translateZ(14px)' }}>
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <motion.circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke={skill.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={inView ? { strokeDashoffset: circumference * (1 - skill.level / 100) } : {}}
              transition={{ duration: 1.2, delay: delay + 0.25, ease: 'easeOut' }}
              transform="rotate(-90 20 20)"
            />
            <text
              x="20"
              y="24"
              textAnchor="middle"
              fontSize="9"
              fontWeight={700}
              fill={accent}
            >
              {skill.level}
            </text>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Skills