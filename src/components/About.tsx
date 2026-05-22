import React from 'react'
import profileImg from '../assets/profile-new.png'
import { ScrollReveal, StaggerReveal, StaggerItem } from './ui/scroll-reveal'

const About: React.FC = () => {
  return (
    <section id="about" className="relative bg-white px-4 pt-10 pb-16 text-black sm:px-6 md:px-12 md:pb-20 lg:px-16">
      <div className="mx-auto max-w-[1300px]">
        <ScrollReveal variant="up" className="mb-10 md:mb-16">
          <div className="flex flex-col items-start gap-3 sm:gap-4 md:flex-row md:items-center">
            <h2 className="text-2xl font-black leading-tight sm:text-3xl md:text-4xl lg:text-[2.8rem]">
              I'm <span className="text-[#7c5cfc]">Ali Huzaifa</span>
            </h2>
            <div className="hidden h-px flex-1 bg-[#ddd] md:block" />
            <p className="text-base font-medium text-[#555] sm:text-lg md:text-xl">
              specializing in React, Next.js & MERN stack
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16 xl:gap-20">
          <ScrollReveal variant="right" delay={0.1} className="flex w-full shrink-0 justify-center lg:w-2/5">
            <div className="relative">
              <div
                className="absolute rounded-[20px]"
                style={{ inset: '-3px', zIndex: 0, borderRadius: '20px', overflow: 'hidden', padding: '3px' }}
              >
                <div
                  className="animate-spin-border absolute"
                  style={{
                    inset: '-100%',
                    background:
                      'conic-gradient(#c5f82a 0deg, #c5f82a 60deg, transparent 120deg, transparent 240deg, #c5f82a 300deg, #c5f82a 360deg)',
                  }}
                />
                <div className="absolute inset-[3px] rounded-[18px] bg-white" />
              </div>
              <div
                className="animate-pulse-glow absolute rounded-[22px]"
                style={{
                  inset: '-8px',
                  zIndex: -1,
                  background: 'radial-gradient(ellipse at center, #c5f82a40, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
              <div className="relative z-10 h-72 w-64 overflow-hidden rounded-[18px] sm:h-80 sm:w-72 md:h-96 md:w-80">
                <img src={profileImg} alt="About" className="h-full w-full object-cover object-top" />
              </div>
              <div className="absolute -right-2 -bottom-3 z-20 rounded-2xl bg-[#c5f82a] px-4 py-2 shadow-lg sm:-right-4 sm:-bottom-4 sm:px-5 sm:py-3">
                <span className="text-xl font-black sm:text-2xl">2+</span>
                <span className="block text-[10px] font-semibold sm:text-xs">Years Exp.</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="w-full lg:w-3/5">
            <ScrollReveal variant="left" delay={0.15}>
              <p className="mb-2 text-[11px] font-semibold tracking-[0.15em] text-[#999] uppercase sm:mb-3 sm:text-[12px]">
                About Me
              </p>
              <h3 className="text-xl font-black leading-tight sm:text-2xl md:text-3xl">
                Full/MERN Stack Engineer | <span className="text-[#c5f82a]">Frontend Specialist</span>
              </h3>
              <p className="mt-4 max-w-xl text-[14px] leading-[1.8] text-[#666] sm:mt-5 sm:text-[15px]">
                Ali Huzaifa is a MERN-stack focused engineer specializing in modern frontend development using React and Next.js. With 2 years of experience in digital product engineering, he builds responsive, scalable web interfaces supported by Node.js and Express.js backends and MongoDB-driven data layers.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-8 flex flex-wrap gap-6 sm:mt-10 sm:gap-10" stagger={0.15}>
              {[
                { num: '8+', label: 'Projects Done' },
                { num: '2+', label: 'Years Experience' },
              ].map((stat) => (
                <StaggerItem key={stat.label} variant="scale">
                  <div>
                    <span className="text-2xl font-black sm:text-3xl">{stat.num}</span>
                    <p className="mt-1 text-[12px] text-[#888] sm:text-[13px]">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>

            <StaggerReveal className="mt-6 flex flex-wrap gap-2 sm:mt-8" stagger={0.06}>
              {['Next Js', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Python'].map((skill) => (
                <StaggerItem key={skill} variant="zoom">
                  <span className="inline-block cursor-default rounded-full border border-[#e5e5e5] bg-[#f5f5f5] px-3 py-1.5 text-[12px] font-medium text-[#333] transition-all duration-300 hover:scale-105 hover:border-[#c5f82a] hover:bg-[#c5f82a]/10 hover:shadow-md hover:shadow-[#c5f82a]/20 sm:px-4 sm:py-2 sm:text-[13px]">
                    {skill}
                  </span>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
