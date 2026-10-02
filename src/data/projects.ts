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

export interface Project {
  id: string
  name: string
  subtitle: string
  description: string
  tech: string[]
  link?: string
  image: string
  gallery: string[]
  highlights: string[]
  tagline?: string
  type: 'web' | 'mobile'
  /** Per-project accent used for glows and chips. */
  accent: string
}

export const projects: Project[] = [
  {
    id: 'wealthpulse',
    name: 'WealthPulse',
    subtitle: 'AI Finance App',
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
    type: 'web',
    accent: '#c5f82a',
  },
  {
    id: 'pathify',
    name: 'Pathify AI',
    subtitle: 'CareerPath Mobile App',
    description:
      'Pathify AI (CareerPath AI) is a React Native app that helps users find the best career path from an 8-step assessment. It uses Google Gemini for top 3 role suggestions, Firebase Auth for login/signup, Firestore for history, and a clean mobile-first UI built with Expo.',
    tech: ['React Native (Expo)', 'Firebase Auth', 'Firestore', 'Google Gemini API', 'AsyncStorage'],
    tagline: 'AI career guidance from an 8-step smart assessment',
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
    type: 'mobile',
    accent: '#31d0c6',
  },
  {
    id: 'agrio',
    name: 'Agrio',
    subtitle: 'Farm Management ERP',
    description:
      'Agrio is a comprehensive farm management ERP system designed to help farmers and agricultural businesses streamline their operations. Features include crop tracking, resource management, financial analytics powered by Gemini AI, and a built-in chatbot for farming guidance.',
    tech: ['React', 'Node.js', 'Express.js', 'Gemini API', 'MongoDB', 'Tailwind CSS'],
    tagline: 'Smart ERP for modern farm management',
    link: 'https://agrio-farmmanagements-alihasan.vercel.app/auth/jwt/login',
    image: agrioPicMain,
    gallery: [agrioPicDashboard, agrioPicFinance, agrioPicChatbot],
    highlights: [
      'Comprehensive crop tracking and resource management system',
      'Financial analytics dashboard with real-time insights',
      'AI-powered farming chatbot using Gemini API for crop guidance',
      'Secure authentication and role-based access control',
      'Responsive design optimized for mobile and desktop',
      'Scalable backend with Express.js and MongoDB',
    ],
    type: 'web',
    accent: '#4ade80',
  },
  {
    id: 'elevera',
    name: 'Elevera',
    subtitle: 'Luxury E-Commerce Platform',
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
    type: 'web',
    accent: '#e0b36a',
  },
  {
    id: 'gatherly',
    name: 'Gatherly',
    subtitle: 'Event Management Platform',
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
    type: 'web',
    accent: '#a78bfa',
  },
  {
    id: 'webchat',
    name: 'WebChat',
    subtitle: 'Real-Time Chat App',
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
    type: 'web',
    accent: '#38bdf8',
  },
  {
    id: 'codematrics',
    name: 'CodeMatrics',
    subtitle: 'Developer Productivity',
    description:
      'A Next.js platform where developers track coding hours, manage tasks, and get AI-driven insights to analyze and improve their coding performance.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'AI', 'MongoDB'],
    link: 'https://codematrics-sable.vercel.app/',
    image: codeMatricsImg,
    gallery: [codeMatricsGal1, codeMatricsGal2, codeMatricsGal3],
    highlights: [],
    type: 'web',
    accent: '#fb923c',
  },
]

export const getProject = (id: string | undefined) => projects.find((p) => p.id === id)
