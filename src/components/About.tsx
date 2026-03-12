import React from 'react'
import profileImg from '../assets/profile.jpg'

const About: React.FC = () => {
  return (
    <section id="about" className="relative bg-white px-6 pt-10 pb-20 text-black md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1300px]">
        {/* Top heading row like reference */}
        <div className="mb-16 flex flex-col items-start gap-4 md:flex-row md:items-center">
          <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-[2.8rem]">
            <span className="not-italic">&#128075;</span> Hello! I'm <span className="text-[#7c5cfc]">Ali Huzaifa</span>
          </h2>
          <div className="hidden h-px flex-1 bg-[#ddd] md:block" />
          <p className="text-lg font-medium text-[#555] md:text-xl">
            specializing in React, Next.js & MERN stack
          </p>
        </div>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          {/* Left - Image */}
          <div className="flex w-full justify-center lg:w-2/5">
            <div className="relative">
              <div className="h-80 w-72 overflow-hidden rounded-2xl border-4 border-[#c5f82a] sm:h-96 sm:w-80">
                <img src={profileImg} alt="About" className="h-full w-full object-cover object-top" />
              </div>
              <div className="absolute -right-4 -bottom-4 rounded-2xl bg-[#c5f82a] px-5 py-3 shadow-lg">
                <span className="text-2xl font-black">2+</span>
                <span className="block text-xs font-semibold">Years Exp.</span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="w-full lg:w-3/5">
            <p className="mb-3 text-[12px] font-semibold tracking-[0.15em] text-[#999] uppercase">About Me</p>
            <h3 className="text-2xl font-black leading-tight sm:text-3xl">
              Full/MERN Stack Engineer | <span className="text-[#c5f82a]">Frontend Specialist</span>
            </h3>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.8] text-[#666]">
              Ali Huzaifa is a MERN-stack focused engineer specializing in modern frontend development using React and Next.js. With 2 years of experience in digital product engineering, he builds responsive, scalable web interfaces supported by Node.js and Express.js backends and MongoDB-driven data layers. His development approach emphasizes modular architecture, clean UI implementation and maintainable code structures.
            </p>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-10">
              {[
                { num: '8+', label: 'Projects Done' },
                { num: '2+', label: 'Years Experience' },
                // { num: '5+', label: 'Happy Clients' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="text-3xl font-black">{stat.num}</span>
                  <p className="mt-1 text-[13px] text-[#888]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mt-8 flex flex-wrap gap-2" style={{ perspective: '600px' }}>
              {['Next Js', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Python'].map((skill) => (
                <span
                  key={skill}
                  className="inline-block cursor-default rounded-full border border-[#e5e5e5] bg-[#f5f5f5] px-4 py-2 text-[13px] font-medium text-[#333] transition-all duration-300 hover:scale-110 hover:border-[#c5f82a] hover:bg-[#c5f82a]/10 hover:text-black hover:shadow-lg hover:shadow-[#c5f82a]/20"
                  style={{ transformStyle: 'preserve-3d', transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotateY(15deg) rotateX(-8deg) scale(1.1)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
