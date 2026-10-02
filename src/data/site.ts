const devicon = (name: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}`

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/ali-huzaifa-92137a292',
  instagram: 'https://www.instagram.com/alihuzaifa2112006/',
  email: 'alihuzaifa2112006@gmail.com',
  whatsapp: '923178386880',
}

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Journey' },
  { id: 'testimonials', label: 'Reviews' },
]

export interface Skill {
  name: string
  icon: string
  color: string
  level: number
  /** Icons that are black-on-transparent and need inverting on a dark surface. */
  invert?: boolean
}

export interface SkillCategory {
  title: string
  accent: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    accent: '#c5f82a',
    skills: [
      { name: 'HTML', icon: devicon('html5/html5-original.svg'), color: '#E34F26', level: 95 },
      { name: 'CSS', icon: devicon('css3/css3-original.svg'), color: '#1572B6', level: 90 },
      { name: 'JavaScript', icon: devicon('javascript/javascript-original.svg'), color: '#F7DF1E', level: 88 },
      { name: 'TypeScript', icon: devicon('typescript/typescript-original.svg'), color: '#3178C6', level: 82 },
      { name: 'React', icon: devicon('react/react-original.svg'), color: '#61DAFB', level: 90 },
      { name: 'React Native', icon: devicon('react/react-original.svg'), color: '#61DAFB', level: 80 },
      { name: 'Next.js', icon: devicon('nextjs/nextjs-original.svg'), color: '#ffffff', level: 85, invert: true },
      { name: 'Tailwind CSS', icon: devicon('tailwindcss/tailwindcss-original.svg'), color: '#06B6D4', level: 92 },
      { name: 'Material UI', icon: devicon('materialui/materialui-original.svg'), color: '#007FFF', level: 78 },
    ],
  },
  {
    title: 'Backend',
    accent: '#22d3ee',
    skills: [
      { name: 'Node.js', icon: devicon('nodejs/nodejs-original.svg'), color: '#339933', level: 80 },
      { name: 'Express', icon: devicon('express/express-original.svg'), color: '#ffffff', level: 78, invert: true },
      { name: 'NestJS', icon: devicon('nestjs/nestjs-original.svg'), color: '#E0234E', level: 75 },
      { name: 'Firebase', icon: devicon('firebase/firebase-original.svg'), color: '#FFCA28', level: 78 },
      { name: 'Prisma', icon: devicon('prisma/prisma-original.svg'), color: '#ffffff', level: 74, invert: true },
      { name: 'Python', icon: devicon('python/python-original.svg'), color: '#3776AB', level: 70 },
    ],
  },
  {
    title: 'Database',
    accent: '#f472b6',
    skills: [
      { name: 'MongoDB', icon: devicon('mongodb/mongodb-original.svg'), color: '#47A248', level: 75 },
      { name: 'PostgreSQL', icon: devicon('postgresql/postgresql-original.svg'), color: '#4169E1', level: 73 },
      { name: 'MySQL', icon: devicon('mysql/mysql-original.svg'), color: '#4479A1', level: 72 },
    ],
  },
  {
    title: 'DevOps',
    accent: '#a78bfa',
    skills: [
      { name: 'Vercel', icon: devicon('vercel/vercel-original.svg'), color: '#ffffff', level: 85, invert: true },
      { name: 'Render', icon: 'https://cdn.simpleicons.org/render/46E3B7', color: '#46E3B7', level: 75 },
      { name: 'Linux', icon: devicon('linux/linux-original.svg'), color: '#FCC624', level: 78 },
      { name: 'Docker', icon: devicon('docker/docker-original.svg'), color: '#2496ED', level: 72 },
      { name: 'Git', icon: devicon('git/git-original.svg'), color: '#F1502F', level: 88 },
    ],
  },
]

export const experiences = [
  {
    company: 'ITG UAE',
    role: 'Software Developer (Full Stack)',
    duration: 'Jun 2025 – Present',
    location: 'Karachi, Pakistan',
    current: true,
    points: [
      'Developed and maintained full-stack ERP modules using React.js, Next.js, Node.js, and Express for enterprise sourcing systems.',
      'Migrated legacy ASP.NET (VB.NET) ERP architecture into a modern React-based frontend with Node.js backend.',
      'Built scalable REST APIs using Node.js and Express for seamless frontend-backend integration.',
      'Optimized performance across enterprise dashboards and improved responsiveness across all platforms.',
      'Integrated RESTful APIs with backend systems for smooth data flow and business operations.',
      'Built reusable components and scalable full-stack architecture across multiple concurrent projects.',
    ],
  },
  {
    company: 'Data Tronex',
    role: 'Frontend Developer Intern',
    duration: 'Jan 2025 – May 2025',
    location: 'Karachi, Pakistan',
    current: false,
    points: [
      'Worked on real-world client projects using WordPress, HTML, CSS, and JavaScript.',
      'Developed and customized responsive UI components for business websites.',
      'Handled website maintenance, bug fixing, and frontend improvements.',
      'Collaborated with team members and clients to implement feature requests and UI changes.',
      'Gained practical experience in frontend workflows, client communication, and project delivery.',
    ],
  },
]

export const testimonials = [
  {
    company: 'Tricons Studios',
    role: 'Lead Frontend Developer',
    project: 'Restaurant Management System',
    review:
      'Ali Huzaifa delivered an exceptional frontend experience for our restaurant management platform. His React expertise and modern UI approach helped us launch a scalable and professional product.',
  },
  {
    company: 'Aykays Agency',
    role: 'Full Stack Developer',
    project: 'AI Productivity App',
    review:
      'Ali worked on both frontend and backend development for our AI-powered productivity application. Communication, delivery speed, and code quality were excellent throughout the project.',
  },
  {
    company: 'NovaTech Solutions',
    role: 'Frontend Engineer',
    project: 'Business Dashboard',
    review:
      'Working with Ali was smooth and professional. He created responsive dashboards with beautiful UI interactions and optimized the overall user experience significantly.',
  },
]
