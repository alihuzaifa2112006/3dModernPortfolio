import React, { useRef } from 'react'
import { motion } from 'motion/react'
import profileImg from '../assets/profile-new.png'
import { BackgroundRippleEffect } from './ui/background-ripple-effect'

const ease = [0.16, 1, 0.3, 1] as const

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!headingRef.current || window.matchMedia('(max-width: 1023px)').matches) return
    const rect = headingRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    headingRef.current.style.transform = `perspective(800px) rotateX(${y * -12}deg) rotateY(${x * 12}deg)`
  }

  const handleMouseLeave = () => {
    if (!headingRef.current) return
    headingRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-[300px] -left-[200px] h-[600px] w-[600px] rounded-full bg-[#c5f82a]/5 blur-[120px]" />
        <div className="absolute -right-[150px] top-[100px] h-[500px] w-[500px] rounded-full bg-[#7c5cfc]/6 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[30%] h-[400px] w-[400px] rounded-full bg-[#00d4ff]/4 blur-[100px]" />
        <div className="absolute top-[15%] left-[10%] h-1 w-1 animate-pulse rounded-full bg-[#c5f82a]/40" />
        <div className="absolute top-[25%] left-[75%] h-1.5 w-1.5 animate-pulse rounded-full bg-[#7c5cfc]/40" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[60%] left-[20%] h-1 w-1 animate-pulse rounded-full bg-[#00d4ff]/40" style={{ animationDelay: '2s' }} />
      </div>

      <BackgroundRippleEffect rows={28} cols={45} cellSize={48} />

      <div className="relative mx-auto max-w-[1300px] px-4 pt-8 pb-0 sm:px-6 md:px-12 lg:px-16 lg:pt-16">
        <motion.h1
          ref={headingRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease }}
          className="relative z-[15] font-black italic leading-[0.92] tracking-[-0.03em] text-white uppercase will-change-transform"
          style={{
            fontSize: 'clamp(2rem, 8vw, 5.8rem)',
            WebkitTextStroke: '1.5px rgba(0,0,0,0.7)',
            paintOrder: 'stroke fill',
            transition: 'transform 0.15s ease-out',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.span className="block" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.7, ease }}>
            TURNING IDEAS INTO
          </motion.span>
          <motion.span
            className="mt-1 block sm:mt-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease }}
          >
            <span className="text-[#c5f82a]">HIGH-IMPACT</span> WEB
          </motion.span>
          <motion.span
            className="mt-1 block sm:mt-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease }}
          >
            APPLICATIONS <span className="not-italic text-[#c5f82a]">&lt;/&gt;</span>
          </motion.span>
        </motion.h1>

        <div className="relative mt-6 sm:mt-8">
          <motion.div
            className="relative z-[15] max-w-[420px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease }}
          >
            <p className="text-[13px] leading-[1.85] text-[#888] sm:text-[13.5px]">
              Hello and welcome to my web developer portfolio! I'm thrilled to showcase my passion for crafting captivating and functional websites.
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <a
                href="#about"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#c5f82a] py-2.5 pr-7 pl-2.5 text-[13px] font-semibold text-black transition-all duration-300 hover:bg-[#d4ff4a] hover:scale-105 hover:shadow-lg hover:shadow-[#c5f82a]/25 active:scale-95"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                Let's Talk
              </a>
              <a
                href="/Ali-Huzaifa-CV.pdf"
                download="Ali Huzaifa CV.pdf"
                className="group inline-flex w-fit items-center gap-3 text-[13px] font-medium text-white transition-all duration-300 hover:text-[#c5f82a] hover:scale-105 active:scale-95"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#444] transition-all duration-300 group-hover:border-[#c5f82a] group-hover:shadow-md group-hover:shadow-[#c5f82a]/20">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                Download CV
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute top-[160px] right-4 z-10 hidden lg:block xl:right-12"
          style={{ width: 'min(400px, 32vw)' }}
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.65, duration: 1, ease }}
        >
          <div className="relative">
            <div
              className="absolute rounded-[22px] bg-[#c5f82a]"
              style={{ width: '87%', height: '460px', top: '25px', right: '-16px', transform: 'rotate(5deg)' }}
            />
            <div className="relative z-10 h-[min(480px,55vh)] w-full max-w-[340px] overflow-hidden rounded-[22px]">
              <img src={profileImg} alt="Profile" className="h-full w-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-2 -left-4 z-20 grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-[#c5f82a] opacity-60" />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center sm:mt-10 lg:hidden"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.85, ease }}
        >
          <div className="relative">
            <div className="absolute rounded-[20px] bg-[#c5f82a]" style={{ width: '260px', height: '360px', top: '18px', right: '-12px', transform: 'rotate(5deg)' }} />
            <div className="relative z-10 h-[min(350px,50vh)] w-[min(250px,70vw)] overflow-hidden rounded-[20px]">
              <img src={profileImg} alt="Profile" className="h-full w-full object-cover object-top" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative z-[15] mt-10 flex flex-wrap items-center gap-3 pb-28 sm:mt-14 sm:gap-4 sm:pb-36 lg:pb-44"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease }}
        >
          <span className="text-[11px] font-bold tracking-[0.08em] text-white">Follow Me:</span>
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.linkedin.com/in/ali-huzaifa-92137a292"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#333] text-[11px] font-semibold text-white transition-all duration-300 hover:border-[#c5f82a] hover:text-[#c5f82a] hover:scale-110"
            >
              In.
            </a>
            <a
              href="https://www.instagram.com/alihuzaifa2112006/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#333] text-white transition-all duration-300 hover:border-[#c5f82a] hover:text-[#c5f82a] hover:scale-110"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              </svg>
            </a>
          </div>
          <div className="hidden h-px w-24 bg-[#444] sm:block sm:w-36" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 z-[1] w-full" style={{ height: 'clamp(120px, 28vw, 35%)' }}>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0 400L0 400L1440 80V400H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

export default Hero
