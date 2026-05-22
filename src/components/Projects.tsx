import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LampContainer } from './ui/lamp'
import { useOutsideClick } from '../hooks/useOutsideClick'
import codeMatricsImg from '../assets/codematrics.png'
import codeMatricsGal1 from '../assets/codematrics-1.png'
import codeMatricsGal2 from '../assets/codematrics-2.png'
import codeMatricsGal3 from '../assets/codematrics-3.png'
import webchatImg from '../assets/webchat.png'
import webchatGal1 from '../assets/webchat-1.png'
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
import eleveraImg from '../assets/elevera.png'
import eleveraProduct from '../assets/elevera-product.png'
import eleveraCart from '../assets/elevera-cart.png'
import eleveraCheckout from '../assets/elevera-checkout.png'

const useScrollReveal = () => {
  const ref = useRef<HTMLButtonElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

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
  tagline?: string
}

const mobileProject: Project = {
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

const mainProject: Project = {
  title: 'WealthPulse | AI Finance App',
  description:
    'WealthPulse is a modern, AI-powered expense tracking & financial management platform for individuals and small businesses. Track income, expenses, and savings in real-time, set financial goals, and get personalized plans — with Automated Data Capture: upload or enter any receipt and AI scans it to add transactions automatically. Built with Next.js, Python (Pandas), PostgreSQL, Claude API, and deployed on Render.',
  tech: [
    'Next.js 15',
    'React 19',
    'Python',
    'Pandas',
    'PostgreSQL',
    'MongoDB',
    'Claude API',
    'MUI',
    'Tailwind CSS',
    'Render',
    'Framer Motion',
  ],
  tagline: 'AI finance app with receipt scan & automated data capture',
  link: 'https://wealth-pulse-ai-beta.vercel.app/',
  image: wealthpulseImg,
  featured: true,
  hero: true,
  gallery: [wealthpulseDashboard, wealthpulseGoals, wealthpulseAI],
  highlights: [
    'Automated Data Capture — enter or upload any receipt; AI scans & adds it to your ledger',
    'Real-time income, expense & savings tracking',
    'AI-powered financial insights & personalized plans (Claude API)',
    'Built-in AI chat for smart financial guidance',
    'Python + Pandas for data processing & analytics',
    'PostgreSQL database with scalable schema design',
    'Multi-currency support (PKR, USD, INR, AED & more)',
    'Deployed on Render for production hosting',
    'Export financial plans as PDF',
  ],
}

const otherWebProjects: Project[] = [
  {
    title: 'Elevera | Luxury E-Commerce Platform',
    description:
      'Elevera is a production-grade full-stack luxury fashion e-commerce platform. Next.js frontend with Redux Toolkit, NestJS backend with MongoDB, complete shopping flow with Stripe payments, and automated CI/CD pipelines.',
    tech: ['Next.js', 'NestJS', 'MongoDB', 'Redux Toolkit', 'Stripe', 'CI/CD', 'TypeScript', 'Tailwind CSS'],
    image: eleveraImg,
    featured: true,
    hero: true,
    gallery: [eleveraProduct, eleveraCart, eleveraCheckout],
    highlights: [
      'Full-stack e-commerce with Next.js + NestJS',
      'Stripe payment integration with full checkout flow',
      'Redux Toolkit for global state management',
      'Automated CI/CD pipelines for deployment',
      'Elegant minimalist luxury fashion UI',
    ],
  },
  {
    title: 'Gatherly | Event Management Platform',
    description:
      'Gatherly is a full-stack event management platform for organizers and volunteers. Organizers publish city events, volunteers register and get QR-coded passes, with real-time notifications via WebSockets.',
    tech: ['React', 'NestJS', 'PostgreSQL', 'Prisma', 'MUI', 'WebSockets'],
    image: gatherlyImg,
    featured: true,
    hero: true,
    gallery: [gatherlyDashboard, gatherlyCreate, gatherlyNotifications],
    highlights: [
      'Organizers publish & manage city events',
      'QR-coded gate passes for volunteers',
      'Real-time notifications via WebSockets',
      'Role-based access control',
    ],
  },
  {
    title: 'WebChat | Real-Time Chat App',
    description:
      'A full-stack real-time chat application with WebSocket messaging, contact management, online/offline status, and a clean responsive UI with secure authentication.',
    tech: ['Next.js', 'MongoDB', 'Socket.io', 'shadcn/ui', 'TypeScript'],
    link: 'https://webchatapphuzaifa.vercel.app/',
    image: webchatImg,
    featured: true,
    hero: true,
    gallery: [webchatGal1],
    highlights: [
      'Real-time messaging with Socket.io',
      'Online/offline status & contact list',
      'Modern authentication flow',
    ],
  },
  {
    title: 'CodeMatrics | Developer Productivity',
    description:
      'A Next.js platform where developers track coding hours, manage tasks, and get AI-driven insights to analyze and improve their coding performance.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'AI', 'MongoDB'],
    link: 'https://codematrics-sable.vercel.app/',
    image: codeMatricsImg,
    featured: true,
    gallery: [codeMatricsGal1, codeMatricsGal2, codeMatricsGal3],
  },
]

const getGalleryImages = (project: Project) =>
  project.gallery ? [project.image, ...project.gallery] : [project.image]

interface ProjectImageTileProps {
  project: Project
  onOpen: (p: Project) => void
  variant: 'featured' | 'mobile' | 'web'
  index?: number
  className?: string
}

const ProjectImageTile: React.FC<ProjectImageTileProps> = ({
  project,
  onOpen,
  variant,
  index = 0,
  className = '',
}) => {
  const { ref, isVisible } = useScrollReveal()
  const isMobile = variant === 'mobile'
  const isFeatured = variant === 'featured'
  const hasLive = Boolean(project.link)

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(project)}
      className={`group relative w-full overflow-hidden rounded-2xl border bg-[#0d1117] text-left outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[#c5f82a]/50 ${
        isFeatured
          ? 'border-[#c5f82a]/25 shadow-[0_0_60px_-12px_rgba(197,248,42,0.35)] hover:border-[#c5f82a]/50 hover:shadow-[0_0_80px_-8px_rgba(197,248,42,0.45)]'
          : 'border-white/[0.06] hover:border-[#c5f82a]/35 hover:shadow-[0_0_40px_-8px_rgba(197,248,42,0.25)]'
      } ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 60}ms, transform 0.6s ease ${index * 60}ms, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      {isFeatured && (
        <div className="pointer-events-none absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#c5f82a]/50 bg-[#c5f82a] px-3 py-1 text-[11px] font-bold tracking-wide text-black">
            ★ Main Project
          </span>
          {hasLive && (
            <span className="flex items-center gap-1.5 rounded-full border border-[#22c55e]/40 bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-[#22c55e] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              Live Demo
            </span>
          )}
        </div>
      )}

      {/* Image */}
      <div
        className={`relative w-full overflow-hidden bg-[#080c14] ${
          isFeatured
            ? 'min-h-[320px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[560px] xl:min-h-[620px]'
            : isMobile
              ? 'min-h-[520px] lg:min-h-full lg:h-full'
              : 'aspect-[16/10]'
        }`}
      >
        <img
          src={project.image}
          alt={project.title}
          className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06] ${
            project.imageMode === 'contain'
              ? 'object-contain p-4 md:p-6'
              : 'object-cover object-top'
          }`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/55">
          <span
            className={`translate-y-4 scale-90 rounded-full border border-[#c5f82a]/40 bg-[#c5f82a] font-bold tracking-wide text-black opacity-0 shadow-lg shadow-[#c5f82a]/20 transition-all duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 ${
              isFeatured ? 'px-8 py-3.5 text-base md:text-lg' : 'px-6 py-2.5 text-[13px]'
            }`}
          >
            Learn More
          </span>
        </div>

        {/* Bottom label */}
        <div
          className={`absolute right-0 bottom-0 left-0 flex items-end justify-between gap-3 ${
            isFeatured ? 'p-6 md:p-8' : 'p-4'
          }`}
        >
          <div className={isFeatured ? 'opacity-100' : 'opacity-0 transition-opacity duration-500 group-hover:opacity-100'}>
            <p
              className={`font-bold text-white ${
                isFeatured ? 'text-xl md:text-3xl lg:text-4xl' : 'max-w-[85%] truncate text-[13px] md:text-sm'
              }`}
            >
              {project.title.split('|')[0]?.trim() ?? project.title}
            </p>
            {isFeatured && project.tagline && (
              <p className="mt-1 max-w-xl text-sm text-[#8892a4] md:text-base">
                {project.tagline}
              </p>
            )}
          </div>
          {hasLive && !isFeatured && (
            <span className="flex shrink-0 items-center gap-1 rounded-full border border-[#22c55e]/30 bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-[#22c55e] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              Live
            </span>
          )}
        </div>
      </div>

      {/* Mobile frame accent */}
      {isMobile && (
        <>
          <div className="pointer-events-none absolute inset-3 rounded-[1.25rem] border border-white/[0.08]" />
          <div className="pointer-events-none absolute top-4 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-white/20" />
        </>
      )}
    </button>
  )
}

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
    return () => {
      document.body.style.overflow = ''
    }
  }, [selected])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const allGalleryImages = selected ? getGalleryImages(selected) : []

  return (
    <section id="projects" className="bg-[#0a0a0a]">
      <LampContainer className="pt-10 pb-0">
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-black italic text-white md:text-5xl">
            My <span className="text-[#c5f82a]">Projects</span>
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-48 bg-gradient-to-r from-transparent via-[#c5f82a] to-transparent" />
          <p className="mt-4 text-sm italic text-[#666]">
            Hover to explore — click Learn More for full details
          </p>
        </div>
      </LampContainer>

      <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 lg:px-16">
        {/* Main Project — WealthPulse hero */}
        <div className="mb-8 md:mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#c5f82a] to-transparent" />
            <p className="text-[11px] font-bold tracking-[0.22em] text-[#c5f82a] uppercase">Featured Project</p>
            <span className="h-px flex-1 bg-gradient-to-l from-[#c5f82a]/40 to-transparent" />
          </div>
          <ProjectImageTile
            project={mainProject}
            onOpen={openModal}
            variant="featured"
          />
        </div>

        {/* 40% Mobile | 60% Web */}
        <div className="grid min-h-[560px] grid-cols-1 gap-5 lg:grid-cols-[2fr_3fr] lg:gap-6 lg:min-h-[640px]">
          {/* Mobile — 40% */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#31d0c6]/30 bg-[#31d0c6]/10 text-[#31d0c6]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M12 18h.01" />
                </svg>
              </span>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#31d0c6] uppercase">Mobile App</p>
              </div>
            </div>
            <ProjectImageTile
              project={mobileProject}
              onOpen={openModal}
              variant="mobile"
              className="flex-1 lg:min-h-[580px]"
            />
          </div>

          {/* Web — 60% */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#c5f82a]/30 bg-[#c5f82a]/10 text-[#c5f82a]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </span>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#c5f82a] uppercase">Web Applications</p>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {otherWebProjects.map((project, index) => (
                <ProjectImageTile
                  key={project.title}
                  project={project}
                  onOpen={openModal}
                  variant="web"
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 py-8 md:p-6">
              <motion.div
                ref={expandedRef}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#1a2035] bg-[#0d1117] shadow-2xl shadow-black/70"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white/80 backdrop-blur-sm transition-colors hover:bg-black hover:text-white"
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                {/* Gallery */}
                <div className="relative">
                  <div
                    className={`relative h-56 overflow-hidden md:h-72 ${
                      selected.imageMode === 'contain' ? 'bg-[#090f1a]' : ''
                    }`}
                  >
                    <img
                      src={allGalleryImages[galleryIndex]}
                      alt={selected.title}
                      className={`h-full w-full ${
                        selected.imageMode === 'contain'
                          ? 'object-contain p-3'
                          : 'object-cover object-top'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
                  </div>

                  {allGalleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setGalleryIndex((p) =>
                            p === 0 ? allGalleryImages.length - 1 : p - 1
                          )
                        }
                        className="absolute top-1/2 left-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/85"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setGalleryIndex((p) =>
                            p === allGalleryImages.length - 1 ? 0 : p + 1
                          )
                        }
                        className="absolute top-1/2 right-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/85"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                        {allGalleryImages.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setGalleryIndex(i)}
                            className={`h-2 rounded-full transition-all ${
                              i === galleryIndex ? 'w-5 bg-[#c5f82a]' : 'w-2 bg-white/40 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {allGalleryImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto border-t border-[#1a2035] px-4 py-3">
                      {allGalleryImages.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setGalleryIndex(i)}
                          className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                            i === galleryIndex
                              ? 'border-[#c5f82a]'
                              : 'border-transparent opacity-50 hover:opacity-90'
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className={`h-full w-full ${
                              selected.imageMode === 'contain'
                                ? 'object-contain bg-[#090f1a]'
                                : 'object-cover object-top'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-6 pt-4 pb-8 md:px-8">
                  <h3 className="text-xl font-bold text-white md:text-2xl">{selected.title}</h3>

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

                  <p className="mt-4 text-sm leading-relaxed text-[#8892a4]">{selected.description}</p>

                  {selected.highlights && (
                    <ul className="mt-4 space-y-2">
                      {selected.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[13px] text-[#7eb8da]">
                          <span className="mt-0.5 text-[#c5f82a]">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
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
                        {selected === mobileProject ? 'Download / View App' : 'Live Demo'}
                      </a>
                    )}
                    {selected.github && (
                      <a
                        href={selected.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#1e2d3d] bg-[#0a1929] px-5 py-2.5 text-sm font-semibold text-[#c5f82a] transition-all hover:border-[#c5f82a]/50 hover:bg-[#c5f82a]/10"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
