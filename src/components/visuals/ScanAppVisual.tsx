import React, { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { Home, PieChart, ScanLine, Sparkles, User, Zap } from 'lucide-react'
import { cn } from '../../lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

interface Receipt {
  store: string
  category: string
  color: string
  items: [string, number][]
}

const RECEIPTS: Receipt[] = [
  {
    store: 'GROCERY MART',
    category: 'Groceries',
    color: '#c5f82a',
    items: [
      ['Milk 1L', 320],
      ['Bread', 180],
      ['Eggs x12', 450],
      ['Basmati 5kg', 1500],
    ],
  },
  {
    store: 'CAFE BLOOM',
    category: 'Dining',
    color: '#f9a8d4',
    items: [
      ['Latte', 650],
      ['Croissant', 420],
      ['Cookie', 250],
      ['Water', 130],
    ],
  },
  {
    store: 'METRO FUEL',
    category: 'Transport',
    color: '#67e8f9',
    items: [
      ['Petrol 15L', 4200],
      ['Engine oil', 1850],
      ['Car wash', 600],
      ['Freshener', 350],
    ],
  },
]

const BASE_TX = [
  { id: 'netflix', name: 'Netflix', category: 'Subscription', amount: -1100, color: '#f87171' },
  { id: 'salary', name: 'Salary', category: 'Income', amount: 85000, color: '#4ade80' },
  { id: 'uber', name: 'Uber', category: 'Transport', amount: -640, color: '#fbbf24' },
]

const START_BALANCE = 148250
const SCAN_MS = 2600
const PHASES = [
  { name: 'scan', ms: SCAN_MS },
  { name: 'analyze', ms: 1000 },
  { name: 'done', ms: 2800 },
] as const
type Phase = (typeof PHASES)[number]['name']

const total = (r: Receipt) => r.items.reduce((sum, [, v]) => sum + v, 0)
const fmt = (n: number) => n.toLocaleString('en-US')
const titleCase = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())

// Viewfinder geometry (px) so the scan line and row highlights stay in sync.
const VIEW_H = 150
const RECEIPT_TOP = 14
const HEADER_H = 22
const ROW_H = 13
const rowCenter = (row: number) => RECEIPT_TOP + HEADER_H + row * ROW_H + ROW_H / 2
const passDelay = (y: number) => (y / VIEW_H) * (SCAN_MS / 1000)

/**
 * Steps through scan → analyze → done while visible. Each time the card scrolls back into view the
 * scan restarts (`run` changes), so nobody lands on a half-finished scan that froze offscreen.
 */
const usePhaseLoop = (active: boolean, frozen: boolean) => {
  const [state, setState] = useState({ i: 0, cycle: 0, run: 0 })

  useEffect(() => {
    if (active && !frozen) setState((s) => ({ ...s, i: 0, run: s.run + 1 }))
  }, [active, frozen])

  useEffect(() => {
    if (!active || frozen || state.run === 0) return
    const t = setTimeout(
      () => setState((s) => (s.i + 1 >= PHASES.length ? { ...s, i: 0, cycle: s.cycle + 1 } : { ...s, i: s.i + 1 })),
      PHASES[state.i].ms,
    )
    return () => clearTimeout(t)
  }, [active, frozen, state])

  return {
    phase: (frozen ? 'done' : PHASES[state.i].name) as Phase,
    cycle: state.cycle,
    /** Changes on every new scan, including restarts — use as a React key to replay animations. */
    scanKey: `${state.run}-${state.cycle}`,
    started: frozen || state.run > 0,
  }
}

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const spring = useSpring(value, { stiffness: 70, damping: 20 })
  useEffect(() => spring.set(value), [value, spring])
  const text = useTransform(spring, (v) => fmt(Math.round(v)))
  return <motion.span>{text}</motion.span>
}

