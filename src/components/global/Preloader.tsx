import React, { useEffect, useRef, useState } from 'react'
import { animate, motion } from 'motion/react'

const ease = [0.76, 0, 0.24, 1] as const

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(0)
  const done = useRef(onComplete)
  done.current = onComplete

  useEffect(() => {
    let cancelled = false
    let finishCounter = () => {}
    const counter = new Promise<void>((resolve) => (finishCounter = resolve))
    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => finishCounter(),
    })
    const fonts = document.fonts?.ready ?? Promise.resolve()

    // Lift only once both the counter and the webfonts are done, so the hero never flashes fallback type.
    Promise.all([fonts, counter]).then(() => {
      setTimeout(() => !cancelled && done.current(), 180)
    })

    return () => {
      cancelled = true
      controls.stop()
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-5 text-white sm:p-10"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 1.05, ease }}
    >
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-mute uppercase">
        <span className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand font-display text-[11px] font-extrabold tracking-normal text-ink">
            AH
          </span>
          Portfolio
        </span>
        <span>©{new Date().getFullYear()}</span>
      </div>

      <div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.9] font-semibold tracking-[-0.055em]"
          >
            Ali Huzaifa
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            className="font-serif text-[clamp(1.6rem,5vw,4rem)] leading-tight text-brand italic"
          >
            Full Stack Engineer
          </motion.p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="mb-3 h-px flex-1 bg-white/10">
          <div className="h-px bg-brand transition-[width] duration-100" style={{ width: `${count}%` }} />
        </div>
        <span className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.8] font-semibold tracking-[-0.05em] tabular-nums">
          {String(count).padStart(3, '0')}
        </span>
      </div>
    </motion.div>
  )
}

export default Preloader
