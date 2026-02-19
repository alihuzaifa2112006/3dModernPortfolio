import React, { useState, useEffect } from 'react'
import cycloImg from '../assets/cyclo.png'
import rentImg from '../assets/rent.png'
import fitTrackImg from '../assets/fit.jpeg'
import noteImg from '../assets/note.jpeg'
import hireImg from '../assets/hire.jpeg'
import otcoImg from '../assets/otco.png'
import resumeMainImg from '../assets/resume-craft.png'
import resumeGal1 from '../assets/resume-craft-1.png'

interface Project {
  title: string
  description: string
  tech: string[]
  link?: string
  image: string
  featured: boolean
  hero?: boolean
  gallery?: string[]
  highlights?: string[]
}

const heroProject: Project = {
  title: 'Resume Craft | AI Resume Builder',
  description:
    'An AI-powered resume builder designed to help users create professional, ATS-friendly resumes easily and intelligently. Resume Craft doesn\'t just create resumes — it helps users improve and structure their content using AI assistance powered by Google\'s Gemini API. Features include AI resume generation, intelligent content improvement & grammar correction, AI-based resume analysis & optimization, secure authentication, modern responsive UI, and a real-time resume editing experience.',
  tech: ['Next.js', 'Gemini AI', 'PostgreSQL', 'Tailwind CSS', 'TypeScript'],
  link: 'https://resumecraft-ai-two.vercel.app/',
  image: resumeMainImg,
  featured: true,
  hero: true,
  gallery: [resumeGal1],
  highlights: [
    'AI-powered resume generation with Gemini API',
    'Smart content improvement & grammar correction',
    'ATS-friendly templates & optimization',
    'Secure user authentication system',
    'Real-time editing with live preview',
  ],
}

const projects: Project[] = [
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
  const [galleryIndex, setGalleryIndex] = useState(0)

  const openModal = (project: Project) => {
    setSelected(project)
    setGalleryIndex(0)
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

  const allGalleryImages = selected?.gallery
    ? [selected.image, ...selected.gallery]
    : null

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

        {/* Hero Project — Resume Craft */}
        <div
          onClick={() => openModal(heroProject)}
          className="group relative mb-6 cursor-pointer overflow-hidden rounded-2xl border border-[#1a2035] bg-[#0d1117] transition-all duration-300 hover:border-[#00d4ff]/40"
        >
          <div className="absolute top-4 left-4 z-20 rounded-full bg-[#c5f82a] px-3 py-1 text-[10px] font-bold text-black uppercase">
            Final Project
          </div>
          <div className="absolute top-4 right-4 z-20 rounded-full bg-[#00d4ff] px-3 py-1 text-[10px] font-bold text-black uppercase">
            AI Powered
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative h-64 overflow-hidden md:h-auto md:w-1/2">
              <img
                src={heroProject.image}
                alt={heroProject.title}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d1117]/80 max-md:hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent md:hidden" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 md:w-1/2">
              <h3 className="text-2xl font-bold text-white md:text-3xl">{heroProject.title}</h3>

              <p className="mt-4 text-[13px] leading-[1.8] text-[#8892a4]">
                {heroProject.description}
              </p>

              {heroProject.highlights && (
                <ul className="mt-4 space-y-2">
                  {heroProject.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[12px] text-[#7eb8da]">
                      <span className="mt-0.5 text-[#c5f82a]">&#10003;</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {heroProject.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#1e2d3d] bg-[#0a1929] px-3 py-1 text-[11px] font-medium text-[#7eb8da]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-4">
                <a
                  href="https://resumecraft-ai-two.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#e53e6b] px-5 py-2.5 text-[12px] font-semibold text-white transition-all hover:bg-[#ff4d7d]"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Live Demo
                </a>
                <span className="text-[12px] text-[#555]">Click card to view gallery &rarr;</span>
              </div>
            </div>
          </div>
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
                <div className="absolute top-4 right-4 z-20 rounded-full bg-[#00d4ff] px-3 py-1 text-[10px] font-bold text-black uppercase">
                  Featured
                </div>

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
            className={`relative max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-[#1a2035] bg-[#0d1117] shadow-2xl shadow-black/50 transition-all duration-300 ${allGalleryImages ? 'max-w-3xl' : 'max-w-2xl'} ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
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

            {/* Gallery or Single Image */}
            {allGalleryImages ? (
              <div className="relative">
                <div className="relative h-64 overflow-hidden md:h-80">
                  <img
                    src={allGalleryImages[galleryIndex]}
                    alt={`${selected.title} - ${galleryIndex + 1}`}
                    className="h-full w-full object-cover object-top transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
                </div>

                {/* Navigation Arrows */}
                {allGalleryImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setGalleryIndex((prev) => prev === 0 ? allGalleryImages.length - 1 : prev - 1) }}
                      className="absolute top-1/2 left-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setGalleryIndex((prev) => prev === allGalleryImages.length - 1 ? 0 : prev + 1) }}
                      className="absolute top-1/2 right-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                  {allGalleryImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setGalleryIndex(i) }}
                      className={`h-2 w-2 rounded-full transition-all ${i === galleryIndex ? 'w-5 bg-[#00d4ff]' : 'bg-white/40 hover:bg-white/70'}`}
                    />
                  ))}
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-1.5 overflow-x-auto px-4 py-3">
                  {allGalleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setGalleryIndex(i) }}
                      className={`h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${i === galleryIndex ? 'border-[#00d4ff]' : 'border-transparent opacity-50 hover:opacity-80'}`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative h-56 overflow-hidden md:h-72">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
              </div>
            )}

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

              {selected.highlights && (
                <ul className="mt-4 space-y-2">
                  {selected.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[13px] text-[#7eb8da]">
                      <span className="mt-0.5 text-[#c5f82a]">&#10003;</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

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
