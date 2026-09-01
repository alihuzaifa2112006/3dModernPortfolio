import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LampContainer } from './ui/lamp'
import { ScrollReveal } from './ui/scroll-reveal'
import codeMatricsImg from '../assets/codematrics.png'
import codeMatricsGal1 from '../assets/codematrics-1.png'
import codeMatricsGal2 from '../assets/codematrics-2.png'
import codeMatricsGal3 from '../assets/codematrics-3.png'
import webchatImg from '../assets/webchat.png'
import webchatGal1 from '../assets/webchat-1.png'
import wealthpulseHero from '../assets/wealthpulse-hero.png'
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
import agrioPicMain from '../assets/agrio-main.png'
import agrioPicDashboard from '../assets/agrio-dashboard.jpg'
import agrioPicFinance from '../assets/agrio-finance.png'
import agrioPicChatbot from '../assets/agrio-chatbot.jpeg'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
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
  id: 'pathify',
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
  id: 'wealthpulse',
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
  image: wealthpulseHero,
  featured: true,
  hero: true,
  gallery: [wealthpulseImg, wealthpulseDashboard, wealthpulseGoals, wealthpulseAI],
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

const agrioProject: Project = {
  id: 'agrio',
  title: 'Agrio | Farm Management ERP',
  description:
    'Agrio is a comprehensive farm management ERP system designed to help farmers and agricultural businesses streamline their operations. Features include crop tracking, resource management, financial analytics powered by Gemini AI, and a built-in chatbot for farming guidance.',
  tech: ['React', 'Node.js', 'Express.js', 'Gemini API', 'MongoDB', 'Tailwind CSS'],
  link: 'https://agrio-farmmanagements-alihasan.vercel.app/auth/jwt/login',
  image: agrioPicMain,
  featured: true,
  hero: true,
  gallery: [agrioPicDashboard, agrioPicFinance, agrioPicChatbot],
  highlights: [
    'Comprehensive crop tracking and resource management system',
    'Financial analytics dashboard with real-time insights',
    'AI-powered farming chatbot using Gemini API for crop guidance',
    'Secure authentication and role-based access control',
    'Responsive design optimized for mobile and desktop',
    'Scalable backend with Express.js and MongoDB',
  ],
  tagline: 'Smart ERP for modern farm management',
}

const otherWebProjects: Project[] = [
  agrioProject,



  {
    id: 'elevera',
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
    id: 'gatherly',
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
    id: 'webchat',
    title: 'WebChat | Real-Time Chat App',
    description:
      'A full-stack real-time chat application with WebSocket messaging, contact management, online/offline status, and a clean responsive UI with secure authentication.',
    tech: ['Next.js', 'MongoDB', 'Socket.io', 'shadcn/ui', 'TypeScript'],

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
    id: 'codematrics',
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

interface ProjectImageTileProps {
  project: Project
  navigate: (path: string) => void
  variant: 'featured' | 'mobile' | 'web'
  className?: string
}

const ProjectImageTile: React.FC<ProjectImageTileProps> = ({
  project,
  navigate,
  variant,
  className = '',
}) => {
  const isMobile = variant === 'mobile'
  const isFeatured = variant === 'featured'
  const isWeb = variant === 'web'
  const fitsImageSize = isWeb || project.imageMode === 'contain'
  const hasLive = Boolean(project.link)

  return (
    <button
      type="button"
      data-scroll-animate="true"
      onClick={() => navigate(`/project/${project.id}`)}
      className={`group relative w-full overflow-hidden rounded-2xl border bg-[#0d1117] text-left outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[#c5f82a]/50 ${isFeatured
        ? 'border-[#c5f82a]/25 shadow-[0_0_60px_-12px_rgba(197,248,42,0.35)] hover:border-[#c5f82a]/50 hover:shadow-[0_0_80px_-8px_rgba(197,248,42,0.45)]'
        : 'border-white/[0.06] hover:border-[#c5f82a]/35 hover:shadow-[0_0_40px_-8px_rgba(197,248,42,0.25)]'
        } ${className}`}
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

      {/* Image — web/small images: box height follows image, no forced aspect or fill bg */}
      <div
        className={`relative w-full overflow-hidden ${fitsImageSize
          ? ''
          : isFeatured
            ? 'min-h-[220px] bg-[#080c14] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[520px] xl:min-h-[580px]'
            : isMobile
              ? 'min-h-[520px] bg-[#080c14] lg:min-h-full lg:h-full'
              : ''
          }`}
      >
        <img
          src={project.image}
          alt={project.title}
          className={`transition-transform duration-700 ease-out group-hover:scale-[1.03] ${fitsImageSize
            ? 'block h-auto w-full'
            : `h-full w-full group-hover:scale-[1.06] ${isFeatured ? 'object-cover object-center' : 'object-cover object-top'
            }`
            }`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/55">
          <span
            className={`translate-y-4 scale-90 rounded-full border border-[#c5f82a]/40 bg-[#c5f82a] font-bold tracking-wide text-black opacity-0 shadow-lg shadow-[#c5f82a]/20 transition-all duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 ${isFeatured ? 'px-8 py-3.5 text-base md:text-lg' : 'px-6 py-2.5 text-[13px]'
              }`}
          >
            Learn More
          </span>
        </div>

        {/* Bottom label */}
        <div
          className={`absolute right-0 bottom-0 left-0 flex items-end justify-between gap-3 ${isFeatured ? 'p-6 md:p-8' : 'p-4'
            }`}
        >
          <div className={isFeatured ? 'opacity-100' : 'opacity-0 transition-opacity duration-500 group-hover:opacity-100'}>
            <p
              className={`font-bold text-white ${isFeatured ? 'text-xl md:text-3xl lg:text-4xl' : 'max-w-[85%] truncate text-[13px] md:text-sm'
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
  const navigate = useNavigate()
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!projectsRef.current) return
    const projectCards = projectsRef.current.querySelectorAll('[data-scroll-animate]')
    projectCards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])


  return (
    <section id="projects" ref={projectsRef} className="overflow-x-clip bg-[#0a0a0a]">
      <LampContainer className="pt-10 pb-0">
        <ScrollReveal variant="blur" className="mb-6 text-center">
          <h2 className="text-3xl font-black italic text-white sm:text-4xl md:text-5xl">
            My <span className="text-[#c5f82a]">Projects</span>
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-48 bg-gradient-to-r from-transparent via-[#c5f82a] to-transparent" />
          <p className="mt-4 px-2 text-xs italic text-[#666] sm:text-sm">
            Hover to explore — click Learn More for full details
          </p>
        </ScrollReveal>
      </LampContainer>

      <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 md:px-12 md:pb-24 lg:px-16">
        <ScrollReveal variant="zoom" className="mb-6 md:mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#c5f82a] to-transparent" />
            <p className="text-[10px] font-bold tracking-[0.22em] text-[#c5f82a] uppercase sm:text-[11px]">Featured Project</p>
            <span className="h-px flex-1 bg-gradient-to-l from-[#c5f82a]/40 to-transparent" />
          </div>
          <ProjectImageTile project={mainProject} navigate={navigate} variant="featured" />
        </ScrollReveal>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[2fr_3fr] lg:gap-6">
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
            <ScrollReveal variant="right" delay={0.1}>
              <ProjectImageTile project={mobileProject} navigate={navigate} variant="mobile" />
            </ScrollReveal>
          </div>

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
            <div className="columns-1 gap-x-4 sm:columns-2 [column-gap:1rem]">
              {otherWebProjects.map((project, index) => (
                <div key={project.title} className="mb-4 break-inside-avoid">
                  <ScrollReveal variant={index % 2 === 0 ? 'up' : 'scale'} delay={index * 0.08}>
                    <ProjectImageTile project={project} navigate={navigate} variant="web" />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
