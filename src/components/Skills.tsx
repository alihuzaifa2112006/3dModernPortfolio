import React, { useEffect, useRef, useState } from 'react'
import { LampContainer } from './ui/lamp'

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
    title: 'AI Tools',
    icon: '🤖',
    accent: '#a855f7',
    skills: [
      { name: 'GitHub Copilot', icon: 'https://cdn.simpleicons.org/githubcopilot/ffffff', color: '#ffffff', level: 88 },
      { name: 'Cursor', icon: 'https://cdn.simpleicons.org/cursor/ffffff', color: '#ffffff', level: 90 },
      { name: 'Claude', icon: 'https://cdn.simpleicons.org/anthropic/D4A574', color: '#D4A574', level: 85 },
      { name: 'Qoder', icon: 'https://www.qodo.ai/favicon.ico', color: '#a855f7', level: 75 },
    ],
  },
]

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, visible }
}

const Skills: React.FC = () => {
  return (
    <section id="skills" className="bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      <LampContainer>
        <div className="text-center">
          <p className="mb-2 text-[11px] font-bold tracking-[0.25em] text-[#c5f82a] uppercase">
            What I Know
          </p>

          <h2 className="text-4xl font-black text-white md:text-5xl">
            My <span className="text-[#c5f82a]">Skills</span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-[#666]">
            Technologies and tools I use to bring products to life
          </p>
        </div>
      </LampContainer>

      <div className="mx-auto max-w-[1200px] px-6 pb-24 md:px-12 lg:px-16">
        <div className="space-y-12">
          {skillCategories.map((category) => (
            <CategoryBlock key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface CategoryBlockProps {
  category: typeof skillCategories[number]
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({ category }) => {
  const { ref, visible } = useReveal()

  return (
    <div
      ref={ref}
      className="transition-transform duration-500 hover:-translate-y-1"
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background: `${category.accent}20`,
            border: `1px solid ${category.accent}40`,
          }}
        >
          {category.icon}
        </div>

        <h3
          className="text-sm font-extrabold uppercase tracking-widest"
          style={{ color: category.accent }}
        >
          {category.title}
        </h3>

        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${category.accent}40, transparent)`,
          }}
        />
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-4">
        {category.skills.map((skill, i) => (
          <SkillChip
            key={skill.name}
            skill={skill}
            accent={category.accent}
            index={i}
            visible={visible}
          />
        ))}
      </div>
    </div>
  )
}

interface SkillChipProps {
  skill: { name: string; icon: string; color: string; level: number }
  accent: string
  index: number
  visible: boolean
}

const SkillChip: React.FC<SkillChipProps> = ({
  skill,
  accent,
  index,
  visible,
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 70}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: `linear-gradient(120deg, transparent, ${skill.color}40, transparent)`,
        }}
      />

      <div
        className="relative flex items-center gap-3 px-5 py-3 rounded-2xl"
        style={{
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: hovered
            ? `0 10px 30px -10px ${skill.color}55`
            : 'none',
        }}
      >
        <div className="relative">
          <img src={skill.icon} alt={skill.name} className="h-6 w-6" />
          <div
            className="absolute inset-0 blur-md opacity-0 group-hover:opacity-100"
            style={{ background: skill.color }}
          />
        </div>

        <span className="text-[13px] font-semibold text-white tracking-wide">
          {skill.name}
        </span>

        <span
          className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{
            background: hovered ? `${accent}30` : 'transparent',
            color: hovered ? accent : '#777',
            border: `1px solid ${hovered ? accent + '60' : 'transparent'}`,
          }}
        >
          {skill.level}%
        </span>
      </div>

      <div className="h-[3px] w-full bg-white/5">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: visible ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${skill.color}, ${accent})`,
            boxShadow: `0 0 10px ${skill.color}`,
            transitionDelay: `${index * 70 + 300}ms`,
          }}
        />
      </div>
    </div>
  )
}

export default Skills