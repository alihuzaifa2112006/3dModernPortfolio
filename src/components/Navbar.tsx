import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useLenis } from 'lenis/react'
import { ArrowUpRight } from 'lucide-react'
import { Magnetic } from './ui/magnetic'
import { NAV_LINKS, SOCIALS } from '../data/site'
import { cn } from '../lib/utils'

const ease = [0.16, 1, 0.3, 1] as const
const SECTION_IDS = ['home', ...NAV_LINKS.map((l) => l.id), 'contact']

const Navbar: React.FC = () => {
  const lenis = useLenis()
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 480)
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) {
      // Lenis is stopped while the mobile menu is open and would otherwise ignore this scroll
      lenis.start()
      lenis.scrollTo(el, { duration: 1.6 })
    } else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="fixed inset-x-0 top-0 z-[60] px-4 pt-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <a href="#home" onClick={go('home')} className="group flex items-center gap-3" aria-label="Ali Huzaifa — home">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand font-display text-sm font-extrabold text-ink transition-transform duration-500 group-hover:rotate-[-8deg]">
              AH
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-[15px] font-semibold tracking-tight">Ali Huzaifa</span>
              <span className="block font-mono text-[10px] tracking-[0.2em] text-mute uppercase">Full Stack Engineer</span>
            </span>
          </a>

          <nav
            aria-label="Primary"
            className={cn(
              'hidden items-center gap-1 rounded-full p-1.5 transition-all duration-500 lg:flex',
              scrolled ? 'glass shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]' : 'border border-line bg-white/[0.02]',
            )}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={go(link.id)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300',
                  active === link.id ? 'text-white' : 'text-mute hover:text-white',
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden lg:inline-block">
              <a
                href="#contact"
                onClick={go('contact')}
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-white pr-1.5 pl-5 text-[13px] font-semibold text-ink transition-colors duration-300 hover:bg-brand"
              >
                Let&apos;s talk
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="glass relative grid h-11 w-11 place-items-center rounded-full lg:hidden"
            >
              <span
                className={cn(
                  'absolute h-[1.5px] w-5 bg-white transition-transform duration-500',
                  open ? 'rotate-45' : '-translate-y-[4px]',
                )}
              />
              <span
                className={cn(
                  'absolute h-[1.5px] w-5 bg-white transition-transform duration-500',
                  open ? '-rotate-45' : 'translate-y-[4px]',
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 38px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 38px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 38px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-ink-2 px-6 pt-28 pb-10 lg:hidden"
          >
            <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 opacity-60" />
            <nav aria-label="Mobile" className="relative flex flex-col gap-1">
              {[...NAV_LINKS, { id: 'contact', label: 'Contact' }].map((link, i) => (
                <div key={link.id} className="overflow-hidden">
                  <motion.a
                    href={`#${link.id}`}
                    onClick={go(link.id)}
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.05 }}
                    className={cn(
                      'flex items-baseline gap-4 py-1 font-display text-[clamp(2.4rem,11vw,3.6rem)] leading-[1.05] font-semibold tracking-[-0.04em]',
                      active === link.id ? 'text-brand' : 'text-white',
                    )}
                  >
                    <span className="font-mono text-xs font-normal tracking-normal text-mute">0{i + 1}</span>
                    {link.label}
                  </motion.a>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative flex flex-col gap-4 border-t border-line pt-6"
            >
              <a href={`mailto:${SOCIALS.email}`} className="text-sm text-white">
                {SOCIALS.email}
              </a>
              <div className="flex gap-6 font-mono text-[11px] tracking-[0.2em] text-mute uppercase">
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href="/Ali-Huzaifa-CV.pdf" download="Ali Huzaifa CV.pdf">
                  CV
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
