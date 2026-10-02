import React, { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MonitorSmartphone, Smartphone } from 'lucide-react'
import { SectionHeading } from './ui/section-heading'
import { projects, type Project } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { cn } from '../lib/utils'

const ease = [0.16, 1, 0.3, 1] as const
const pad = (n: number) => String(n).padStart(2, '0')

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16)
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`
}

const urlLabel = (link?: string) => (link ? new URL(link).hostname.replace(/^www\./, '') : 'private build')

const LiveBadge = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-emerald-300 uppercase">
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
    Live
  </span>
)

const BrowserFrame: React.FC<{ project: Project; className?: string; imgClassName?: string }> = ({
  project,
  className,
  imgClassName,
}) => (
  <div className={cn('min-w-0 overflow-hidden rounded-2xl border border-line-strong bg-ink-3', className)}>
    <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="mx-auto max-w-[60%] truncate rounded-full bg-white/5 px-4 py-1 font-mono text-[10px] text-white/40">
        {urlLabel(project.link)}
      </span>
    </div>
    {/* Fixed ratio (most screenshots are ~2.2:1) so lazy images can't shift layout as they load */}
    <div className="relative aspect-[11/5] overflow-hidden">
      <img
        src={project.image}
        alt={`${project.name} screenshot`}
        loading="lazy"
        className={cn(
          'h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-[1.04]',
          imgClassName,
        )}
      />
    </div>
  </div>
)

const PhoneFrames: React.FC<{ project: Project }> = ({ project }) => {
  const screens = [project.image, ...project.gallery].slice(0, 3)
  return (
    <div className="flex h-full items-center justify-center gap-3 py-6 [perspective:1400px] sm:gap-5">
      {screens.map((src, i) => {
        const offset = i - 1
        return (
          <div
            key={src}
            className="relative w-[28%] max-w-[190px] shrink-0 rounded-[2rem] border border-line-strong bg-ink p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-[var(--ease-premium)]"
            style={{
              transform: `rotateY(${offset * -18}deg) translateY(${offset === 0 ? -16 : 12}px) translateZ(${offset === 0 ? 40 : 0}px)`,
            }}
          >
            <div className="absolute top-3 left-1/2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-black/60" />
            <img
              src={src}
              alt={`${project.name} screen ${i + 1}`}
              loading="lazy"
              className="aspect-[9/19] w-full rounded-[1.6rem] object-cover object-top"
            />
          </div>
        )
      })}
    </div>
  )
}

const TechChips: React.FC<{ tech: string[]; max?: number }> = ({ tech, max = 6 }) => (
  <div className="flex flex-wrap gap-2">
    {tech.slice(0, max).map((t) => (
      <span key={t} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[12px] text-white/70">
        {t}
      </span>
    ))}
    {tech.length > max && (
      <span className="rounded-full border border-line px-3 py-1 text-[12px] text-mute">+{tech.length - max}</span>
    )}
  </div>
)

const FeaturedProject: React.FC<{ project: Project }> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [32, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  return (
    <div ref={ref} className="mt-16 lg:mt-24" style={{ perspective: 1600 }}>
      <motion.div style={{ rotateX, scale, y, transformOrigin: 'center top' }}>
        <Link
          to={`/project/${project.id}`}
          data-cursor="View"
          className="group relative block rounded-[30px] border border-line-strong bg-ink-3/80 p-2 shadow-[0_50px_140px_-30px_rgba(197,248,42,0.28)] sm:p-3"
        >
          <div className="flex items-center gap-1.5 px-3 pt-1.5 pb-3 sm:px-4">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="mx-auto hidden truncate rounded-full bg-white/5 px-5 py-1 font-mono text-[11px] text-white/45 sm:block">
              {urlLabel(project.link)}
            </span>
            <span className="ml-auto sm:ml-0">
              <LiveBadge />
            </span>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] sm:aspect-[16/9]">
            <img
              src={project.image}
              alt={`${project.name} — ${project.subtitle}`}
              className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-14">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand px-3 py-1 font-mono text-[10px] font-medium tracking-[0.15em] text-ink uppercase">
                  ★ Featured project
                </span>
                <h3 className="mt-5 font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-white">
                  {project.name}
                </h3>
                <p className="mt-2 font-serif text-[clamp(1.4rem,2.6vw,2.2rem)] text-brand italic">{project.subtitle}</p>
                <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-white/65 sm:text-[15px]">{project.tagline}</p>
              </div>

              <span className="inline-flex h-14 w-fit shrink-0 items-center gap-3 rounded-full bg-white pr-2 pl-6 text-[14px] font-semibold text-ink transition-colors duration-300 group-hover:bg-brand">
                View case study
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
          className="lg:col-span-7"
        >
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {project.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex gap-3 text-[14px] leading-relaxed text-white/70">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="lg:col-span-5 lg:justify-self-end"
        >
          <TechChips tech={project.tech} max={8} />
        </motion.div>
      </div>
    </div>
  )
}

interface StackCardProps {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
  stacked: boolean
}

const StackCard: React.FC<StackCardProps> = ({ project, index, total, progress, stacked }) => {
  const targetScale = 1 - (total - 1 - index) * 0.045
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  const dim = useTransform(progress, [index / total, 1], [0, (total - 1 - index) * 0.12])
  const rgb = hexToRgb(project.accent)
  const isMobileApp = project.type === 'mobile'

  return (
    <div className={cn(stacked ? 'sticky top-0 flex h-screen items-center' : 'mb-6')}>
      <motion.article
        style={stacked ? { scale, top: `calc(-4vh + ${index * 26}px)` } : undefined}
        initial={stacked ? undefined : { opacity: 0, y: 50 }}
        whileInView={stacked ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease }}
        className="group relative w-full origin-top overflow-hidden rounded-[30px] border border-line-strong bg-ink-3"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full opacity-60 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle, rgba(${rgb},0.22), transparent 65%)` }}
        />
        {stacked && <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-black" style={{ opacity: dim }} />}

        <div className="relative grid lg:min-h-[min(640px,78vh)] lg:grid-cols-12">
          <div className="order-2 flex flex-col p-7 sm:p-10 lg:order-1 lg:col-span-5 lg:p-12">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-mute">
                {pad(index + 2)} <span className="text-dim">/ {pad(total + 1)}</span>
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider uppercase"
                style={{ borderColor: `rgba(${rgb},0.35)`, color: project.accent, background: `rgba(${rgb},0.08)` }}
              >
                {isMobileApp ? <Smartphone size={12} /> : <MonitorSmartphone size={12} />}
                {isMobileApp ? 'Mobile app' : 'Web app'}
              </span>
            </div>

            <div className="mt-10 lg:mt-auto">
              <h3 className="font-display text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-white">
                {project.name}
              </h3>
              <p className="mt-2 font-serif text-[clamp(1.25rem,2vw,1.75rem)] italic" style={{ color: project.accent }}>
                {project.subtitle}
              </p>
              <p className="mt-5 line-clamp-4 text-[14px] leading-[1.75] text-mute sm:text-[15px]">{project.description}</p>
              <div className="mt-6">
                <TechChips tech={project.tech} max={5} />
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to={`/project/${project.id}`}
                  className="group/btn inline-flex h-12 items-center gap-2 rounded-full bg-white pr-1.5 pl-5 text-[13px] font-semibold text-ink transition-colors hover:bg-brand"
                >
                  Case study
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover/btn:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-[13px] font-medium text-white transition-colors hover:border-white/40"
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live demo
                  </a>
                )}
              </div>
            </div>
          </div>

          <Link
            to={`/project/${project.id}`}
            data-cursor="View"
            aria-label={`Open ${project.name} case study`}
            className="relative order-1 block overflow-hidden p-4 sm:p-6 lg:order-2 lg:col-span-7 lg:p-8"
          >
            <div
              className="relative h-full overflow-hidden rounded-[22px] border border-line"
              style={{ background: `linear-gradient(140deg, rgba(${rgb},0.16), rgba(255,255,255,0.02) 55%)` }}
            >
              {isMobileApp ? (
                <PhoneFrames project={project} />
              ) : (
                <div className="flex h-full items-center p-3 sm:p-8 lg:p-10">
                  <BrowserFrame
                    project={project}
                    className="w-full shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-[var(--ease-premium)] lg:[transform:perspective(1400px)_rotateY(-8deg)_rotateX(4deg)] lg:group-hover:[transform:perspective(1400px)_rotateY(0deg)_rotateX(0deg)]"
                  />
                </div>
              )}
            </div>
          </Link>
        </div>
      </motion.article>
    </div>
  )
}

const Projects: React.FC = () => {
  const [featured, ...rest] = projects
  const stackRef = useRef<HTMLDivElement>(null)
  const stacked = useMediaQuery('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

  return (
    <section id="projects" className="relative py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute top-40 left-1/2 h-[50rem] w-[80rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(197,248,42,0.07),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading index="03" label="Selected work" title="Projects that" accent="ship." />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease }}
            className="max-w-md text-[15px] leading-relaxed text-mute lg:pb-3"
          >
            {pad(projects.length)} products engineered end-to-end — AI-powered SaaS, ERP systems, e-commerce, real-time
            apps and mobile.
          </motion.p>
        </div>

        <FeaturedProject project={featured} />

        <div className="mt-28 mb-10 flex items-center gap-4 font-mono text-[11px] tracking-[0.25em] text-mute uppercase lg:mt-40">
          <span>More work</span>
          <span className="h-px flex-1 bg-line" />
          <span>{pad(rest.length)} projects</span>
        </div>

        <div ref={stackRef} className="relative">
          {rest.map((project, i) => (
            <StackCard
              key={project.id}
              project={project}
              index={i}
              total={rest.length}
              progress={scrollYProgress}
              stacked={stacked}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
