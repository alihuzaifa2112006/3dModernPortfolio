import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Move } from 'lucide-react'
import { SectionHeading } from './ui/section-heading'
import { skillCategories, type Skill } from '../data/site'
import { cn } from '../lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

const fibonacciPoints = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = Math.PI * (3 - Math.sqrt(5)) * i
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r }
  })

const IDLE_VX = 0.0012
const IDLE_VY = 0.0035

/** DOM-based 3D sphere: icons are projected each frame, can be dragged and flicked. */
const SkillSphere: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const radius = useRef(200)
  const points = useMemo(() => fibonacciPoints(skills.length), [skills.length])
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const ro = new ResizeObserver(([entry]) => {
      radius.current = Math.min(entry.contentRect.width, 560) * 0.43
    })
    ro.observe(wrap)

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(wrap)

    let ax = 0.3
    let ay = 0
    let vx = IDLE_VX
    let vy = IDLE_VY
    let isDown = false
    let lastX = 0
    let lastY = 0
    let raf = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      if (!isDown) {
        vx += (IDLE_VX - vx) * 0.025
        vy += (IDLE_VY - vy) * 0.025
      }
      ax += vx
      ay += vy
      const cx = Math.cos(ax)
      const sx = Math.sin(ax)
      const cy = Math.cos(ay)
      const sy = Math.sin(ay)
      const r = radius.current

      for (let i = 0; i < points.length; i++) {
        const el = itemRefs.current[i]
        if (!el) continue
        const p = points[i]
        const x1 = p.x * cy + p.z * sy
        const z1 = -p.x * sy + p.z * cy
        const y2 = p.y * cx - z1 * sx
        const z2 = p.y * sx + z1 * cx
        const depth = (z2 + 1) / 2
        el.style.transform = `translate3d(${x1 * r}px, ${y2 * r}px, 0) translate(-50%, -50%) scale(${0.5 + depth * 0.7})`
        el.style.opacity = String(0.15 + depth * 0.85)
        el.style.zIndex = String(Math.round(depth * 100))
      }
    }
    raf = requestAnimationFrame(tick)

    const onDown = (e: PointerEvent) => {
      isDown = true
      lastX = e.clientX
      lastY = e.clientY
      wrap.setPointerCapture(e.pointerId)
      setDragging(true)
    }
    const onMove = (e: PointerEvent) => {
      if (!isDown) return
      vy = (e.clientX - lastX) * 0.004
      vx = -(e.clientY - lastY) * 0.004
      lastX = e.clientX
      lastY = e.clientY
    }
    const onUp = () => {
      isDown = false
      setDragging(false)
    }

    wrap.addEventListener('pointerdown', onDown)
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerup', onUp)
    wrap.addEventListener('pointercancel', onUp)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      wrap.removeEventListener('pointerdown', onDown)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerup', onUp)
      wrap.removeEventListener('pointercancel', onUp)
    }
  }, [points])

  return (
    <div
      ref={wrapRef}
      className={cn(
        'relative mx-auto aspect-square w-full max-w-[560px] touch-pan-y select-none',
        dragging ? 'cursor-grabbing' : 'cursor-grab',
      )}
      data-cursor="Drag"
    >
      {/* Core + orbit rings */}
      <div aria-hidden className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(197,248,42,0.35),rgba(139,92,246,0.25)_45%,transparent_70%)] blur-2xl" />
      <div aria-hidden className="absolute inset-0 [perspective:900px]">
        <div className="absolute inset-[6%] animate-spin-slow rounded-full border border-white/[0.07] [transform:rotateX(72deg)]" />
        <div className="absolute inset-[14%] animate-spin-slow rounded-full border border-dashed border-brand/20 [animation-direction:reverse] [transform:rotateX(72deg)_rotateY(24deg)]" />
      </div>

      <div className="absolute top-1/2 left-1/2">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            className="absolute top-0 left-0 will-change-transform"
          >
            <div className="group flex flex-col items-center gap-1.5">
              <div
                className="grid h-14 w-14 place-items-center rounded-2xl border border-line-strong bg-ink-3/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md sm:h-16 sm:w-16"
                style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 24px -6px ${skill.color}55` }}
              >
                <img
                  src={skill.icon}
                  alt=""
                  draggable={false}
                  className="h-7 w-7 sm:h-8 sm:w-8"
                  style={skill.invert ? { filter: 'invert(1)' } : undefined}
                />
              </div>
              <span className="font-mono text-[9px] whitespace-nowrap text-white/60 sm:text-[10px]">{skill.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SkillRow: React.FC<{ skill: Skill; index: number; accent: string }> = ({ skill, index, accent }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.5, ease, delay: index * 0.05 }}
    className="group flex items-center gap-4 rounded-2xl border border-transparent px-3 py-3 transition-colors hover:border-line hover:bg-white/[0.02]"
  >
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-ink-3">
      <img src={skill.icon} alt="" className="h-6 w-6" style={skill.invert ? { filter: 'invert(1)' } : undefined} />
    </div>
    <div className="flex-1">
      <div className="flex items-baseline justify-between">
        <span className="text-[15px] font-medium text-white">{skill.name}</span>
        <span className="font-mono text-[11px] text-mute">{skill.level}%</span>
      </div>
      <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1.2, ease, delay: 0.15 + index * 0.05 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}55, ${accent})`, boxShadow: `0 0 12px ${accent}80` }}
        />
      </div>
    </div>
  </motion.div>
)

const Skills: React.FC = () => {
  const [active, setActive] = useState(0)
  const allSkills = useMemo(() => skillCategories.flatMap((c) => c.skills), [])
  const category = skillCategories[active]

  return (
    <section id="skills" className="relative overflow-hidden py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute top-1/2 right-0 h-[40rem] w-[40rem] translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading index="04" label="Tech stack" title="Tools of the" accent="trade." />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease }}
            className="max-w-md text-[15px] leading-relaxed text-mute lg:pb-3"
          >
            {allSkills.length} technologies across {skillCategories.length} disciplines — the toolkit I use to bring
            products to life.
          </motion.p>
        </div>

        <div className="mt-16 grid items-center gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease }}
            className="relative"
          >
            <SkillSphere skills={allSkills} />
            <p className="mt-2 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.25em] text-dim uppercase">
              <Move size={12} /> Drag to spin
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease }}
            className="glass rounded-[30px] p-4 sm:p-6"
          >
            <div role="tablist" aria-label="Skill categories" className="flex flex-wrap gap-1 rounded-2xl bg-black/30 p-1.5">
              {skillCategories.map((c, i) => (
                <button
                  key={c.title}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={cn(
                    'relative flex-1 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors',
                    active === i ? 'text-ink' : 'text-mute hover:text-white',
                  )}
                >
                  {active === i && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: c.accent }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c.title}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={category.title}
                  role="tabpanel"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-1 sm:grid-cols-2 sm:gap-x-4"
                >
                  {category.skills.map((skill, i) => (
                    <SkillRow key={skill.name} skill={skill} index={i} accent={category.accent} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
