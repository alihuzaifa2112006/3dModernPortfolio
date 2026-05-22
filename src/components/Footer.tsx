import React from 'react'
import { ScrollReveal, StaggerReveal, StaggerItem } from './ui/scroll-reveal'

const Footer: React.FC = () => {
  const links = ['Home', 'About', 'Projects', 'Skills']

  return (
    <footer id="contact" className="overflow-x-hidden border-t border-[#222] bg-[#0a0a0a] px-4 py-12 sm:px-6 md:px-12 md:py-16 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal variant="zoom" duration={0.9}>
          <div className="mb-10 flex justify-center py-8 sm:mb-12 sm:py-12">
            <h2
              className="inline-block text-center font-black uppercase leading-[0.95] tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 10vw, 9rem)',
                background:
                  'linear-gradient(180deg, #e8ff80 0%, #d4ff4a 25%, #c5f82a 50%, #9ed32a 75%, #6b9e1e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.8))',
              }}
            >
              <span className="block sm:inline">ALI HUZAIFA</span>
              <span className="mt-1 block text-[0.35em] tracking-[0.12em] sm:mt-0 sm:inline sm:text-[0.22em]">
                {' '}
                FULL/MERN STACK ENGINEER
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.15}>
          <div className="flex flex-col items-center justify-between gap-6 border-t border-[#222] pt-6 sm:pt-8 md:flex-row">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#c5f82a]">
                <span className="text-xs font-black tracking-tight text-black">AH</span>
              </div>
              <p className="text-center text-xs text-[#888] sm:text-sm">
                © {new Date().getFullYear()} Ali Huzaifa. All rights reserved.
              </p>
            </div>

            <StaggerReveal className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" stagger={0.08}>
              {links.map((link) => (
                <StaggerItem key={link} variant="up">
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-xs font-medium text-[#888] transition-colors hover:text-[#c5f82a] sm:text-sm"
                  >
                    {link}
                  </a>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

export default Footer
