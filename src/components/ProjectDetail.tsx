import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { useParams, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Import all project images
import wealthpulseHero from '../assets/wealthpulse-hero.png'
import wealthpulseImg from '../assets/wealthpulse.png'
import wealthpulseDashboard from '../assets/wealthpulse-dashboard.png'
import wealthpulseGoals from '../assets/wealthpulse-goals.png'
import wealthpulseAI from '../assets/wealthpulse-ai.png'
import pathify2Img from '../assets/pathify-2.png'
import pathify3Img from '../assets/pathify-3.png'
import pathify4Img from '../assets/pathify-4.png'
import pathify5Img from '../assets/pathify-5.png'
import eleveraImg from '../assets/elevera.png'
import eleveraProduct from '../assets/elevera-product.png'
import eleveraCart from '../assets/elevera-cart.png'
import eleveraCheckout from '../assets/elevera-checkout.png'
import gatherlyImg from '../assets/gatherly.png'
import gatherlyDashboard from '../assets/gatherly-dashboard.png'
import gatherlyCreate from '../assets/gatherly-create.png'
import gatherlyNotifications from '../assets/gatherly-notifications.png'
import webchatImg from '../assets/webchat.png'
import webchatGal1 from '../assets/webchat-1.png'
import codeMatricsImg from '../assets/codematrics.png'
import codeMatricsGal1 from '../assets/codematrics-1.png'
import codeMatricsGal2 from '../assets/codematrics-2.png'
import codeMatricsGal3 from '../assets/codematrics-3.png'
import agrioPicMain from '../assets/agrio-main.png'
import agrioPicDashboard from '../assets/agrio-dashboard.jpg'
import agrioPicFinance from '../assets/agrio-finance.png'
import agrioPicChatbot from '../assets/agrio-chatbot.jpeg'

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  link?: string
  github?: string
  image: string
  gallery?: string[]
  highlights?: string[]
  tagline?: string
}

