import React from 'react'
import { motion } from 'motion/react'
import { BackgroundRippleEffect } from './ui/background-ripple-effect'

const ease = [0.16, 1, 0.3, 1] as const

const experiences = [
  {
    company: 'ITG UAE',
    role: 'Frontend Developer',
    duration: 'Jun 2025 – Present',
    location: 'Karachi, Pakistan',
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
  return (
    <section
      id="Experience"
      className="relative isolate overflow-hidden bg-[#0a0a0a] py-24 text-white"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-[50%] w-[50%] -translate-x-1/4 rounded-full bg-[#c5f82a]/5 blur-[100px]" />
        <div className="absolute top-[10%] right-0 h-[45%] w-[45%] translate-x-1/4 rounded-full bg-[#7c5cfc]/6 blur-[90px]" />
      </div>

      <BackgroundRippleEffect rows={12} cols={22} cellSize={42} fill />

      <div className="relative z-10 mx-auto max-w-[1300px] px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-[12px] font-bold tracking-[0.25em] text-[#c5f82a] uppercase">
            Experience
          </p>

          <h2 className="text-4xl font-black uppercase sm:text-5xl md:text-6xl">
            MY WORK <span className="text-[#c5f82a]">JOURNEY</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-[1.9] text-[#888] sm:text-[14px]">
            Building scalable enterprise applications, modern frontend systems,
            and responsive user experiences across real-world business projects.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-5xl">
          {/* Line */}
          <div className="absolute top-0 left-[18px] h-full w-[2px] bg-[#222] md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease,
                }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Dot */}
                <div className="absolute top-6 left-[10px] z-20 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#0a0a0a] bg-[#c5f82a] md:left-1/2 md:-translate-x-1/2">
                  <div className="h-2 w-2 rounded-full bg-black" />
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-10">
                  <div className="group relative overflow-hidden rounded-[28px] border border-[#1f1f1f] bg-[#111] p-7 transition-all duration-500 hover:border-[#c5f82a]/40">
                    {/* Glow */}
                    <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-[#c5f82a]/10 blur-3xl transition-all duration-500 group-hover:bg-[#7c5cfc]/20" />

                    {/* Duration */}
                    <span className="inline-block rounded-full border border-[#2a2a2a] bg-[#181818] px-4 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#c5f82a] uppercase">
                      {exp.duration}
                    </span>

                    {/* Company */}
                    <h3 className="mt-5 text-2xl font-black text-white">
                      {exp.company}
                    </h3>

                    {/* Role */}
                    <p className="mt-1 text-[14px] font-semibold text-[#c5f82a]">
                      {exp.role}
                    </p>

                    {/* Location */}
                    <p className="mt-1 text-[12px] text-[#777]">
                      {exp.location}
                    </p>

                    {/* Points */}
                    <ul className="mt-6 space-y-4">
                      {exp.points.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[13px] leading-[1.8] text-[#9b9b9b]"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c5f82a]" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#c5f82a] transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      
      </div>

   
   
    </section>
  )
}

export default Experience
