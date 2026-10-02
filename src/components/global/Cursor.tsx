import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [data-cursor]'

/** Trailing ring that grows over interactive elements; shows `data-cursor` text when present. */
const Cursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduced)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(INTERACTIVE)
      setHovering(Boolean(target))
      setLabel(target?.dataset.cursor ?? null)
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = label ? 92 : hovering ? 56 : 34

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[110] flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor: label ? 'rgba(197,248,42,1)' : 'rgba(255,255,255,0)',
          borderColor: label ? 'rgba(197,248,42,0)' : hovering ? 'rgba(197,248,42,0.9)' : 'rgba(255,255,255,0.35)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[11px] font-medium tracking-[0.15em] text-ink uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[110] h-1.5 w-1.5 rounded-full bg-brand"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && !label ? 1 : 0, scale: hovering ? 0 : 1 }}
      />
    </>
  )
}

export default Cursor