const projectsData: Record<string, Project> = {
  wealthpulse: {
    id: 'wealthpulse',
    title: 'WealthPulse | AI Finance App',
    description:
      'WealthPulse is a modern, AI-powered expense tracking & financial management platform for individuals and small businesses. Track income, expenses, and savings in real-time, set financial goals, and get personalized plans — with Automated Data Capture: upload or enter any receipt and AI scans it to add transactions automatically.',
    tech: ['Next.js 15', 'React 19', 'Python', 'Pandas', 'PostgreSQL', 'MongoDB', 'Claude API', 'MUI', 'Tailwind CSS', 'Render', 'Framer Motion'],
    link: 'https://wealth-pulse-ai-beta.vercel.app/',
    image: wealthpulseHero,
    gallery: [wealthpulseImg, wealthpulseDashboard, wealthpulseGoals, wealthpulseAI],
    tagline: 'AI finance app with receipt scan & automated data capture',
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
  },
  pathify: {
    id: 'pathify',
    title: 'Pathify AI | CareerPath Mobile App',
    description:
      'Pathify AI (CareerPath AI) is a React Native app that helps users find the best career path from an 8-step assessment. It uses Google Gemini for top 3 role suggestions, Firebase Auth for login/signup, Firestore for history, and a clean mobile-first UI built with Expo.',
    tech: ['React Native (Expo)', 'Firebase Auth', 'Firestore', 'Google Gemini API', 'AsyncStorage'],
    link: 'https://expo.dev/accounts/alihuzaifa/projects/pathify-ai/builds/aa6fcb5b-9ac7-41c9-9481-3ebd21481f2a',
    image: pathify2Img,
    gallery: [pathify3Img, pathify4Img, pathify5Img],
    highlights: [
      '8-step smart assessment for interests and skills',
      'Top 3 AI career suggestions using Gemini',
      'Secure login/signup with Firebase Authentication',
      'Result and history saving with Firestore',
      'Clean mobile UI and scalable Expo architecture',
    ],
  },
  agrio: {
    id: 'agrio',
    title: 'Agrio | Farm Management ERP',
    description:
      'Agrio is a comprehensive farm management ERP system designed to help farmers and agricultural businesses streamline their operations. Features include crop tracking, resource management, financial analytics powered by Gemini AI, and a built-in chatbot for farming guidance.',
    tech: ['React', 'Node.js', 'Express.js', 'Gemini API', 'MongoDB', 'Tailwind CSS'],
    link: 'https://agrio-farmmanagements-alihasan.vercel.app/auth/jwt/login',
    image: agrioPicMain,
    gallery: [agrioPicDashboard, agrioPicFinance, agrioPicChatbot],
    tagline: 'Smart ERP for modern farm management',
    highlights: [
      'Comprehensive crop tracking and resource management system',
      'Financial analytics dashboard with real-time insights',
      'AI-powered farming chatbot using Gemini API for crop guidance',
      'Secure authentication and role-based access control',
      'Responsive design optimized for mobile and desktop',
      'Scalable backend with Express.js and MongoDB',
    ],
  },
  elevera: {
    id: 'elevera',
    title: 'Elevera | Luxury E-Commerce Platform',
    description:
      'Elevera is a production-grade full-stack luxury fashion e-commerce platform. Next.js frontend with Redux Toolkit, NestJS backend with MongoDB, complete shopping flow with Stripe payments, and automated CI/CD pipelines.',
    tech: ['Next.js', 'NestJS', 'MongoDB', 'Redux Toolkit', 'Stripe', 'CI/CD', 'TypeScript', 'Tailwind CSS'],
    image: eleveraImg,
    gallery: [eleveraProduct, eleveraCart, eleveraCheckout],
    highlights: [
      'Full-stack e-commerce with Next.js + NestJS',
      'Stripe payment integration with full checkout flow',
      'Redux Toolkit for global state management',
      'Automated CI/CD pipelines for deployment',
      'Elegant minimalist luxury fashion UI',
    ],
  },
  gatherly: {
    id: 'gatherly',
    title: 'Gatherly | Event Management Platform',
    description:
      'Gatherly is a full-stack event management platform for organizers and volunteers. Organizers publish city events, volunteers register and get QR-coded passes, with real-time notifications via WebSockets.',
    tech: ['React', 'NestJS', 'PostgreSQL', 'Prisma', 'MUI', 'WebSockets'],
    image: gatherlyImg,
    gallery: [gatherlyDashboard, gatherlyCreate, gatherlyNotifications],
    highlights: [
      'Organizers publish & manage city events',
      'QR-coded gate passes for volunteers',
      'Real-time notifications via WebSockets',
      'Role-based access control',
    ],
  },
  webchat: {
    id: 'webchat',
    title: 'WebChat | Real-Time Chat App',
    description:
      'A full-stack real-time chat application with WebSocket messaging, contact management, online/offline status, and a clean responsive UI with secure authentication.',
    tech: ['Next.js', 'MongoDB', 'Socket.io', 'shadcn/ui', 'TypeScript'],
    image: webchatImg,
    gallery: [webchatGal1],
    highlights: [
      'Real-time messaging with Socket.io',
      'Online/offline status & contact list',
      'Modern authentication flow',
    ],
  },
  codematrics: {
    id: 'codematrics',
    title: 'CodeMatrics | Developer Productivity',
    description:
      'A Next.js platform where developers track coding hours, manage tasks, and get AI-driven insights to analyze and improve their coding performance.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'AI', 'MongoDB'],
    link: 'https://codematrics-sable.vercel.app/',
    image: codeMatricsImg,
    gallery: [codeMatricsGal1, codeMatricsGal2, codeMatricsGal3],
    highlights: [],
  },
}

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const [galleryIndex, setGalleryIndex] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const project = projectId ? projectsData[projectId] : null

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Project Not Found</h1>
          <button
            onClick={() => navigate('/#projects')}
            className="rounded-lg bg-[#c5f82a] px-6 py-2 font-semibold text-black hover:bg-[#d4ff4a]"
          >
            Back to Projects
          </button>
        </div>
      </div>
    )
  }

  const allImages = project.gallery ? [project.image, ...project.gallery] : [project.image]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectId])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => navigate('/#projects')}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </motion.button>

      <div ref={contentRef} className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:px-12">
        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 overflow-hidden rounded-3xl border border-[#1a2035] bg-[#0d1117] shadow-2xl"
        >
          <div className="relative h-96 overflow-hidden md:h-[500px]">
            <motion.img
              key={allImages[galleryIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={allImages[galleryIndex]}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
          </div>

          {/* Gallery Navigation */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={() => setGalleryIndex((p) => (p === 0 ? allImages.length - 1 : p - 1))}
                className="absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/85"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => setGalleryIndex((p) => (p === allImages.length - 1 ? 0 : p + 1))}
                className="absolute top-1/2 right-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/85"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === galleryIndex ? 'w-5 bg-[#c5f82a]' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto border-t border-[#1a2035] bg-[#0a0a0a] px-4 py-3">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      i === galleryIndex ? 'border-[#c5f82a]' : 'border-transparent opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Title & Tagline */}
          <div>
            <h1 className="mb-3 text-4xl font-black md:text-5xl">{project.title}</h1>
            {project.tagline && <p className="text-lg text-[#c5f82a]">{project.tagline}</p>}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#1e2d3d] bg-[#0a1929] px-4 py-2 text-sm font-medium text-[#7eb8da]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-lg leading-relaxed text-[#8892a4]">{project.description}</p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold text-white">Key Features</h2>
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[#8892a4]">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c5f82a]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#c5f82a] px-6 py-3 font-semibold text-black transition-all hover:bg-[#d4ff4a]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                Visit Live Demo
              </a>
            )}
            <button
              onClick={() => navigate('/#projects')}
              className="inline-flex items-center gap-2 rounded-lg border border-[#1e2d3d] bg-[#0a1929] px-6 py-3 font-semibold text-[#c5f82a] transition-all hover:border-[#c5f82a]/50 hover:bg-[#c5f82a]/10"
            >
              Back to Projects
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectDetail
