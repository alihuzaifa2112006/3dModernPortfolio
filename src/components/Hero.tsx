import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Volume2, VolumeX } from 'lucide-react'
import avatarVideo from '../assets/avatar-video.mp4'
import { BackgroundRippleEffect } from './ui/background-ripple-effect'

const ease = [0.16, 1, 0.3, 1] as const

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // Muted on load so browsers allow autoplay without a click
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = isMuted
    void video.play().catch(() => {})
  }, [isMuted])

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    video.muted = nextMuted
    if (!nextMuted) void video.play().catch(() => {})
  }

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
    <section id="home" className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-[50%] w-[50%] -translate-x-1/4 rounded-full bg-[#c5f82a]/5 blur-[100px]" />
        <div className="absolute top-[10%] right-0 h-[45%] w-[45%] translate-x-1/4 rounded-full bg-[#7c5cfc]/6 blur-[90px]" />
      </div>

      <BackgroundRippleEffect rows={14} cols={24} cellSize={44} fill />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-4 pt-8 pb-32 sm:px-6 sm:pb-36 md:px-12 lg:px-16 lg:pt-14 lg:pb-40">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_340px] lg:gap-6 xl:grid-cols-[1fr_380px]">
          {/* Left — text */}
          <div className="min-w-0">
            <motion.h1
              ref={headingRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease }}
              className="font-black italic leading-[0.92] tracking-[-0.03em] text-white uppercase will-change-transform"
              style={{
                fontSize: 'clamp(1.85rem, 7vw, 5.5rem)',
                WebkitTextStroke: '1.5px rgba(0,0,0,0.7)',
                paintOrder: 'stroke fill',
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="block">TURNING IDEAS INTO</span>
              <span className="mt-1 block sm:mt-2">
                <span className="text-[#c5f82a]">HIGH-IMPACT</span> WEB
              </span>
              <span className="mt-1 block sm:mt-2">
                APPLICATIONS <span className="not-italic text-[#c5f82a]">&lt;/&gt;</span>
              </span>
            </motion.h1>

            <motion.div
              className="mt-6 max-w-[420px] sm:mt-8"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.75, ease }}
            >
              <p className="text-[13px] leading-[1.85] text-[#888] sm:text-[13.5px]">
                Hello and welcome to my web developer portfolio! I'm thrilled to showcase my passion for crafting captivating and functional websites.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <a
                  href="#contact"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#c5f82a] py-2.5 pr-7 pl-2.5 text-[13px] font-semibold text-black transition-all hover:bg-[#d4ff4a] hover:scale-105"
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
                  className="group inline-flex w-fit items-center gap-3 text-[13px] font-medium text-white transition-all hover:text-[#c5f82a]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#444] transition-all group-hover:border-[#c5f82a]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  Download CV
                </a>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.65, ease }}
            >
              <span className="text-[11px] font-bold tracking-[0.08em] text-white">Follow Me:</span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/in/ali-huzaifa-92137a292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#333] text-[11px] font-semibold text-white transition-all hover:border-[#c5f82a] hover:text-[#c5f82a]"
                >
                  In.
                </a>
                <a
                  href="https://www.instagram.com/alihuzaifa2112006/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#333] text-white transition-all hover:border-[#c5f82a] hover:text-[#c5f82a]"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — profile (in grid, no absolute overflow) */}
          <motion.div
            className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none lg:justify-self-end"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.85, ease }}
          >
            <div className="relative w-full max-w-[340px] lg:ml-auto">
              <div
                className="absolute rounded-[22px] bg-[#c5f82a]"
                style={{
                  inset: '12px -8px -12px 12px',
                  transform: 'rotate(5deg)',
                }}
              />
              <div className="group relative z-10 aspect-[3/4] w-full overflow-hidden rounded-[22px]">
                <video
                  ref={videoRef}
                  src={avatarVideo}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  preload="auto"
                  className="h-full w-full object-cover object-top"
                  aria-label="Profile introduction video"
                />
                <button
                  type="button"
                  onClick={toggleMute}
                  className="absolute right-3 bottom-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-all hover:border-[#c5f82a] hover:bg-black/80 hover:text-[#c5f82a]"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  aria-pressed={isMuted}
                >
                  {isMuted ? <VolumeX size={18} strokeWidth={2.5} /> : <Volume2 size={18} strokeWidth={2.5} />}
                </button>
              </div>
              <div className="absolute -bottom-2 -left-3 z-20 grid grid-cols-4 gap-1.5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-[#c5f82a] opacity-60" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* White diagonal — clipped inside section */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-[2] h-[clamp(100px,22vw,280px)] overflow-hidden">
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0 400L0 400L1440 80V400H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

export default Hero
