import React from 'react'
import { motion } from 'motion/react'
import { BackgroundRippleEffect } from './ui/background-ripple-effect'

const ease = [0.16, 1, 0.3, 1] as const

const services = [
  {
    title: 'Web Development',
    desc: 'Modern responsive websites and scalable web applications using React, Next.js, and MERN stack technologies.',
    icon: '</>',
  },
  {
    title: 'Frontend Development',
    desc: 'Beautiful UI/UX interfaces with animations, responsive layouts, performance optimization, and premium interactions.',
    icon: 'UI',
  },
  {
    title: 'Backend & APIs',
    desc: 'Secure backend systems, REST APIs, authentication, database architecture, and scalable server-side solutions.',
    icon: '{ }',
  },
  {
    title: 'AI Chatbots',
    desc: 'AI-powered chatbots, automation systems, Gemini/OpenAI integrations, and intelligent assistant applications.',
    icon: 'AI',
  },
  {
    title: 'Android & iOS Apps',
    desc: 'Cross-platform mobile applications with smooth UI experiences and modern scalable app architecture.',
    icon: 'APP',
  },
  {
    title: 'Graphics & Branding',
    desc: 'Professional branding, social media creatives, thumbnails, banners, UI mockups, and business identity design.',
    icon: 'DES',
  },
]

const Services: React.FC = () => {
  return (
    <section
      id="Services"
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
            Services
          </p>

          <h2 className="text-4xl font-black uppercase sm:text-5xl md:text-6xl">
            WHAT I <span className="text-[#c5f82a]">PROVIDE</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-[1.9] text-[#888] sm:text-[14px]">
            Delivering scalable digital solutions, modern user interfaces,
            AI-powered systems, and impactful brand experiences for startups,
            agencies, and businesses.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="group relative overflow-hidden rounded-[28px] border border-[#1f1f1f] bg-[#111] p-7 transition-all duration-500 hover:border-[#c5f82a]/40"
            >
              {/* Glow */}
              <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-[#c5f82a]/10 blur-3xl transition-all duration-500 group-hover:bg-[#7c5cfc]/20" />

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#2a2a2a] bg-[#181818] text-3xl transition-all duration-500 group-hover:scale-110 group-hover:border-[#c5f82a]/40">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-black text-white transition-all duration-300 group-hover:text-[#c5f82a]">
                {service.title}
              </h3>

              <p className="mt-4 text-[14px] leading-[1.9] text-[#9b9b9b]">
                {service.desc}
              </p>

              {/* Bottom Line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#c5f82a] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

      
     
      </div>

      {/* White Diagonal */}
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

export default Services