import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'motion/react'
import { useLenis } from 'lenis/react'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { Magnetic } from './ui/magnetic'
import { SceneBoundary, canUseWebGL } from './three/SceneBoundary'
import { useIntro } from '../context/intro'
import { SOCIALS } from '../data/site'

const HeroScene = lazy(() => import('./three/HeroScene'))

const ease = [0.16, 1, 0.3, 1] as const
const ROLES = ['Full Stack Developer', 'MERN Stack Engineer', 'SaaS Builder']
const NAME = 'Ali Huzaifa'

const Hero: React.FC = () => {
  const { ready } = useIntro()
  const lenis = useLenis()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef)
  const [webgl] = useState(canUseWebGL)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (!ready) return
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2800)
    return () => clearInterval(id)
  }, [ready])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.15])

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { duration: 1.6 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1, ease, delay },
  })

  return (
    <section id="home" ref={sectionRef} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div className="grid-fade absolute inset-0" />
        <div className="absolute top-[5%] right-[-15%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_62%)]" />
        <div className="absolute bottom-[-25%] left-[-20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(197,248,42,0.09),transparent_60%)]" />
      </div>

      {/* 3D layer */}
      {webgl && (
        <motion.div aria-hidden style={{ opacity: sceneOpacity }} className="pointer-events-none absolute inset-0 -z-10">
          <SceneBoundary>
            <Suspense fallback={null}>
              <HeroScene active={inView} ready={ready} />
            </Suspense>
          </SceneBoundary>
        </motion.div>
      )}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pt-[44svh] pb-28 sm:px-8 lg:justify-center lg:px-12 lg:pt-32 lg:pb-36"
      >
        <motion.div
          {...enter(0.15)}
          className="glass mb-8 inline-flex w-fit items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-[12px] text-white/80"
        >
          <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15">
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to new opportunities
        </motion.div>

        <h1 className="font-display font-semibold text-white">
          <span className="sr-only">
            {NAME} — {ROLES.join(', ')}
          </span>
          <span aria-hidden className="block overflow-hidden pb-[0.06em]">
            <span className="flex text-[clamp(3.2rem,10.5vw,9.2rem)] leading-[0.9] tracking-[-0.06em]">
              {NAME.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '105%' }}
                  animate={{ y: ready ? '0%' : '105%' }}
                  transition={{ duration: 1.1, ease, delay: 0.05 + i * 0.035 }}
                  className="inline-block whitespace-pre"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </span>

          <span
            aria-hidden
            className="relative mt-1 block h-[1.1em] overflow-hidden text-[clamp(2rem,5.6vw,5.2rem)] leading-[1.1]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {ready && (
                <motion.span
                  key={roleIndex}
                  initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: '-100%', opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-x-0 top-0 block font-serif font-normal tracking-[-0.02em] whitespace-nowrap text-brand italic"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          {...enter(0.55)}
          className="mt-8 max-w-[480px] text-[15px] leading-[1.75] text-white/60 sm:text-[17px]"
        >
          I craft high-performance web applications where pixel-perfect precision meets scalable backend
          architecture — clean digital experiences that scale.
        </motion.p>

        <motion.div {...enter(0.7)} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
          <Magnetic>
            <a
              href="#contact"
              onClick={scrollTo('contact')}
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-brand pr-2 pl-7 text-[15px] font-semibold text-ink shadow-[0_0_40px_-8px_rgba(197,248,42,0.6)] transition-shadow duration-500 hover:shadow-[0_0_60px_-6px_rgba(197,248,42,0.8)]"
            >
              Let&apos;s collaborate
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-brand transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="/Ali-Huzaifa-CV.pdf"
              download="Ali Huzaifa CV.pdf"
              className="glass group inline-flex h-14 items-center gap-2.5 rounded-full px-7 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white/25"
            >
              <Download size={17} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Download CV
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Footer rail */}
      <motion.div
        {...enter(0.95)}
        className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-[1440px] items-end justify-between gap-6 px-5 pb-7 sm:px-8 lg:px-12"
      >
        <a
          href="#about"
          onClick={scrollTo('about')}
          className="group flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-mute uppercase hover:text-white"
        >
          <span className="relative grid h-10 w-6 place-items-start justify-center rounded-full border border-white/20 pt-2">
            <motion.span
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1 rounded-full bg-brand"
            />
          </span>
          <span className="hidden sm:inline">Scroll to explore</span>
          <ArrowDown size={14} className="sm:hidden" />
        </a>

        <p className="hidden font-mono text-[11px] tracking-[0.25em] text-mute uppercase md:block">
          Karachi, PK — Working worldwide
        </p>

        <div className="flex items-center gap-5 font-mono text-[11px] tracking-[0.2em] uppercase">
          {[
            { label: 'LinkedIn', href: SOCIALS.linkedin },
            { label: 'Instagram', href: SOCIALS.instagram },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 text-mute transition-colors hover:text-brand"
            >
              {s.label}
              <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
