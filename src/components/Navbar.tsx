import React, { useState } from 'react'
import { BackgroundRippleEffect } from './ui/background-ripple-effect'

const closeMenu = (setMenuOpen: (v: boolean) => void) => () => setMenuOpen(false)

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Hamburger only - fixed top right */}
      <div className="fixed top-6 right-6 z-[60] md:right-12">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c5f82a]/50 bg-[#0a0a0a]/90 text-white backdrop-blur-sm transition-all duration-300 hover:border-[#c5f82a] hover:bg-[#c5f82a]/10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Backdrop - click outside to close */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-down menu from top */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 overflow-hidden transition-all duration-300 ease-out ${
          menuOpen ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="relative flex min-h-[40vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-12 md:px-12">
          <BackgroundRippleEffect rows={6} cols={50} cellSize={40} variant="bright" />
          <div className="relative z-10 flex w-full flex-col items-center gap-8">
            {/* Links - white text for better visibility */}
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
              <a href="#home" className="text-[14px] font-semibold text-white transition-all duration-300 hover:text-[#c5f82a] hover:scale-110" onClick={closeMenu(setMenuOpen)}>Home</a>
              <a href="#about" className="text-[14px] font-semibold text-white transition-all duration-300 hover:text-[#c5f82a] hover:scale-110" onClick={closeMenu(setMenuOpen)}>About me</a>
              <a href="#projects" className="text-[14px] font-semibold text-white transition-all duration-300 hover:text-[#c5f82a] hover:scale-110" onClick={closeMenu(setMenuOpen)}>Projects</a>
              <a href="#skills" className="text-[14px] font-semibold text-white transition-all duration-300 hover:text-[#c5f82a] hover:scale-110" onClick={closeMenu(setMenuOpen)}>Skills</a>
            </div>

            {/* Contact Button */}
            <a
              href="#contact"
              className="rounded-full border border-[#c5f82a] px-6 py-2 text-[13px] font-medium text-[#c5f82a] transition-all duration-300 hover:bg-[#c5f82a] hover:text-black hover:scale-105 hover:shadow-lg hover:shadow-[#c5f82a]/25 active:scale-95"
              onClick={closeMenu(setMenuOpen)}
            >
              Contact Me
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
