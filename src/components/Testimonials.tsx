import React from 'react'
import { motion } from 'motion/react'
import { BackgroundRippleEffect } from './ui/background-ripple-effect'

const ease = [0.16, 1, 0.3, 1] as const

const testimonials = [
  {
    company: 'Tricons Studios',
    role: 'Lead Frontend Developer',
    project: 'Restaurant Management System',
    review:
      'Ali Huzaifa delivered an exceptional frontend experience for our restaurant management platform. His React expertise and modern UI approach helped us launch a scalable and professional product.',
  },
  {
    company: 'Aykays Agency',
    role: 'Full Stack Developer',
    project: 'AI Productivity App',
    review:
      'Ali worked on both frontend and backend development for our AI-powered productivity application. Communication, delivery speed, and code quality were excellent throughout the project.',
  },
  {
    company: 'NovaTech Solutions',
    role: 'Frontend Engineer',
    project: 'Business Dashboard',
    review:
      'Working with Ali was smooth and professional. He created responsive dashboards with beautiful UI interactions and optimized the overall user experience significantly.',
  },
]

const Testimonials: React.FC = () => {
  return (
    <section
      id="Testimonials"
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
            Testimonials
          </p>

          <h2 className="text-4xl font-black uppercase sm:text-5xl md:text-6xl">
            Testimonials <span className="text-[#c5f82a]">from Clients</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-[1.9] text-[#888] sm:text-[14px]">
            Building modern web experiences with clean UI, scalable architecture,
            and powerful frontend engineering for startups and agencies.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
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
              whileHover={{
                y: -10,
              }}
              className="group relative overflow-hidden rounded-[28px] border border-[#222] bg-[#111] p-7 transition-all duration-500 hover:border-[#c5f82a]/40"
            >
              {/* Glow */}
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#c5f82a]/10 blur-3xl transition-all duration-500 group-hover:bg-[#7c5cfc]/20" />

              {/* Quote */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#2a2a2a] bg-[#181818] text-3xl font-black text-[#c5f82a]">
                ❝
              </div>

              {/* Review */}
              <p className="relative z-10 text-[14px] leading-[1.95] text-[#a1a1a1]">
                {item.review}
              </p>

              {/* Divider */}
              <div className="my-7 h-px w-full bg-[#222]" />

              {/* Footer */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c5f82a] text-lg font-black text-black">
                  {item.company.charAt(0)}
                </div>

                <div>
                  <h3 className="text-[15px] font-bold text-white">
                    {item.company}
                  </h3>

                  <p className="mt-1 text-[12px] text-[#c5f82a]">
                    {item.role}
                  </p>

                  <span className="mt-1 block text-[11px] text-[#777]">
                    {item.project}
                  </span>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#c5f82a] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 gap-6 border-t border-[#1f1f1f] pt-10 md:grid-cols-4"
        >
          {[
            { number: '8+', label: 'Projects Completed' },
            { number: '5+', label: 'Happy Clients' },
            { number: '2+', label: 'Years Experience' },
            { number: '100%', label: 'Responsive UI' },
          ].map((item) => (
            <div key={item.label}>
              <h3 className="text-3xl font-black text-[#c5f82a] sm:text-4xl">
                {item.number}
              </h3>

              <p className="mt-2 text-[12px] tracking-[0.08em] text-[#777] uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* White diagonal */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-[2] h-[clamp(100px,22vw,280px)] overflow-hidden">
        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          className="block h-full w-full"
        >
          <path d="M0 400L0 400L1440 80V400H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

export default Testimonials