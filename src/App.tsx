import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetail from './components/ProjectDetail'
import Preloader from './components/global/Preloader'
import Cursor from './components/global/Cursor'
import ScrollProgress from './components/global/ScrollProgress'
import { IntroContext } from './context/intro'
import { useMediaQuery } from './hooks/useMediaQuery'

// The intro only plays on the first visit of a session, not when returning from a case study.
let introPlayed = false

const HomePage: React.FC = () => {
  const [ready, setReady] = useState(introPlayed)
  const lenis = useLenis()
  const { hash } = useLocation()

  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden'
    if (ready) lenis?.start()
    else lenis?.stop()
  }, [ready, lenis])

  useEffect(() => {
    if (!ready || !hash) return
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(hash.slice(1))
      if (!el) return
      if (lenis) {
        // Lenis still holds the previous route's (shorter) scroll limit until its observer fires
        lenis.resize()
        lenis.scrollTo(el, { immediate: true, force: true })
      } else el.scrollIntoView()
    })
    return () => cancelAnimationFrame(frame)
  }, [ready, hash, lenis])

  return (
    <IntroContext.Provider value={{ ready }}>
      <AnimatePresence>
        {!ready && (
          <Preloader
            onComplete={() => {
              introPlayed = true
              setReady(true)
            }}
          />
        )}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </IntroContext.Provider>
  )
}

const App: React.FC = () => {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const routes = (
    <>
      <ScrollProgress />
      <Cursor />
      <div aria-hidden className="grain" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </>
  )

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        {reducedMotion ? (
          routes
        ) : (
          <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
            {routes}
          </ReactLenis>
        )}
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
