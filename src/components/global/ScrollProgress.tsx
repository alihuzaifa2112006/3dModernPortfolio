import React from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-brand via-brand to-violet"
      style={{ scaleX }}
    />
  )
}

export default ScrollProgress
