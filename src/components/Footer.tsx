import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#222] bg-[#0a0a0a] px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Large gradient text - ALI HUZAIFA - same effect as reference */}
        <div className="mb-12 flex justify-center py-12">
          <h2
            className="inline-block text-center font-black uppercase"
            style={{
              fontSize: 'clamp(3.5rem, 14vw, 9rem)',
              background: 'linear-gradient(180deg, #e8ff80 0%, #d4ff4a 25%, #c5f82a 50%, #9ed32a 75%, #6b9e1e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.8)) drop-shadow(4px 4px 6px rgba(0,0,0,0.5))',
            }}
          >
            ALI HUZAIFA  FULL/MERN STACK ENGINEER
          </h2>
        </div>

        {/* Bottom bar - logo, copyright, nav links */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-[#222] pt-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#c5f82a]">
              <span className="text-xs font-black tracking-tight text-black">AH</span>
            </div>
            <p className="text-sm text-[#888]">
              © {new Date().getFullYear()} Ali Huzaifa. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-[#888] transition-colors hover:text-[#c5f82a]"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
