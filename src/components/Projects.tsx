import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LampContainer } from './ui/lamp'
import { useOutsideClick } from '../hooks/useOutsideClick'

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el) } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
import cycloImg from '../assets/cyclo.png'
import rentImg from '../assets/rent.png'
import fitTrackImg from '../assets/fit.jpeg'
import noteImg from '../assets/note.jpeg'
import hireImg from '../assets/hire.jpeg'
import otcoImg from '../assets/otco.png'
import resumeMainImg from '../assets/resume-craft.png'
import resumeGal1 from '../assets/resume-craft-1.png'
import codeMatricsImg from '../assets/codematrics.png'
import codeMatricsGal1 from '../assets/codematrics-1.png'
import codeMatricsGal2 from '../assets/codematrics-2.png'
import codeMatricsGal3 from '../assets/codematrics-3.png'
import webchatImg from '../assets/webchat.png'
import webchatGal1 from '../assets/webchat-1.png'
import projectioImg from '../assets/projectio.png'
import projectioGal1 from '../assets/projectio-1.png'
import projectioGal2 from '../assets/projectio-2.png'
import projectioGal3 from '../assets/projectio-3.png'
import genifyaiImg from '../assets/genifyai.png'
import genifyaiDashboard from '../assets/genifyai-dashboard.png'
import wealthpulseImg from '../assets/wealthpulse.png'
import wealthpulseDashboard from '../assets/wealthpulse-dashboard.png'
import wealthpulseGoals from '../assets/wealthpulse-goals.png'
import wealthpulseAI from '../assets/wealthpulse-ai.png'
import gatherlyImg from '../assets/gatherly.png'
import gatherlyDashboard from '../assets/gatherly-dashboard.png'
import gatherlyCreate from '../assets/gatherly-create.png'
import gatherlyNotifications from '../assets/gatherly-notifications.png'
import pathify2Img from '../assets/pathify-2.png'
import pathify3Img from '../assets/pathify-3.png'
import pathify4Img from '../assets/pathify-4.png'
import pathify5Img from '../assets/pathify-5.png'

interface Project {
  title: string
  description: string
  tech: string[]
  link?: string
  github?: string
  image: string
  featured: boolean
  hero?: boolean
  gallery?: string[]
  highlights?: string[]
  imageMode?: 'cover' | 'contain'
}

const mobileShowcaseProject: Project = {
  title: 'Pathify AI | CareerPath Mobile App',
  description:
    'Pathify AI (CareerPath AI) is a React Native app that helps users find the best career path from an 8-step assessment. It uses Google Gemini for top 3 role suggestions, Firebase Auth for login/signup, Firestore for history, and a clean mobile-first UI built with Expo.',
  tech: ['React Native (Expo)', 'Firebase Auth', 'Firestore', 'Google Gemini API', 'AsyncStorage'],
  link: 'https://expo.dev/accounts/alihuzaifa/projects/pathify-ai/builds/aa6fcb5b-9ac7-41c9-9481-3ebd21481f2a',
  image: pathify2Img,
  featured: true,
  hero: true,
  imageMode: 'contain',
  gallery: [pathify3Img, pathify4Img, pathify5Img],
  highlights: [
    '8-step smart assessment for interests and skills',
    'Top 3 AI career suggestions using Gemini',
    'Secure login/signup with Firebase Authentication',
    'Result and history saving with Firestore',
    'Clean mobile UI and scalable Expo architecture',
  ],
}

