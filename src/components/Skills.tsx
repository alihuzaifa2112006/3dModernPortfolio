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
      { name: 'Python', icon: devicon('python/python-original.svg'), color: '#3776AB', level: 70 },
    ],
  },
  {
    title: 'Database',
    icon: '🗄️',
    accent: '#e53e6b',
    skills: [
      { name: 'MongoDB', icon: devicon('mongodb/mongodb-original.svg'), color: '#47A248', level: 75 },
      { name: 'MySQL', icon: devicon('mysql/mysql-original.svg'), color: '#4479A1', level: 72 },
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
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const Skills: React.FC = () => {
  return (
    <section id="skills" className="bg-[#0a0a0a]">
      <LampContainer>
        <div className="text-center">
          <p className="mb-2 text-[11px] font-bold tracking-[0.25em] text-[#c5f82a] uppercase">What I Know</p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            My <span className="text-[#c5f82a]">Skills</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-[#666]">
            Technologies and tools I use to bring products to life
          </p>
        </div>
      </LampContainer>

      <div className="mx-auto max-w-[1200px] px-6 pb-24 md:px-12 lg:px-16">
        <div className="space-y-10">
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
    <div ref={ref}>
      {/* Category label */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
          style={{ background: `${category.accent}18`, border: `1px solid ${category.accent}30` }}
        >
          {category.icon}
        </div>
        <h3 className="text-[13px] font-bold uppercase tracking-[0.15em]" style={{ color: category.accent }}>
          {category.title}
        </h3>
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${category.accent}30, transparent)` }} />
      </div>

      {/* Skills grid */}
      <div className="flex flex-wrap gap-3">
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

const SkillChip: React.FC<SkillChipProps> = ({ skill, accent, index, visible }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group relative cursor-default overflow-hidden rounded-xl border border-[#1e1e1e] bg-[#111] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        translate: visible ? '0 0' : '0 20px',
        transition: `opacity 0.5s ease-out ${index * 60}ms, translate 0.5s ease-out ${index * 60}ms, border-color 0.3s, box-shadow 0.3s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow bg on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 50%, ${skill.color}18, transparent 70%)` }}
      />

      <div
        className="relative flex items-center gap-2.5 px-4 py-2.5 transition-all duration-300"
        style={{
          boxShadow: hovered ? `0 0 0 1px ${skill.color}40` : '0 0 0 0px transparent',
          borderRadius: 'inherit',
        }}
      >
        <img src={skill.icon} alt={skill.name} className="h-5 w-5 shrink-0" />
        <span className="text-[13px] font-semibold text-white whitespace-nowrap">{skill.name}</span>
        {/* Level badge */}
        <span
          className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold transition-all duration-300"
          style={{
            background: hovered ? `${accent}22` : 'transparent',
            color: hovered ? accent : '#555',
            border: `1px solid ${hovered ? accent + '50' : 'transparent'}`,
          }}
        >
          {skill.level}%
        </span>
      </div>

      {/* Bottom progress bar */}
      <div className="h-[2px] w-full bg-[#1a1a1a]">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${skill.color}80, ${accent})`,
            transitionDelay: `${index * 60 + 400}ms`,
          }}
        />
      </div>
    </div>
  )
}

export default Skills
