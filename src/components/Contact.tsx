import React, { Suspense, lazy, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight, CheckCircle2, Copy, Check, Loader2, Mail, MessageCircle, Send } from 'lucide-react'
import { SectionHeading } from './ui/section-heading'
import { Magnetic } from './ui/magnetic'
import { SceneBoundary, canUseWebGL } from './three/SceneBoundary'
import { SOCIALS } from '../data/site'
import { cn } from '../lib/utils'

const GlobeScene = lazy(() => import('./three/GlobeScene'))

const ease = [0.16, 1, 0.3, 1] as const

const EMAILJS_SERVICE_ID = 'service_y64uokq'
const EMAILJS_TEMPLATE_ID = 'template_eoynzgo'
const EMAILJS_PUBLIC_KEY = 'i8EvYBjUBv8cmaaV9'

type FormData = {
  name: string
  email: string
  title: string
  message: string
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const initialForm: FormData = {
  name: '',
  email: '',
  title: '',
  message: '',
}

const fieldClass =
  'peer w-full rounded-2xl border border-line bg-white/[0.03] px-5 pt-7 pb-3 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-transparent hover:border-line-strong focus:border-brand/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(197,248,42,0.08)]'

const labelClass =
  'pointer-events-none absolute top-2.5 left-5 font-mono text-[10px] tracking-[0.18em] text-mute uppercase transition-all duration-300 peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:text-[13px] peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:font-sans peer-focus:top-2.5 peer-focus:font-mono peer-focus:text-[10px] peer-focus:tracking-[0.18em] peer-focus:uppercase peer-focus:text-brand'

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [copied, setCopied] = useState(false)
  const [webgl] = useState(canUseWebGL)
  const globeRef = useRef<HTMLDivElement>(null)
  const globeInView = useInView(globeRef, { margin: '200px 0px' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          title: form.title,
          message: form.message,
          time: new Date().toLocaleString(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SOCIALS.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${SOCIALS.email}`
    }
  }

  const whatsappUrl = `https://wa.me/${SOCIALS.whatsapp}`

  return (
    <section id="contact" className="relative overflow-hidden py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[40rem] w-[90rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(197,248,42,0.1),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading index="07" label="Contact" title="Let's build something" accent="remarkable." />

        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12">
          {/* Globe panel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease }}
            className="relative flex min-h-[560px] flex-col overflow-hidden rounded-[30px] border border-line bg-ink-2 lg:col-span-5"
          >
            <div ref={globeRef} aria-hidden className="absolute inset-x-0 top-0 h-[78%]">
              {webgl && (
                <SceneBoundary>
                  <Suspense fallback={null}>
                    <GlobeScene active={globeInView} />
                  </Suspense>
                </SceneBoundary>
              )}
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-2 via-ink-2/90 to-transparent" />

            <div className="relative flex items-center justify-between p-6 sm:p-8">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white/80 uppercase">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Open to opportunities
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-mute uppercase">Karachi · GMT+5</span>
            </div>

            <div className="relative mt-auto space-y-3 p-6 sm:p-8">
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-ink/70 p-2 pl-4 backdrop-blur">
                <Mail size={18} className="shrink-0 text-brand" />
                <a href={`mailto:${SOCIALS.email}`} className="min-w-0 flex-1 truncate text-[14px] text-white hover:text-brand">
                  {SOCIALS.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {copied ? <Check size={16} className="text-brand" /> : <Copy size={16} />}
                </button>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-2 pl-4 transition-colors hover:bg-[#25D366]/20"
              >
                <MessageCircle size={18} className="shrink-0 text-[#25D366]" />
                <span className="flex-1 text-[14px] text-white">Prefer a quick chat? WhatsApp me</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#25D366] text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={17} />
                </span>
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass relative flex flex-col rounded-[30px] p-6 sm:p-10 lg:col-span-7"
          >
            <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              Have a project in mind?
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-mute sm:text-[15px]">
              Send me a message — I&apos;ll get back to you as soon as possible.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={fieldClass}
                />
                <label htmlFor="name" className={labelClass}>
                  Your name
                </label>
              </div>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className={fieldClass}
                />
                <label htmlFor="email" className={labelClass}>
                  Your email
                </label>
              </div>
            </div>

            <div className="relative mt-4">
              <input
                id="title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="Subject"
                className={fieldClass}
              />
              <label htmlFor="title" className={labelClass}>
                Subject
              </label>
            </div>

            <div className="relative mt-4 flex-1">
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project"
                className={cn(fieldClass, 'h-full min-h-[180px] resize-none')}
                data-lenis-prevent
              />
              <label htmlFor="message" className={labelClass}>
                Tell me about your project
              </label>
            </div>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="mt-5 flex items-center gap-2 rounded-2xl border border-brand/30 bg-brand/10 px-4 py-3 text-[13px] text-brand"
              >
                <CheckCircle2 size={18} />
                Message sent successfully! I&apos;ll get back to you soon.
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-300"
              >
                Something went wrong. Please try again or message me on WhatsApp.
              </motion.div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[10px] tracking-[0.18em] text-dim uppercase">All fields required</p>
              <Magnetic>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex h-14 items-center gap-3 rounded-full bg-brand pr-2 pl-7 text-[15px] font-semibold text-ink shadow-[0_0_40px_-10px_rgba(197,248,42,0.6)] transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-brand transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    {status === 'sending' ? <Loader2 size={17} className="animate-spin" /> : <Send size={16} />}
                  </span>
                </button>
              </Magnetic>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