const heroProjects: Project[] = [
  {
    title: 'Gatherly | Event Management Platform',
    description:
      'Gatherly is a full-stack event management platform — the public stage for organizers and volunteers. Organizers publish city events, volunteers register and get QR-coded passes, and everyone stays aligned with real-time notifications. Built with a NestJS backend, Prisma ORM, PostgreSQL database, and real-time WebSockets for live updates.',
    tech: ['React', 'NestJS', 'PostgreSQL', 'Prisma', 'MUI', 'WebSockets'],
    image: gatherlyImg,
    featured: true,
    hero: true,
    gallery: [gatherlyDashboard, gatherlyCreate, gatherlyNotifications],
    highlights: [
      'Organizers publish & manage city events with multi-step form',
      'Volunteers/attendees register and get QR-coded gate passes',
      'Admin dashboard for event approval & management',
      'Real-time notifications via WebSockets',
      'Role-based access: Admin, Organizer, Volunteer, Attendee',
      'NestJS backend with Prisma ORM & PostgreSQL',
      'Discover events by city, category & date',
    ],
  },
  {
    title: 'WealthPulse | AI Finance App',
    description:
      'WealthPulse is a modern, AI-powered expense tracking & financial management app designed for individuals and small businesses. Track income, expenses, and savings in real-time, set and achieve financial goals, and get AI-powered personalized financial plans. Features a built-in AI chat assistant, multi-currency support (PKR, USD, INR, AED & more), powerful analytics dashboards, and PDF export for financial plans.',
    tech: ['Next.js 15', 'React 19', 'MongoDB', 'MUI', 'Tailwind CSS', 'Gemini AI', 'Framer Motion'],
    link: 'https://wealth-pulse-ai-beta.vercel.app/',
    image: wealthpulseImg,
    featured: true,
    hero: true,
    gallery: [wealthpulseDashboard, wealthpulseGoals, wealthpulseAI],
    highlights: [
      'Real-time income, expense & savings tracking',
      'AI-powered financial insights & personalized plans',
      'Built-in AI chat for smart financial guidance',
      'Set and achieve financial goals (Umrah, car, savings)',
      'Multi-currency support (PKR, USD, INR, AED & more)',
      'Clean dashboards with powerful analytics',
      'Export financial plans as PDF',
    ],
  },
  // {
  //   title: 'GenifyAI | AI SaaS Platform',
  //   description:
  //     'An AI-powered SaaS platform designed to help creators and professionals generate content faster. With GenifyAI, users can create different types of AI-generated content from a single dashboard — captions for social media, professional emails, images from text prompts, and documents for blogs and articles. Features a clean SaaS dashboard with authentication and API usage limits with call tracking.',
  //   tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gemini API'],
  //   link: 'https://genifyai-xi.vercel.app/',
  //   github: 'https://github.com/alihuzaifa2112006/genifyai',
  //   image: genifyaiImg,
  //   featured: true,
  //   hero: true,
  //   gallery: [genifyaiDashboard],
  //   highlights: [
  //     'AI Caption Generator for social media',
  //     'AI Email Writer for professional emails',
  //     'AI Image Generator from text prompts',
  //     'AI Document Writer for blogs and articles',
  //     'Clean SaaS dashboard with authentication',
  //     'API usage limits with call tracking',
  //   ],
  // },
  {
    title: 'WebChat | Real-Time Chat App',
    description:
      'A full-stack real-time chat application built to enable seamless, instant communication. WebChat features real-time messaging powered by WebSockets, contact management with online/offline status indicators, and a clean responsive UI built with modern components. The platform includes a secure authentication flow and is deployed for production-grade performance.',
    tech: ['Next.js', 'MongoDB', 'Socket.io', 'shadcn/ui', 'TypeScript'],
    link: 'https://webchatapphuzaifa.vercel.app/',
    image: webchatImg,
    featured: true,
    hero: true,
    gallery: [webchatGal1],
    highlights: [
      'Real-time messaging with WebSocket/Socket.io',
      'Online/offline status & contact list',
      'Instant message delivery & updates',
      'Modern authentication flow',
      'Clean, responsive UI with shadcn/ui',
    ],
  },
  {
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
  },
]

