import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Footer from './components/Footer'

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0a] text-white">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Footer />
    </div>
  )
}

export default App
