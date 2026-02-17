import React, { useState } from 'react'

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#0a0a0a] px-6 py-4 md:px-12 lg:px-16">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#c5f82a]">
          <span className="text-sm font-black tracking-tight text-black">AHK</span>
        </div>
        <span className="text-[15px] font-bold tracking-tight text-white">AHKFOLIO.</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden items-center gap-8 md:flex">
        <a href="#home" className="text-[13px] font-medium text-white transition-colors hover:text-[#c5f82a]">Home</a>
        <a href="#about" className="text-[13px] font-medium text-[#777] transition-colors hover:text-[#c5f82a]">About me</a>
        <a href="#projects" className="text-[13px] font-medium text-[#777] transition-colors hover:text-[#c5f82a]">Projects</a>
        <a href="#skills" className="text-[13px] font-medium text-[#777] transition-colors hover:text-[#c5f82a]">Skills</a>
      </div>

      {/* Contact Button */}
      <a
        href="#contact"
        className="hidden rounded-full border border-[#c5f82a] px-6 py-2 text-[13px] font-medium text-[#c5f82a] transition-all duration-300 hover:bg-[#c5f82a] hover:text-black md:inline-flex"
      >
        Contact Me
      </a>

      {/* Mobile Menu Toggle */}
      <button className="text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 z-50 flex w-full flex-col items-center gap-4 border-t border-[#1a1a1a] bg-[#0a0a0a] py-6 md:hidden">
          <a href="#home" className="text-sm font-medium text-white" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" className="text-sm font-medium text-[#777]" onClick={() => setMenuOpen(false)}>About me</a>
          <a href="#projects" className="text-sm font-medium text-[#777]" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#blog" className="text-sm font-medium text-[#777]" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href="#contact" className="rounded-full border border-[#c5f82a] px-5 py-2 text-sm font-medium text-[#c5f82a]" onClick={() => setMenuOpen(false)}>Contact Me</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