const StatusBar = () => (
  <div className="relative flex h-[18px] items-center justify-between px-3.5 pt-1 text-[7px] font-semibold text-white/90">
    <span>9:41</span>
    <span className="absolute top-[4px] left-1/2 h-[10px] w-[34px] -translate-x-1/2 rounded-full bg-black" />
    <span className="flex items-center gap-[3px]">
      <span className="flex items-end gap-[1px]">
        {[3, 4, 5, 6].map((h) => (
          <span key={h} className="w-[1.5px] rounded-full bg-white/90" style={{ height: h }} />
        ))}
      </span>
      <span className="relative h-[6px] w-[12px] rounded-[2px] border border-white/70 p-[1px]">
        <span className="block h-full w-3/4 rounded-[1px] bg-white/90" />
      </span>
    </span>
  </div>
)

const Phone: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    className={cn(
      'relative h-[276px] w-[136px] shrink-0 rounded-[30px] border border-white/15 bg-gradient-to-b from-[#2b2b34] to-[#121217] p-[5px] shadow-[0_34px_60px_-22px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-[var(--ease-premium)]',
      className,
    )}
  >
    <span className="absolute top-16 -left-[2px] h-7 w-[2px] rounded-l bg-white/15" />
    <span className="absolute top-24 -left-[2px] h-7 w-[2px] rounded-l bg-white/15" />
    <span className="absolute top-20 -right-[2px] h-10 w-[2px] rounded-r bg-white/15" />
    <div className="relative h-full w-full overflow-hidden rounded-[25px] bg-[#09090d]">{children}</div>
  </div>
)

