import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useLenis } from 'lenis/react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { Magnetic } from './ui/magnetic'
import { NAV_LINKS, SOCIALS } from '../data/site'

const timeFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Karachi',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})

const useKarachiTime = () => {
  const [time, setTime] = useState(() => timeFormat.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setTime(timeFormat.format(new Date())), 15_000)
    return () => clearInterval(id)
  }, [])
  return time
}

const Footer: React.FC = () => {
  const lenis = useLenis()
  const time = useKarachiTime()
  const nameRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: nameRef, offset: ['start end', 'end end'] })
  const nameY = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])
  const nameRotate = useTransform(scrollYProgress, [0, 1], [-18, 0])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { duration: 1.6 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2 pt-20 sm:pt-28">
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.25em] text-mute uppercase">Have an idea?</p>
            <a
              href="#contact"
              onClick={go('contact')}
              className="group mt-4 inline-flex items-center gap-4 font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-none font-semibold tracking-[-0.05em] text-white"
            >
              Let&apos;s <span className="font-serif font-normal text-brand italic">talk</span>
              <span className="grid h-[0.8em] w-[0.8em] place-items-center rounded-full bg-brand text-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-1/2 w-1/2" />
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase">Menu</p>
              <ul className="mt-5 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} onClick={go(link.id)} className="text-[14px] text-white/70 transition-colors hover:text-brand">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase">Socials</p>
              <ul className="mt-5 space-y-3">
                {[
                  { label: 'LinkedIn', href: SOCIALS.linkedin },
                  { label: 'Instagram', href: SOCIALS.instagram },
                  { label: 'WhatsApp', href: `https://wa.me/${SOCIALS.whatsapp}` },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-[14px] text-white/70 transition-colors hover:text-brand"
                    >
                      {s.label}
                      <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase">Contact</p>
              <ul className="mt-5 space-y-3 text-[14px] text-white/70">
                <li>
                  <a href={`mailto:${SOCIALS.email}`} className="break-all transition-colors hover:text-brand">
                    {SOCIALS.email}
                  </a>
                </li>
                <li>
                  <a href="/Ali-Huzaifa-CV.pdf" download="Ali Huzaifa CV.pdf" className="transition-colors hover:text-brand">
                    Download CV
                  </a>
                </li>
                <li className="text-white/50">Karachi, Pakistan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div ref={nameRef} className="relative mt-20 px-3 [perspective:1200px] sm:mt-28 sm:px-6">
        <motion.svg
          viewBox="0 0 1000 150"
          className="w-full origin-bottom"
          style={{ y: nameY, rotateX: nameRotate }}
          role="img"
          aria-label="Ali Huzaifa"
        >
          <defs>
            <linearGradient id="footer-name" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#c5f82a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c5f82a" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="128"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#footer-name)"
            style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, fontSize: 168, letterSpacing: '-0.05em' }}
          >
            ALI HUZAIFA
          </text>
        </motion.svg>
      </div>

      <div className="relative border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-5 py-6 font-mono text-[11px] tracking-[0.12em] text-mute uppercase sm:flex-row sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} Ali Huzaifa. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Karachi · {time}
          </p>
          <Magnetic>
            <button
              type="button"
              onClick={toTop}
              className="group inline-flex items-center gap-2 text-white/70 transition-colors hover:text-brand"
            >
              Back to top
              <span className="glass grid h-9 w-9 place-items-center rounded-full transition-transform duration-500 group-hover:-translate-y-1">
                <ArrowUp size={14} />
              </span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}

export default Footer
