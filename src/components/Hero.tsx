import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { BackgroundRippleEffect } from './ui/background-ripple-effect'

const ease = [0.16, 1, 0.3, 1] as const

const WORDS = ['FULL STACK DEVELOPER', 'MERN STACK ENGINEER', 'SaaS BUILDER']

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!headingRef.current || window.matchMedia('(max-width: 1023px)').matches) return
    const rect = headingRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    headingRef.current.style.transform = `perspective(1200px) rotateX(${y * -10}deg) rotateY(${x * 10}deg)` // Enhanced 3D angle depth
  }

  const handleMouseLeave = () => {
    if (!headingRef.current) return
    headingRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <section id="home" className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#0a0a0a] flex flex-col justify-center">
      {/* Heavy Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[15%] left-1/2 h-[70%] w-[70%] -translate-x-1/2 rounded-full bg-[#c5f82a]/5 blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[5%] h-[50%] w-[50%] rounded-full bg-[#7c5cfc]/5 blur-[140px]" />
      </div>

      <BackgroundRippleEffect rows={18} cols={32} cellSize={54} fill />

      {/* Content Container (Max width extended for larger frame grid) */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pt-28 pb-32 sm:px-8 md:px-12 lg:px-16 lg:pt-36 lg:pb-40">
        <div className="flex flex-col items-start gap-16 lg:gap-24">

          {/* Main Massive Hero Typography */}
          <div className="w-full min-w-0" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <motion.h1
              ref={headingRef}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease }}
              className="font-black italic leading-[0.82] tracking-[-0.05em] text-white uppercase will-change-transform select-none"
              style={{
                fontSize: 'clamp(2.5rem, 11vw, 10.5rem)', // Scaled up massive size
                WebkitTextStroke: '1.5px rgba(0,0,0,0.6)',
                paintOrder: 'stroke fill',
                transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="block opacity-60 not-italic text-xs sm:text-sm font-bold tracking-[0.3em] mb-6 text-[#c5f82a]">
                // CREATIVE ENGINEER
              </span>

              <span className="block opacity-95">HI, I'M ALI HUZAIFA</span>

              {/* Continuous Animated Words Wrapper */}
              <span className="mt-4 block sm:mt-6 min-h-[1.1em] relative overflow-hidden">
                <span className="text-neutral-500 not-italic font-light tracking-tight">A </span>
                <span className="inline-block relative">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: 70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -70, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-[#c5f82a] not-italic font-black text-glow whitespace-nowrap"
                    >
                      {WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </motion.h1>
          </div>

          {/* Bottom Row: Description & CTA Buttons */}
          <div className="grid w-full grid-cols-1 gap-12 border-t border-white/10 pt-10 md:grid-cols-2 md:items-end md:gap-16 lg:pt-14">

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease }}
              className="max-w-2xl"
            >
              <p className="text-[16px] leading-[1.75] text-neutral-400 sm:text-[18px] font-medium tracking-wide">
                I craft high-performance web applications where pixel-perfect precision meets scalable backend architecture. Focused on building clean digital experiences that scale.
              </p>
            </motion.div>

            {/* Actions & Socials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease }}
              className="flex flex-col gap-8 sm:flex-row sm:items-center md:justify-end"
            >
              <div className="flex flex-wrap items-center gap-5">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3.5 rounded-full bg-[#c5f82a] py-4 px-8 text-[15px] font-extrabold text-black transition-all hover:bg-[#d4ff4a] hover:scale-[1.04]"
                >
                  Let's Collaborate
                  <ArrowUpRight size={20} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="/Ali-Huzaifa-CV.pdf"
                  download="Ali Huzaifa CV.pdf"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 py-4 px-8 text-[15px] font-bold text-white transition-all hover:bg-white/10 hover:border-white/20"
                >
                  Download CV
                </a>
              </div>

              {/* Minimal Social Links */}
              <div className="flex items-center gap-5 border-t border-white/5 pt-5 sm:border-t-0 sm:pt-0 sm:pl-6 sm:border-l sm:border-white/10">
                <a
                  href="https://www.linkedin.com/in/ali-huzaifa-92137a292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-black tracking-widest text-neutral-400 uppercase transition-all hover:text-[#c5f82a]"
                >
                  LinkedIn
                </a>
                <span className="text-white/20 text-xs">•</span>
                <a
                  href="https://www.instagram.com/alihuzaifa2112006/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-black tracking-widest text-neutral-400 uppercase transition-all hover:text-[#c5f82a]"
                >
                  Instagram
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Modern Edge Cut Bottom SVG Section */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-[2] h-[10vh] overflow-hidden">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0 100L1440 30V100H0Z" fill="#0a0a0a" />
        </svg>
      </div>
    </section>
  )
}

export default Hero