const ScannerScreen: React.FC<{ phase: Phase; cycle: number; scanKey: string; started: boolean; receipt: Receipt }> = ({
  phase,
  cycle,
  scanKey,
  started,
  receipt,
}) => {
  const amount = total(receipt)

  return (
    <>
      <StatusBar />
      <div className="px-3 pt-1.5">
        <p className="text-[9px] font-semibold text-white">Scan receipt</p>
        <p className="mt-px text-[6.5px] text-white/45">
          {phase === 'scan' ? 'Hold steady…' : phase === 'analyze' ? 'Reading with AI…' : 'Added to your ledger'}
        </p>
      </div>

      {/* Viewfinder */}
      <div
        className="relative mx-2 mt-2 overflow-hidden rounded-[14px] bg-[radial-gradient(circle_at_50%_40%,#2a2a30,#0d0d12_75%)]"
        style={{ height: VIEW_H }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:12px_12px]" />

        {/* Receipt paper */}
        <div
          key={scanKey}
          className="absolute left-1/2 w-[78%] -translate-x-1/2 rotate-[-2.5deg] rounded-[3px] bg-[#f4f1ea] px-2 pb-2 font-mono text-[#26262b] shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
          style={{ top: RECEIPT_TOP }}
        >
          <div className="flex flex-col items-center justify-center border-b border-dashed border-black/25" style={{ height: HEADER_H }}>
            <span className="text-[6.5px] font-bold tracking-wider">{receipt.store}</span>
            <span className="text-[4.5px] text-black/45">Karachi · #{4821 + cycle}</span>
          </div>
          {receipt.items.map(([name, price], row) => (
            <div key={name} className="relative flex items-center justify-between text-[5.5px]" style={{ height: ROW_H }}>
              <span>{name}</span>
              <span>{fmt(price)}</span>
              <motion.span
                className="absolute -inset-x-1 inset-y-[1.5px] rounded-[2px] border border-[#7fb800] bg-[#c5f82a]/35"
                initial={{ opacity: 0, scaleX: 0.6 }}
                animate={started ? { opacity: 1, scaleX: 1 } : undefined}
                transition={{ delay: phase === 'scan' ? passDelay(rowCenter(row)) : 0, duration: 0.25 }}
              />
            </div>
          ))}
          <div className="relative mt-[2px] flex items-center justify-between border-t border-dashed border-black/25 pt-[3px] text-[6.5px] font-bold">
            <span>TOTAL</span>
            <span>Rs {fmt(amount)}</span>
            <motion.span
              className="absolute -inset-x-1 top-[1px] -bottom-[1px] rounded-[2px] border border-[#7fb800] bg-[#c5f82a]/45"
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={started ? { opacity: 1, scaleX: 1 } : undefined}
              transition={{ delay: phase === 'scan' ? passDelay(rowCenter(receipt.items.length) + 4) : 0, duration: 0.25 }}
            />
          </div>
        </div>

        {/* Corner brackets */}
        {['top-2 left-2 border-t-2 border-l-2 rounded-tl-md', 'top-2 right-2 border-t-2 border-r-2 rounded-tr-md', 'bottom-2 left-2 border-b-2 border-l-2 rounded-bl-md', 'bottom-2 right-2 border-b-2 border-r-2 rounded-br-md'].map(
          (pos) => (
            <motion.span
              key={pos}
              className={cn('absolute h-4 w-4 border-brand', pos)}
              animate={phase === 'scan' ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
              transition={phase === 'scan' ? { duration: 1.2, repeat: Infinity } : { duration: 0.3 }}
            />
          ),
        )}

        {/* Scan line */}
        {started && phase === 'scan' && (
          <motion.div
            key={`line-${scanKey}`}
            className="absolute inset-x-0 h-10 -translate-y-full"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: SCAN_MS / 1000, ease: 'linear' }}
          >
            <div className="h-full bg-gradient-to-b from-transparent to-brand/25" />
            <div className="h-[2px] bg-brand shadow-[0_0_12px_3px_rgba(197,248,42,0.7)]" />
          </motion.div>
        )}

        {/* AI analysis shimmer */}
        {phase === 'analyze' && (
          <>
            <motion.div
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-violet/35 to-transparent"
              initial={{ left: '-50%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-violet px-2 py-[3px] text-[6.5px] font-semibold whitespace-nowrap text-white">
              <Sparkles size={7} /> AI extracting
            </div>
          </>
        )}

        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              key={`toast-${scanKey}`}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
              className="absolute inset-x-2 bottom-2 flex items-center gap-1.5 rounded-lg border border-brand/40 bg-ink/90 px-2 py-1.5 backdrop-blur"
            >
              <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-brand text-[7px] font-bold text-ink">✓</span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[7px] font-semibold text-white">Rs {fmt(amount)} captured</span>
                <span className="block text-[5.5px] text-white/50">{receipt.category} · 4 items</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Camera controls */}
      <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-5">
        <span className="h-5 w-5 rounded-md border border-white/20 bg-[linear-gradient(135deg,#f4f1ea_0%,#bdb7aa_100%)] opacity-70" />
        <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-white/80">
          <motion.span
            className="h-6 w-6 rounded-full bg-white"
            animate={phase === 'scan' ? { scale: [1, 0.86, 1], backgroundColor: ['#ffffff', '#c5f82a', '#ffffff'] } : { scale: 1 }}
            transition={phase === 'scan' ? { duration: 1.3, repeat: Infinity } : { duration: 0.3 }}
          />
        </span>
        <Zap size={11} className="text-white/60" />
      </div>
    </>
  )
}

