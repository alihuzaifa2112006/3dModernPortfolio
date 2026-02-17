import React, { useRef } from 'react'
import profileImg from '../assets/profile.jpg'

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!headingRef.current) return
    const rect = headingRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    const rotateX = y * -12
    const rotateY = x * 12
    headingRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (!headingRef.current) return
    headingRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <section id="home" className="relative bg-[#0a0a0a]" style={{ minHeight: '100vh' }}>
      <div className="relative mx-auto max-w-[1300px] px-6 pt-10 pb-0 md:px-12 lg:px-16 lg:pt-16">

        {/* Heading */}
        <h1
          ref={headingRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative z-[15] font-black italic leading-[0.95] tracking-[-0.02em] text-white uppercase will-change-transform"
          style={{
            fontSize: 'clamp(2.2rem, 5.2vw, 5rem)',
            WebkitTextStroke: '1.5px rgba(0,0,0,0.7)',
            paintOrder: 'stroke fill',
            transition: 'transform 0.15s ease-out',
            transformStyle: 'preserve-3d',
          }}
        >
          <span className="block">BUILDING MODERN</span>
          <span className="mt-2 block pl-6 md:pl-12">
            <span className="not-italic">&#128293;</span>WEB APPS WITH
          </span>
          <span className="mt-2 block">REACT & MERN STACK</span>
        </h1>

        {/* Content below heading */}
        <div className="relative mt-8">
          <div className="relative z-[15] max-w-[420px]">
            <p className="text-[13.5px] leading-[1.85] text-[#888]">
              Hello and welcome to my web developer portfolio! I'm
              thrilled to showcase my passion for crafting captivating
              and functional websites.
            </p>

            <div className="mt-8 flex items-center gap-5">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#c5f82a] py-2.5 pr-7 pl-2.5 text-[13px] font-semibold text-black transition-all hover:bg-[#d4ff4a]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                Let's Talk
              </a>
              <a
                href="#"
                className="group inline-flex items-center gap-3 text-[13px] font-medium text-white transition-colors hover:text-[#c5f82a]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#444] transition-colors group-hover:border-[#c5f82a]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Profile Image - pushed down below the heading */}
        <div className="pointer-events-none absolute top-[180px] right-6 z-10 hidden lg:block xl:right-12" style={{ width: '400px' }}>
          <div className="relative">
            {/* Purple shape */}
            <div
              className="absolute rounded-[22px] bg-[#7c5cfc]"
              style={{
                width: '350px',
                height: '460px',
                top: '25px',
                right: '-16px',
                transform: 'rotate(5deg)',
              }}
            />
            {/* Image */}
            <div className="relative z-10 h-[480px] w-[340px] overflow-hidden rounded-[22px]">
              <img
                src={profileImg}
                alt="Profile"
                className="h-full w-full object-cover object-top"
              />
            </div>
            {/* Dots */}
            <div className="absolute -bottom-2 -left-4 z-20 grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-[#c5f82a] opacity-60" />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Image */}
        <div className="mt-10 flex justify-center lg:hidden">
          <div className="relative">
            <div className="absolute rounded-[20px] bg-[#7c5cfc]" style={{ width: '260px', height: '360px', top: '18px', right: '-12px', transform: 'rotate(5deg)' }} />
            <div className="relative z-10 h-[350px] w-[250px] overflow-hidden rounded-[20px]">
              <img src={profileImg} alt="Profile" className="h-full w-full object-cover object-top" />
            </div>
          </div>
        </div>

        {/* Follow Me */}
        <div className="relative z-[15] mt-16 flex items-center gap-4 pb-44 lg:mt-14">
          <span className="text-[11px] font-bold tracking-[0.08em] text-white">Follow Me:</span>
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.linkedin.com/in/ali-huzaifa-92137a292"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#333] text-[11px] font-semibold text-white transition-all hover:border-[#c5f82a] hover:text-[#c5f82a]"
            >
              In.
            </a>
          </div>
          <div className="h-px w-36 bg-[#444]" />
        </div>
      </div>

      {/* Diagonal white cut */}
      <div className="absolute bottom-0 left-0 z-[1] w-full" style={{ height: '35%' }}>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0 400L0 400L1440 80V400H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

export default Hero
