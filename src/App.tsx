import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Footer from './components/Footer'
import Testimonials from './components/Testimonials'
import Services from './components/Services'
import Experience from './components/Experience'
import Contact from './components/Contact'


const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0a] text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