const projects: Project[] = [
  {
    title: 'Projectio | SaaS Project Management',
    description:
      'A full-stack SaaS project management platform where managers can create workspaces, add team members, assign projects, and track progress — replicating a real company workflow. Features role-based access control with Manager and Employee roles, JWT-secured authentication, dashboard analytics, team & employee management, and a clean scalable database design.',
    tech: ['Next.js', 'MongoDB', 'JWT', 'Mongoose', 'Tailwind CSS'],
    link: 'https://projectio-ten.vercel.app/',
    image: projectioImg,
    featured: true,
    gallery: [projectioGal1, projectioGal2, projectioGal3],
  },
  {
    title: 'CodeMatrics | Developer Productivity',
    description:
      'A Next.js-based platform where developers can track their coding hours, manage tasks, and get AI-driven insights to analyze and improve their coding performance. The platform combines productivity tools, code analytics, and AI features with a MongoDB backend to help developers optimize their workflow efficiently.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'AI', 'MongoDB'],
    link: 'https://codematrics-sable.vercel.app/',
    image: codeMatricsImg,
    featured: true,
    gallery: [codeMatricsGal1, codeMatricsGal2, codeMatricsGal3],
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

const allProjects: Project[] = [...heroProjects, ...projects]

const Projects: React.FC = () => {

  const [selected, setSelected] = useState<Project | null>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const expandedRef = useRef<HTMLDivElement>(null)

  useOutsideClick(expandedRef, () => setSelected(null))

  const openModal = (project: Project) => {
    setSelected(project)
    setGalleryIndex(0)
  }

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const allGalleryImages = selected?.gallery
    ? [selected.image, ...selected.gallery]
    : null

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) scale(1.02)`
  }, [])

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)'
  }, [])

  return (
    <section id="projects" className="bg-[#0a0a0a]">
      <LampContainer className="pt-10 pb-0">
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-black italic text-white md:text-5xl">
            My  <span className="text-[#c5f82a]">Projects</span>
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-48 bg-gradient-to-r from-transparent via-[#c5f82a] to-transparent" />
          <p className="mt-4 text-sm italic text-[#666]">
            A showcase of my creative solutions and technical implementations
          </p>
        </div>
      </LampContainer>
      <div className="mx-auto max-w-[1300px] px-6 pb-20 md:px-12 lg:px-16">
        <div className="mb-8 overflow-hidden rounded-2xl border border-[#1a2035] bg-[#0d1117] p-4 md:p-6">
          <div className="grid items-center gap-5 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
            <button
              onClick={() => openModal(mobileShowcaseProject)}
              className="group relative mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-[#1d2a3f] bg-[#090f1a] p-2 transition-all hover:border-[#31d0c6]/60"
            >
              <img
                src={mobileShowcaseProject.image}
                alt={mobileShowcaseProject.title}
                className="h-[380px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </button>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#31d0c6] uppercase">Mobile App Showcase</p>
              <h3 className="mt-2 text-2xl font-black text-white">{mobileShowcaseProject.title}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#8892a4]">{mobileShowcaseProject.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {mobileShowcaseProject.tech.map((t) => (
                  <span key={t} className="rounded-full border border-[#1e2d3d] bg-[#0a1929] px-3 py-1 text-[11px] font-medium text-[#7eb8da]">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={mobileShowcaseProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#31d0c6] px-5 py-2.5 text-sm font-semibold text-[#041016] transition-all hover:bg-[#49ddd3]"
                >
                  Download App
                </a>
                <button
                  onClick={() => openModal(mobileShowcaseProject)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#1e2d3d] bg-[#0a1929] px-5 py-2.5 text-sm font-semibold text-[#c5f82a] transition-all hover:border-[#c5f82a]/50 hover:bg-[#c5f82a]/10"
                >
                  View Screenshots
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Uniform Project Grid - same size cards, clean alignment */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onOpen={openModal}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            />
          ))}
        </div>
      </div>

      {/* Aceternity Expandable Card Overlay */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            {/* Expanded Card */}
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
              <motion.div
                ref={expandedRef}
                layoutId={`card-${selected.title}`}
                className="relative w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1a2035] bg-[#0d1117] shadow-2xl shadow-black/60"
                style={{ maxWidth: allGalleryImages ? '760px' : '600px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.15 }}
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/90 hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Gallery or Single Image */}
                {allGalleryImages ? (
                  <div className="relative">
                    <motion.div
                      layoutId={`image-${selected.title}`}
                      className={`relative h-64 overflow-hidden md:h-80 ${selected.imageMode === 'contain' ? 'bg-[#090f1a]' : ''}`}
                    >
                      <img
                        src={allGalleryImages[galleryIndex]}
                        alt={`${selected.title} screenshot`}
                        className={`h-full w-full transition-all duration-300 ${selected.imageMode === 'contain' ? 'object-contain p-2 md:p-3' : 'object-cover object-top'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
                    </motion.div>

                    {allGalleryImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); setGalleryIndex((p) => p === 0 ? allGalleryImages.length - 1 : p - 1) }}
                          className="absolute top-1/2 left-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setGalleryIndex((p) => p === allGalleryImages.length - 1 ? 0 : p + 1) }}
                          className="absolute top-1/2 right-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                      </>
                    )}

                    <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                      {allGalleryImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setGalleryIndex(i) }}
                          className={`h-2 rounded-full transition-all ${i === galleryIndex ? 'w-5 bg-[#c5f82a]' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-1.5 overflow-x-auto px-4 py-3">
                      {allGalleryImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setGalleryIndex(i) }}
                          className={`h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${i === galleryIndex ? 'border-[#c5f82a]' : 'border-transparent opacity-50 hover:opacity-80'}`}
                        >
                          <img
                            src={img}
                            alt=""
                            className={`h-full w-full ${selected.imageMode === 'contain' ? 'object-contain bg-[#090f1a] p-0.5' : 'object-cover object-top'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.div layoutId={`image-${selected.title}`} className="relative h-56 overflow-hidden md:h-72">
                    {selected.image ? (
                      <img src={selected.image} alt={selected.title} className="h-full w-full object-cover object-top" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0d1f0d] via-[#0a1929] to-[#0d1117]">
                        <span className="text-7xl">💰</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
                  </motion.div>
                )}

                {/* Content */}
                <div className="px-8 pt-2 pb-8">
                  <motion.h3 layoutId={`title-${selected.title}`} className="text-2xl font-bold text-white">
                    {selected.title}
                  </motion.h3>

                  <motion.div
                    layoutId={`tech-${selected.title}`}
                    className="mt-3 flex flex-wrap gap-2"
                  >
                    {selected.tech.map((t) => (
                      <span key={t} className="rounded-full border border-[#1e2d3d] bg-[#0a1929] px-3 py-1 text-[11px] font-medium text-[#7eb8da]">
                        {t}
                      </span>
                    ))}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 text-sm leading-relaxed text-[#8892a4]"
                  >
                    {selected.description}
                  </motion.p>

                  {selected.highlights && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="mt-4 space-y-2"
                    >
                      {selected.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[13px] text-[#7eb8da]">
                          <span className="mt-0.5 text-[#c5f82a]">✓</span>
                          {h}
                        </li>
                      ))}
                    </motion.ul>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 flex flex-wrap gap-3"
                  >
                    {selected.link && (
                      <a
                        href={selected.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#c5f82a] px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-[#d4ff4a]"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {selected.github && (
                      <a
                        href={selected.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#1e2d3d] bg-[#0a1929] px-5 py-2.5 text-sm font-semibold text-[#c5f82a] transition-all hover:border-[#c5f82a]/50 hover:bg-[#c5f82a]/10"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

interface CardProps {
  project: Project
  index: number
  onOpen: (p: Project) => void
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void
}

const ProjectCard: React.FC<CardProps> = ({
  project, index, onOpen, onMouseMove, onMouseLeave,
}) => {
  const { ref, isVisible } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      layoutId={`card-${project.title}`}
      onClick={() => onOpen(project)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#1a2035] bg-[#0d1117] hover:border-[#c5f82a]/40 hover:shadow-xl hover:shadow-[#c5f82a]/10"
      style={{
        transformStyle: 'preserve-3d',
        opacity: isVisible ? 1 : 0,
        translate: isVisible ? '0 0' : '0 30px',
        transition: 'opacity 0.5s ease-out, translate 0.5s ease-out, border-color 0.3s, box-shadow 0.3s',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Image - fixed height for consistency */}
      <motion.div
        layoutId={`image-${project.title}`}
        className={`relative h-48 shrink-0 overflow-hidden ${project.imageMode === 'contain' ? 'bg-[#090f1a]' : ''}`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className={`h-full w-full transition-transform duration-500 ${project.imageMode === 'contain' ? 'object-contain p-2 group-hover:scale-[1.03]' : 'object-cover object-top group-hover:scale-105'}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0d1f0d] via-[#0a1929] to-[#0d1117]">
            <span className="text-5xl">💰</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
        {project.link && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-[#1a3a2a] bg-[#0a1929]/90 px-2.5 py-1 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            </span>
            <span className="text-[10px] font-semibold text-[#22c55e]">Live</span>
          </div>
        )}
      </motion.div>

      {/* Content - uniform padding */}
      <div className="flex flex-1 flex-col p-5">
        <motion.h3 layoutId={`title-${project.title}`} className="text-base font-bold leading-tight text-white md:text-lg">
          {project.title}
        </motion.h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-[1.6] text-[#8892a4]">
          {project.description}
        </p>
        <motion.div layoutId={`tech-${project.title}`} className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#1e2d3d] bg-[#0a1929] px-2.5 py-0.5 text-[10px] font-medium text-[#7eb8da]"
            >
              {t}
            </span>
          ))}
        </motion.div>
        <div className="mt-auto pt-4">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-lg bg-[#c5f82a] px-4 py-2 text-[12px] font-semibold text-black transition-all hover:bg-[#d4ff4a]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              View Demo
            </a>
          ) : (
            <span className="text-[12px] text-[#555]">Click for details</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Projects
