import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { RevealText } from './ui/reveal-text'
import { Magnetic } from './ui/magnetic'
import { getProject, projects, type Project } from '../data/projects'
import { cn } from '../lib/utils'

const ease = [0.16, 1, 0.3, 1] as const
const pad = (n: number) => String(n).padStart(2, '0')

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16)
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`
}

const WebGallery: React.FC<{ project: Project; images: string[] }> = ({ project, images }) => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [26, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])

  const go = useCallback(
    (step: number) => {
      setDirection(step)
      setIndex((i) => (i + step + images.length) % images.length)
    },
    [images.length],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  return (
    <div ref={ref} style={{ perspective: 1600 }}>
      <motion.div
        style={{ rotateX, scale, transformOrigin: 'center top' }}
        className="rounded-[30px] border border-line-strong bg-ink-3/80 p-2 sm:p-3"
      >
        <div className="flex items-center gap-1.5 px-3 pt-1.5 pb-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-auto font-mono text-[11px] text-white/40">
            {pad(index + 1)} / {pad(images.length)}
          </span>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-ink">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={`${project.name} screenshot ${index + 1}`}
              custom={direction}
              initial={{ opacity: 0, x: `${direction * 8}%`, scale: 1.04 }}
              animate={{ opacity: 1, x: '0%', scale: 1 }}
              exit={{ opacity: 0, x: `${direction * -8}%`, scale: 0.98 }}
              transition={{ duration: 0.8, ease }}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="glass absolute top-1/2 left-4 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white transition-colors hover:text-brand"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="glass absolute top-1/2 right-4 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white transition-colors hover:text-brand"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </motion.div>

      {images.length > 1 && (
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2" data-lenis-prevent>
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              aria-label={`Show screenshot ${i + 1}`}
              className={cn(
                'relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 sm:h-24 sm:w-40',
                i === index ? 'border-brand' : 'border-transparent opacity-45 hover:opacity-90',
              )}
            >
              <img src={img} alt="" className="h-full w-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const MobileGallery: React.FC<{ project: Project; images: string[] }> = ({ project, images }) => (
  <div className="-mx-5 overflow-x-auto px-5 pb-6 sm:mx-0 sm:px-0" data-lenis-prevent>
    <div className="flex w-max gap-5 [perspective:1600px] sm:w-full sm:justify-center">
      {images.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 80, rotateY: -30 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease, delay: i * 0.1 }}
          whileHover={{ y: -12, rotateY: 6 }}
          className="w-[62vw] max-w-[250px] shrink-0 rounded-[2.4rem] border border-line-strong bg-ink p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
          style={{ marginTop: i % 2 === 1 ? 48 : 0 }}
        >
          <img
            src={src}
            alt={`${project.name} screen ${i + 1}`}
            className="aspect-[9/19] w-full rounded-[2rem] object-cover object-top"
          />
        </motion.div>
      ))}
    </div>
  </div>
)

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const lenis = useLenis()
  const project = getProject(projectId)

  useEffect(() => {
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true, force: true })
  }, [projectId, lenis])

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
        <p className="font-mono text-xs tracking-[0.25em] text-mute uppercase">404</p>
        <h1 className="font-display text-5xl font-semibold tracking-[-0.04em]">Project not found</h1>
        <Link to="/#projects" className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink">
          Back to projects
        </Link>
      </div>
    )
  }

  const index = projects.findIndex((p) => p.id === project.id)
  const nextProject = projects[(index + 1) % projects.length]
  const images = [project.image, ...project.gallery]
  const rgb = hexToRgb(project.accent)

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20rem] left-1/2 h-[50rem] w-[90rem] -translate-x-1/2 rounded-full"
        style={{ background: `radial-gradient(ellipse, rgba(${rgb},0.16), transparent 60%)` }}
      />
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-x-0 top-0 h-[60rem]" />

      {/* Top bar */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <Magnetic>
            <button
              type="button"
              onClick={() => navigate('/#projects')}
              className="glass group inline-flex h-11 items-center gap-2 rounded-full pr-5 pl-2 text-[13px] font-medium text-white"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition-transform duration-500 group-hover:-translate-x-0.5">
                <ArrowLeft size={15} />
              </span>
              All projects
            </button>
          </Magnetic>
          <Link to="/" className="grid h-11 w-11 place-items-center rounded-xl bg-brand font-display text-sm font-extrabold text-ink">
            AH
          </Link>
        </div>
      </motion.header>

      <main className="relative mx-auto max-w-[1440px] px-5 pt-36 pb-24 sm:px-8 lg:px-12 lg:pt-44">
        {/* Hero */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-mute uppercase">
          <span style={{ color: project.accent }}>({pad(index + 1)})</span>
          <span className="h-px w-10 bg-line-strong" />
          <span>{project.type === 'mobile' ? 'Mobile app' : 'Web app'}</span>
          {project.link && (
            <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live
            </span>
          )}
        </div>

        <h1 className="mt-6 font-display text-[clamp(3.4rem,11vw,10rem)] leading-[0.88] font-semibold tracking-[-0.06em] text-white">
          <RevealText key={project.id} segments={[{ text: project.name }]} play />
        </h1>
        <motion.p
          key={`${project.id}-sub`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
          className="mt-3 font-serif text-[clamp(1.8rem,4vw,3.4rem)] leading-tight italic"
          style={{ color: project.accent }}
        >
          {project.subtitle}
        </motion.p>

        <motion.div
          key={`${project.id}-meta`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4"
        >
          {[
            { label: 'Category', value: project.subtitle },
            { label: 'Platform', value: project.type === 'mobile' ? 'Mobile · React Native' : 'Web' },
            { label: 'Tech stack', value: `${project.tech.length} technologies` },
            { label: 'Status', value: project.link ? 'Live' : 'Case study' },
          ].map((m) => (
            <div key={m.label} className="bg-ink-2/90 px-5 py-5 sm:px-7 sm:py-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">{m.label}</p>
              <p className="mt-2 text-[14px] font-medium text-white sm:text-[15px]">{m.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Gallery */}
        <div className="mt-16 lg:mt-20">
          {project.type === 'mobile' ? (
            <MobileGallery key={project.id} project={project} images={images} />
          ) : (
            <WebGallery key={project.id} project={project} images={images} />
          )}
        </div>

        {/* Overview */}
        <section className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.25em] text-mute uppercase">Overview</p>
          </div>
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease }}
              className="font-display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.35] font-medium tracking-[-0.025em] text-white/90"
            >
              {project.description}
            </motion.p>
            {project.tagline && <p className="mt-6 text-[15px] text-mute">{project.tagline}</p>}

            <div className="mt-10 flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.04 }}
                  className="rounded-full border px-4 py-2 text-[13px]"
                  style={{ borderColor: `rgba(${rgb},0.3)`, background: `rgba(${rgb},0.06)`, color: 'rgba(255,255,255,0.85)' }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        {project.highlights.length > 0 && (
          <section className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] tracking-[0.25em] text-mute uppercase">Key features</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {project.highlights.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, y: 30, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, ease, delay: (i % 2) * 0.08 }}
                  style={{ transformPerspective: 1000 }}
                  className="rounded-3xl border border-line bg-ink-2 p-6 transition-colors duration-500 hover:border-line-strong"
                >
                  <span className="font-mono text-xs" style={{ color: project.accent }}>
                    {pad(i + 1)}
                  </span>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/80">{h}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-20 flex flex-wrap gap-3 lg:ml-[33.333%] lg:pl-12">
          {project.link && (
            <Magnetic>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-brand pr-2 pl-7 text-[15px] font-semibold text-ink"
              >
                Visit live demo
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-brand transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </Magnetic>
          )}
          <Magnetic>
            <button
              type="button"
              onClick={() => navigate('/#projects')}
              className="glass inline-flex h-14 items-center gap-2 rounded-full px-7 text-[15px] font-medium text-white"
            >
              Back to projects
            </button>
          </Magnetic>
        </div>

        {/* Next */}
        <Link
          to={`/project/${nextProject.id}`}
          data-cursor="Next"
          className="group relative mt-32 block overflow-hidden rounded-[32px] border border-line bg-ink-2"
        >
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] text-mute uppercase">Next project</p>
              <p className="mt-4 font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-white transition-colors duration-500 group-hover:text-brand">
                {nextProject.name}
              </p>
              <p className="mt-2 font-serif text-2xl text-white/50 italic">{nextProject.subtitle}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-white">
                View case study
                <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" />
              </span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line [transform:perspective(1200px)_rotateY(-10deg)] transition-transform duration-700 ease-[var(--ease-premium)] group-hover:[transform:perspective(1200px)_rotateY(0deg)]">
              <img
                src={nextProject.image}
                alt=""
                className={cn(
                  'w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-105',
                  nextProject.type === 'mobile' ? 'aspect-[16/10] object-top' : 'aspect-[16/10]',
                )}
              />
            </div>
          </div>
        </Link>
      </main>
    </div>
  )
}

export default ProjectDetail
