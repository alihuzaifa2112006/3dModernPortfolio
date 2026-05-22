import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 left-0 z-50 overflow-hidden"
          >
            <nav className="relative flex min-h-[min(70vh,520px)] w-full flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 md:min-h-[40vh] md:px-12">
              <BackgroundRippleEffect rows={6} cols={50} cellSize={40} variant="bright" />
              <div className="relative z-10 flex w-full flex-col items-center gap-8">
                <motion.div
                  className="flex flex-col items-center gap-5 sm:gap-6 md:flex-row md:gap-8"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
                  }}
                >
                  {['Home', 'About me', 'Projects', 'Skills'].map((label, i) => (
                    <motion.a
                      key={label}
                      href={`#${['home', 'about', 'projects', 'skills'][i]}`}
                      className="text-[14px] font-semibold text-white transition-colors hover:text-[#c5f82a]"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4 }}
                      onClick={closeMenu(setMenuOpen)}
                    >
                      {label}
                    </motion.a>
                  ))}
                </motion.div>
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className="rounded-full border border-[#c5f82a] px-6 py-2 text-[13px] font-medium text-[#c5f82a] transition-all duration-300 hover:bg-[#c5f82a] hover:text-black hover:scale-105"
                  onClick={closeMenu(setMenuOpen)}
                >
                  Contact Me
                </motion.a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
