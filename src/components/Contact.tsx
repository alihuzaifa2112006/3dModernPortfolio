import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'motion/react'
import { Mail, MessageCircle, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { BackgroundRippleEffect } from './ui/background-ripple-effect'

const ease = [0.16, 1, 0.3, 1] as const

const EMAILJS_SERVICE_ID = 'service_y64uokq'
const EMAILJS_TEMPLATE_ID = 'template_eoynzgo'
const EMAILJS_PUBLIC_KEY = 'i8EvYBjUBv8cmaaV9'
const WHATSAPP_NUMBER = '923178386880'

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

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#0a0a0a] py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-[50%] w-[50%] -translate-x-1/4 rounded-full bg-[#c5f82a]/5 blur-[100px]" />
        <div className="absolute top-[10%] right-0 h-[45%] w-[45%] translate-x-1/4 rounded-full bg-[#7c5cfc]/6 blur-[90px]" />
      </div>

      <BackgroundRippleEffect rows={12} cols={22} cellSize={42} fill />

      <div className="relative z-10 mx-auto max-w-[1300px] px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-[12px] font-bold tracking-[0.25em] text-[#c5f82a] uppercase">
            Contact
          </p>
          <h2 className="text-4xl font-black uppercase sm:text-5xl md:text-6xl">
            LET&apos;S <span className="text-[#c5f82a]">CONNECT</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-[1.9] text-[#888] sm:text-[14px]">
            Have a project in mind or want to collaborate? Send me a message or
            reach out directly on WhatsApp.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-[28px] border border-[#1f1f1f] bg-[#111] p-7">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#2a2a2a] bg-[#181818] text-[#c5f82a]">
                <Mail size={24} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-black text-white">Email Me</h3>
              <p className="mt-3 text-[14px] leading-[1.9] text-[#9b9b9b]">
                Fill out the form and I&apos;ll get back to you as soon as possible.
              </p>
              <a
                href="mailto:alihuzaifa2112006@gmail.com"
                className="mt-4 inline-block text-[14px] font-medium text-[#c5f82a] transition-colors hover:text-[#d4ff4a]"
              >
                alihuzaifa2112006@gmail.com
              </a>
            </div>

            <div className="rounded-[28px] border border-[#1f1f1f] bg-[#111] p-7">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#2a2a2a] bg-[#181818] text-[#25D366]">
                <MessageCircle size={24} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-black text-white">WhatsApp</h3>
              <p className="mt-3 text-[14px] leading-[1.9] text-[#9b9b9b]">
                Prefer a quick chat? Message me directly on WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-[13px] font-semibold text-white transition-all hover:scale-105 hover:bg-[#20bd5a]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-[#1f1f1f] bg-[#111] p-7 sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-2 block text-[12px] font-semibold tracking-[0.08em] text-[#888] uppercase">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-[#2a2a2a] bg-[#181818] px-4 py-3 text-[14px] text-white outline-none transition-colors placeholder:text-[#555] focus:border-[#c5f82a]/60"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-2 block text-[12px] font-semibold tracking-[0.08em] text-[#888] uppercase">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-[#2a2a2a] bg-[#181818] px-4 py-3 text-[14px] text-white outline-none transition-colors placeholder:text-[#555] focus:border-[#c5f82a]/60"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="title" className="mb-2 block text-[12px] font-semibold tracking-[0.08em] text-[#888] uppercase">
                Subject
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="Project inquiry"
                className="w-full rounded-xl border border-[#2a2a2a] bg-[#181818] px-4 py-3 text-[14px] text-white outline-none transition-colors placeholder:text-[#555] focus:border-[#c5f82a]/60"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-[12px] font-semibold tracking-[0.08em] text-[#888] uppercase">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-xl border border-[#2a2a2a] bg-[#181818] px-4 py-3 text-[14px] text-white outline-none transition-colors placeholder:text-[#555] focus:border-[#c5f82a]/60"
              />
            </div>

            {status === 'success' && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#c5f82a]/30 bg-[#c5f82a]/10 px-4 py-3 text-[13px] text-[#c5f82a]">
                <CheckCircle2 size={18} />
                Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}

            {status === 'error' && (
              <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-400">
                Something went wrong. Please try again or message me on WhatsApp.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c5f82a] px-8 py-3.5 text-[13px] font-semibold text-black transition-all hover:bg-[#d4ff4a] hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
