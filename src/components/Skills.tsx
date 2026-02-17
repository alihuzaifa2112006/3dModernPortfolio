import React from 'react'

const skillCategories = [
  {
    title: 'Frontend',
    accent: '#c5f82a',
    skills: [
      { name: 'HTML', icon: '🌐', color: '#E34F26', level: 95 },
      { name: 'CSS', icon: '🎨', color: '#1572B6', level: 90 },
      { name: 'JavaScript', icon: '⚡', color: '#F7DF1E', level: 88 },
      { name: 'TypeScript', icon: '🔷', color: '#3178C6', level: 82 },
      { name: 'React', icon: '⚛️', color: '#61DAFB', level: 90 },
      { name: 'Tailwind CSS', icon: '💨', color: '#06B6D4', level: 92 },
      { name: 'Material UI', icon: '🎯', color: '#007FFF', level: 78 },
      { name: 'Next.js', icon: '▲', color: '#ffffff', level: 85 },
    ],
  },
  {
    title: 'Backend',
    accent: '#00d4ff',
    skills: [
      { name: 'Node.js', icon: '🟢', color: '#339933', level: 80 },
      { name: 'Express', icon: '🚀', color: '#ffffff', level: 78 },
      { name: 'Python', icon: '🐍', color: '#3776AB', level: 70 },
    ],
  },
  {
    title: 'Database',
    accent: '#e53e6b',
    skills: [
      { name: 'MongoDB', icon: '🍃', color: '#47A248', level: 75 },
      { name: 'SQL', icon: '🗄️', color: '#4479A1', level: 72 },
    ],
  },
]

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
            <div key={category.title}>
              <h3 className="mb-6 text-lg font-bold text-white">
                <span style={{ color: category.accent }}>{'// '}</span>
                {category.title}
              </h3>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative flex flex-col items-center gap-3 rounded-2xl border border-[#1a1a1a] bg-[#111] px-4 py-8 transition-all duration-300 hover:border-[#c5f82a]/30 hover:bg-[#161616]"
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                      style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
                    />
                    <span className="relative text-4xl">{skill.icon}</span>
                    <span className="relative text-[13px] font-semibold text-white">{skill.name}</span>
                    <div className="relative mt-1 h-1 w-full overflow-hidden rounded-full bg-[#222]">
                      <div
                        className="h-full rounded-full transition-all duration-700 group-hover:opacity-100"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}, ${category.accent})`,
                          opacity: 0.6,
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
