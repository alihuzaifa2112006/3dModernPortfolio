import React, { useEffect, useRef, useState } from 'react'

const devicon = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}`

const skillCategories = [
  {
    title: 'Frontend',
    accent: '#c5f82a',
    skills: [
      { name: 'HTML', icon: devicon('html5/html5-original.svg'), color: '#E34F26', level: 95 },
      { name: 'CSS', icon: devicon('css3/css3-original.svg'), color: '#1572B6', level: 90 },
      { name: 'JavaScript', icon: devicon('javascript/javascript-original.svg'), color: '#F7DF1E', level: 88 },
      { name: 'TypeScript', icon: devicon('typescript/typescript-original.svg'), color: '#3178C6', level: 82 },
      { name: 'React', icon: devicon('react/react-original.svg'), color: '#61DAFB', level: 90 },
      { name: 'Tailwind CSS', icon: devicon('tailwindcss/tailwindcss-original.svg'), color: '#06B6D4', level: 92 },
      { name: 'Material UI', icon: devicon('materialui/materialui-original.svg'), color: '#007FFF', level: 78 },
      { name: 'Next.js', icon: devicon('nextjs/nextjs-original.svg'), color: '#ffffff', level: 85 },
    ],
  },
  {
    title: 'Backend',
    accent: '#00d4ff',
    skills: [
      { name: 'Node.js', icon: devicon('nodejs/nodejs-original.svg'), color: '#339933', level: 80 },
      { name: 'Express', icon: devicon('express/express-original.svg'), color: '#ffffff', level: 78 },
      { name: 'Python', icon: devicon('python/python-original.svg'), color: '#3776AB', level: 70 },
    ],
  },
  {
    title: 'Database',
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
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const Skills: React.FC = () => {
  return (
    <section id="skills" className="bg-[#0a0a0a] px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1300px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-[12px] font-bold tracking-[0.2em] text-[#c5f82a] uppercase">What I Know</p>
          <h2 className="text-3xl font-black text-white sm:text-4xl md:text-5xl">
            My <span className="text-[#c5f82a]">Skills</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#888]">
            Technologies and tools I use to bring products to life
          </p>
        </div>

        {/* Skill Categories */}
        <div className="space-y-14">
          {skillCategories.map((category) => (
            <SkillRow key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface SkillRowProps {
  category: typeof skillCategories[number]
}

const SkillRow: React.FC<SkillRowProps> = ({ category }) => {
  const { ref, visible } = useReveal()

  return (
    <div ref={ref}>
      <h3 className="mb-6 text-lg font-bold text-white">
        <span style={{ color: category.accent }}>{'// '}</span>
        {category.title}
      </h3>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {category.skills.map((skill, i) => (
          <div
            key={skill.name}
            className="group relative flex flex-col items-center gap-3 rounded-2xl border border-[#1a1a1a] bg-[#111] px-4 py-8 transition-all duration-300 will-change-transform hover:scale-105 hover:border-[#c5f82a]/30 hover:bg-[#161616] hover:shadow-lg hover:shadow-[#c5f82a]/5"
            style={{
              opacity: visible ? 1 : 0,
              translate: visible ? '0 0' : '0 30px',
              transition: `opacity 0.5s ease-out ${i * 80}ms, translate 0.5s ease-out ${i * 80}ms, transform 0.3s, border-color 0.3s, background 0.3s, box-shadow 0.3s`,
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = (e.clientX - rect.left) / rect.width - 0.5
              const y = (e.clientY - rect.top) / rect.height - 0.5
              e.currentTarget.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) scale(1.05)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)'
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-10"
              style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
            />
            <img src={skill.icon} alt={skill.name} className="relative h-10 w-10" />
            <span className="relative text-[13px] font-semibold text-white">{skill.name}</span>
            <div className="relative mt-1 h-1 w-full overflow-hidden rounded-full bg-[#222]">
              <div
                className="h-full rounded-full transition-all duration-700 group-hover:opacity-100"
                style={{
                  width: visible ? `${skill.level}%` : '0%',
                  background: `linear-gradient(90deg, ${skill.color}, ${category.accent})`,
                  opacity: 0.6,
                  transition: `width 1s ease-out ${i * 80 + 300}ms, opacity 0.7s`,
                }}
              />
            </div>
            <span className="relative text-[11px] font-medium text-[#555] transition-colors group-hover:text-[#c5f82a]">
              {skill.level}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