const AppScreen: React.FC<{ phase: Phase; cycle: number }> = ({ phase, cycle }) => {
  const round = cycle % RECEIPTS.length
  const appliedCount = round + (phase === 'done' ? 1 : 0)
  const applied = RECEIPTS.slice(0, appliedCount)
  const spent = applied.reduce((sum, r) => sum + total(r), 0)
  const transactions = [
    ...applied
      .map((r) => ({ id: r.store, name: titleCase(r.store), category: r.category, amount: -total(r), color: r.color }))
      .reverse(),
    ...BASE_TX,
  ].slice(0, 3)
  const bars = [42, 64, 34, 78, 52, 70]
  const today = Math.min(96, 18 + spent / 140)

  return (
    <>
      <StatusBar />
      <div className="px-3 pt-1.5">
        <div className="flex items-center justify-between">
          <div className="leading-tight">
            <p className="text-[6px] text-white/45">Good evening,</p>
            <p className="text-[9px] font-semibold text-white">Ali</p>
          </div>
          <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-violet to-cyan-400 text-[7px] font-bold text-white">
            A
          </span>
        </div>

        <div className="mt-2 rounded-xl bg-gradient-to-br from-brand to-emerald-400 p-2 text-ink">
          <p className="text-[6px] font-medium opacity-70">Total balance</p>
          <p className="mt-0.5 text-[13px] leading-none font-bold tracking-tight">
            Rs <AnimatedNumber value={START_BALANCE - spent} />
          </p>
          <p className="mt-1 text-[5.5px] font-medium opacity-70">
            {spent ? `↓ Rs ${fmt(spent)} spent today` : 'No spending yet today'}
          </p>
        </div>

        <div className="mt-2 flex h-[30px] items-end gap-[4px]">
          {[...bars, today].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-[2px]">
              <motion.span
                className={cn('w-full rounded-[2px]', i === bars.length ? 'bg-brand' : 'bg-white/15')}
                animate={{ height: `${(h / 100) * 22}px` }}
                transition={{ duration: 0.8, ease }}
              />
              <span className="text-[4.5px] text-white/35">{'MTWTFSS'[i]}</span>
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[7px] font-semibold text-white">Recent</span>
          <span className="text-[5.5px] text-brand">See all</span>
        </div>

        <div className="mt-1 space-y-[3px]">
          <AnimatePresence initial={false} mode="popLayout">
            {transactions.map((tx) => (
              <motion.div
                key={tx.id}
                layout
                initial={{ opacity: 0, x: -14, backgroundColor: 'rgba(197,248,42,0.22)' }}
                animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(255,255,255,0.03)' }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.6, ease, backgroundColor: { duration: 1.6 } }}
                className="flex items-center gap-1.5 rounded-md px-1.5 py-[3px]"
              >
                <span
                  className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[4px] text-[6px] font-bold"
                  style={{ background: `${tx.color}26`, color: tx.color }}
                >
                  {tx.name.charAt(0)}
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[6.5px] font-medium text-white">{tx.name}</span>
                  <span className="block text-[5px] text-white/40">{tx.category}</span>
                </span>
                <span className={cn('text-[6.5px] font-semibold', tx.amount > 0 ? 'text-emerald-400' : 'text-white/85')}>
                  {tx.amount > 0 ? '+' : '−'}
                  {fmt(Math.abs(tx.amount))}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Tab bar */}
      <div className="absolute inset-x-2 bottom-2 flex items-center justify-around rounded-2xl border border-white/5 bg-white/[0.04] py-1.5 text-white/40">
        <Home size={9} className="text-brand" />
        <PieChart size={9} />
        <span className="-my-2 grid h-6 w-6 place-items-center rounded-full bg-brand text-ink shadow-[0_0_14px_-2px_rgba(197,248,42,0.7)]">
          <ScanLine size={10} />
        </span>
        <Sparkles size={9} />
        <User size={9} />
      </div>
    </>
  )
}

/** Scanner phone reads a receipt; the finance app beside it books the transaction live. */
const ScanAppVisual: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduced = useReducedMotion() ?? false
  const { phase, cycle, scanKey, started } = usePhaseLoop(inView, reduced)
  const receipt = RECEIPTS[cycle % RECEIPTS.length]

  return (
    <div ref={ref} className="relative flex h-full w-full items-center justify-center gap-7 [perspective:1100px]">
      <Phone className="[transform:rotateY(18deg)_translateY(10px)] group-hover/spot:[transform:rotateY(8deg)_translateY(4px)]">
        <ScannerScreen phase={phase} cycle={cycle} scanKey={scanKey} started={started} receipt={receipt} />
      </Phone>

      {/* Data hand-off between the two devices */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 h-px w-14 -translate-x-1/2 -translate-y-1/2 overflow-visible">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <AnimatePresence>
          {phase === 'done' && (
            <motion.span
              key={`packet-${scanKey}`}
              className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-brand shadow-[0_0_10px_2px_rgba(197,248,42,0.8)]"
              initial={{ left: '-20%', opacity: 0 }}
              animate={{ left: '110%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>
      </div>

      <Phone className="[transform:rotateY(-18deg)_translateY(-10px)] group-hover/spot:[transform:rotateY(-8deg)_translateY(-4px)]">
        <AppScreen phase={phase} cycle={cycle} />
      </Phone>
    </div>
  )
}

export default ScanAppVisual
