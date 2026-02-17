import React, { useState, useEffect } from 'react'
import cycloImg from '../assets/cyclo.png'
import rentImg from '../assets/rent.png'
import fitTrackImg from '../assets/fit.jpeg'
import noteImg from '../assets/note.jpeg'
import hireImg from '../assets/hire.jpeg'
import otcoImg from '../assets/otco.png'

interface Project {
  title: string
  description: string
  tech: string[]
  link?: string
  image: string
  featured: boolean
}

const projects = [
  {
    title: 'Cyclo Cloud | ERP System',
    description:
      'A company project where I work as a Frontend Developer. Cyclo Cloud is a comprehensive cloud-based ERP and CRM platform designed to streamline business operations — featuring modules for customer relationship management, inventory tracking, invoicing, and analytics with a clean, scalable interface.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js'],
    image: cycloImg,
    featured: true,
  },
  {
    title: 'OTCO Pakistan | LMS Platform',
    description:
      'A SaaS-based Learning Management System built for Pakistan Army Initial Test and ISSB preparation. The platform provides comprehensive study material, practice tests, and structured courses covering Arrival Day, Bio Data Forms, Essay Writing, Psych Day assessments, and more — helping candidates prepare effectively for military selection.',
    tech: ['Next.js', 'React', 'Node.js', 'MongoDB'],
    link: 'https://otcopakarmy.vercel.app/',
    image: otcoImg,
    featured: true,
  },
  {
    title: 'Car Rental Web Application',
    description:
      'A modern car rental web application that allows users to browse available cars, view detailed specifications, and rent vehicles easily. The platform focuses on a clean UI, smooth user experience, and responsive design for all devices.',
    tech: ['Next.js', 'MongoDB', 'Node.js', 'Express.js'],
    link: 'https://rent-car-webapp.vercel.app/',
    image: rentImg,
    featured: true,
  },
  {
    title: 'Full Stack Job Finder Application',
    description:
      'A comprehensive job finder application to help users discover and apply for new opportunities. The app provides a user-friendly interface to browse job listings and manage applications.',
    tech: ['React', 'Material UI', 'Tailwind CSS', 'Firebase'],
    link: 'https://hire-hunar.vercel.app/auth',
    image: hireImg,
    featured: true,
  },
  {
    title: 'FitTrack Gym Website',
    description:
      'A modern and responsive gym website built with Next.js, designed to showcase fitness programs, trainers, membership plans, and class schedules. The application focuses on clean UI, smooth navigation, and an engaging user experience across all devices.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript'],
    link: 'https://fittrackgymwebsite.netlify.app/',
    image: fitTrackImg,
    featured: false,
  },
  {
    title: '.noteLife | Note Taking App',
    description:
      'A note app that allows users to create, edit, and delete notes. The app is built with React.js and Tailwind CSS.',
    tech: ['React.js', 'MUI'],
    link: 'https://note-life-app.vercel.app/',
    image: noteImg,
    featured: false,
  },
]

const Projects: React.FC = () => {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  const [selected, setSelected] = useState<Project | null>(null)
  const [visible, setVisible] = useState(false)

  const openModal = (project: Project) => {
    setSelected(project)
    requestAnimationFrame(() => setVisible(true))
  }

  const closeModal = () => {
    setVisible(false)
    setTimeout(() => setSelected(null), 300)
  }

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <section id="projects" className="bg-[#080a13] px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1300px]">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-black italic text-white md:text-5xl">
            Featured <span className="text-[#00d4ff]">Projects</span>
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-48 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
          <p className="mt-4 text-sm italic text-[#666]">
            A showcase of my creative solutions and technical implementations
          </p>
        </div>

        {/* Featured Row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => {
            const isLastOdd =
              featuredProjects.length % 2 !== 0 && index === featuredProjects.length - 1

            return (
              <div
                key={index}
                onClick={() => openModal(project)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-[#1a2035] bg-[#0d1117] transition-all duration-300 hover:border-[#1a3050] ${isLastOdd ? 'md:col-span-2' : ''}`}
              >
                {/* Featured Badge */}
                <div className="absolute top-4 right-4 z-20 rounded-full bg-[#00d4ff] px-3 py-1 text-[10px] font-bold text-black uppercase">
                  Featured
                </div>

                {/* Image */}
                <div className={`relative overflow-hidden ${isLastOdd ? 'h-52 md:h-64' : 'h-52 md:h-56'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="px-6 pt-2 pb-6">
                  <p className="text-[13px] leading-[1.7] text-[#8892a4]">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#1e2d3d] bg-[#0a1929] px-3 py-1 text-[11px] font-medium text-[#7eb8da]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Other Projects Row */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {otherProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => openModal(project)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#1a2035] bg-[#0d1117] transition-all duration-300 hover:border-[#1a3050]"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden md:h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-lg font-bold text-white">
                  {project.title}
                </h3>
              </div>

              {/* Content */}
              <div className="px-6 pt-2 pb-6">
                <p className="text-[13px] leading-[1.7] text-[#8892a4]">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#1e2d3d] bg-[#0a1929] px-3 py-1 text-[11px] font-medium text-[#7eb8da]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ${visible ? 'bg-black/70 backdrop-blur-sm' : 'bg-black/0'}`}
          onClick={closeModal}
        >
          <div
            className={`relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#1a2035] bg-[#0d1117] shadow-2xl shadow-black/50 transition-all duration-300 ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative h-56 overflow-hidden md:h-72">
              <img
                src={selected.image}
                alt={selected.title}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="px-8 pt-2 pb-8">
              <h3 className="text-2xl font-bold text-white">{selected.title}</h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#1e2d3d] bg-[#0a1929] px-3 py-1 text-[11px] font-medium text-[#7eb8da]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#8892a4]">
                {selected.description}
              </p>

              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#e53e6b] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#ff4d7d]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
