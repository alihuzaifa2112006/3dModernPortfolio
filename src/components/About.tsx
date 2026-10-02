import React, { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { MapPin } from 'lucide-react'
import profileImg from '../assets/profile-new.png'
import { SectionHeading } from './ui/section-heading'
import { Tilt } from './ui/tilt'
import { CountUp } from './ui/count-up'

const ease = [0.16, 1, 0.3, 1] as const

const STATEMENT =
  'I craft high-performance web applications where pixel-perfect precision meets scalable backend architecture.'

const STACK = ['Next Js', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Python']

const STATS = [
  { value: '8+', label: 'Projects shipped' },
  { value: '2+', label: 'Years experience' },
  { value: '5+', label: 'Happy clients' },
]

const Word: React.FC<{ children: string; progress: MotionValue<number>; range: [number, number] }> = ({
  children,
  progress,
  range,
}) => {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.24em] inline-block">
      {children}
    </motion.span>
  )
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
const ScrollLitText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

const ProfileCard: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 60, rotateX: 18 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 1.2, ease }}
    style={{ transformPerspective: 1200 }}
    className="mx-auto w-full max-w-[440px]"
  >
    <Tilt max={9} glare className="aspect-[4/5] rounded-[32px]">
      {/* Rotating conic edge */}
      <div aria-hidden className="absolute -inset-px overflow-hidden rounded-[33px]">
        <div className="absolute inset-[-60%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,#c5f82a_50deg,transparent_110deg,transparent_220deg,#8b5cf6_290deg,transparent_350deg)]" />
      </div>

      <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-gradient-to-b from-[#f5f5f1] via-[#e9e9e3] to-[#cfcfc8]">
        <span
          aria-hidden
          className="absolute top-6 left-1/2 -translate-x-1/2 font-display text-[11rem] leading-none font-extrabold tracking-[-0.08em] text-black/[0.06] select-none"
        >
          AH
        </span>
        <img
          src={profileImg}
          alt="Portrait of Ali Huzaifa"
          className="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-auto max-w-none object-contain object-bottom mix-blend-multiply"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Floating layers */}
      <div className="absolute inset-x-5 bottom-5 [transform:translateZ(50px)]">
        <div className="glass flex items-end justify-between rounded-2xl bg-black/30 px-5 py-4">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight text-white">Ali Huzaifa</p>
            <p className="mt-0.5 text-[12px] text-white/60">Full / MERN Stack Engineer</p>
          </div>
          <p className="flex items-center gap-1 font-mono text-[10px] tracking-[0.15em] text-white/60 uppercase">
            <MapPin size={11} /> Karachi
          </p>
        </div>
      </div>

      <div className="absolute top-8 -right-4 [transform:translateZ(80px)] sm:-right-8">
        <div className="animate-float rounded-2xl bg-brand px-4 py-3 text-ink shadow-[0_20px_50px_-10px_rgba(197,248,42,0.6)]">
          <p className="font-display text-3xl leading-none font-bold tracking-tight">2+</p>
          <p className="mt-1 text-[10px] font-semibold tracking-wider uppercase">Years Exp.</p>
        </div>
      </div>

      <div className="absolute top-1/3 -left-4 [transform:translateZ(65px)] sm:-left-8">
        <div className="flex animate-float items-center gap-2 rounded-full border border-white/10 bg-ink py-2 pr-4 pl-2 text-[12px] font-medium text-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)] [animation-delay:-2s]">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand font-mono text-[10px] font-bold text-ink">
            {'</>'}
          </span>
          Frontend Specialist
        </div>
      </div>
    </Tilt>
  </motion.div>
)

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute top-1/3 left-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_65%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading index="01" label="About me" title="Engineer with a" accent="designer's eye." />

        <div className="mt-16 grid items-center gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <ProfileCard />
          </div>

          <div className="lg:col-span-7">
            <ScrollLitText
              text={STATEMENT}
              className="font-display text-[clamp(1.75rem,3.4vw,3.1rem)] leading-[1.12] font-medium tracking-[-0.03em] text-white"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease }}
              className="mt-8 max-w-2xl text-[15px] leading-[1.85] text-mute sm:text-base"
            >
              Ali Huzaifa is a MERN-stack focused engineer specializing in modern frontend development using React and
              Next.js. With 2 years of experience in digital product engineering, he builds responsive, scalable web
              interfaces supported by Node.js and Express.js backends and MongoDB-driven data layers.
            </motion.p>

            <div className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-3xl border border-line bg-line">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                  className="bg-ink-2 px-4 py-6 sm:px-7 sm:py-8"
                >
                  <CountUp
                    value={stat.value}
                    className="block font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-none font-semibold tracking-[-0.05em] text-white"
                  />
                  <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-mute uppercase sm:text-[11px]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {STACK.map((skill) => (
                <motion.span
                  key={skill}
                  variants={{ hidden: { opacity: 0, y: 12, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
                  transition={{ duration: 0.5, ease }}
                  className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[13px] text-white/80 transition-colors duration-300 hover:border-brand/50 hover:text-brand"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
