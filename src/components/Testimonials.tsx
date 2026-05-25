import React from 'react'
import profileImg from '../assets/profile-new.png'
import { ScrollReveal, StaggerReveal, StaggerItem } from './ui/scroll-reveal'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Tricons Studios',
    role: 'Restaurant Management System',
    review:
      'Ali Huzaifa worked as a Lead Frontend Developer on our restaurant management system. His React skills, responsive UI work, and clean component architecture helped us deliver the project smoothly and professionally.',
  },
  {
    name: 'Aykays Agency',
    role: 'AI Powered Productivity App',
    review:
      'Ali contributed as a Full Stack Developer in building an AI-powered daily productivity application. He handled frontend experiences, backend APIs, and delivered scalable features with excellent communication.',
  },
  {
    name: 'NovaTech Solutions',
    role: 'Business Dashboard Platform',
    review:
      'Working with Ali was a great experience. He developed modern dashboards, optimized frontend performance, and created beautiful responsive interfaces that improved our overall user experience.',
  },
]

const Testimonials: React.FC = () => {
  return (
    <section
      id="Testimonials"
      className="relative overflow-hidden bg-white px-4 pt-12 pb-20 text-black sm:px-6 md:px-12 lg:px-16"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#c5f82a]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1300px]">
        {/* Heading */}
        <ScrollReveal variant="up" className="mb-14 text-center">
          <p className="mb-3 text-[12px] font-semibold tracking-[0.2em] text-[#888] uppercase">
            Client Testimonials
          </p>

          <h2 className="text-3xl font-black sm:text-4xl md:text-5xl">
            What My <span className="text-[#7c5cfc]">Clients Say</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-[1.9] text-[#666] sm:text-base">
            I build modern scalable web applications with clean UI/UX,
            performance optimization, and production-ready architecture for
            startups, agencies, and businesses.
          </p>
        </ScrollReveal>

        {/* Main Layout */}
        <div className="grid items-start gap-10 lg:grid-cols-[320px_1fr] xl:gap-16">
          {/* Left Profile */}
          <ScrollReveal variant="right">
            <div className="sticky top-10">
              <div className="relative mx-auto w-fit">
                {/* Animated Border */}
                <div
                  className="absolute rounded-[22px]"
                  style={{
                    inset: '-3px',
                    zIndex: 0,
                    overflow: 'hidden',
                    padding: '3px',
                  }}
                >
                  <div
                    className="animate-spin-border absolute"
                    style={{
                      inset: '-100%',
                      background:
                        'conic-gradient(#c5f82a 0deg, #7c5cfc 120deg, transparent 220deg, #c5f82a 360deg)',
                    }}
                  />

                  <div className="absolute inset-[3px] rounded-[18px] bg-white" />
                </div>

                {/* Glow */}
                <div
                  className="animate-pulse-glow absolute inset-[-10px] rounded-[24px]"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(197,248,42,0.25), transparent 70%)',
                    filter: 'blur(10px)',
                  }}
                />

                {/* Image */}
                <div className="relative z-10 h-80 w-72 overflow-hidden rounded-[20px] sm:h-[420px] sm:w-80">
                  <img
                    src={profileImg}
                    alt="Ali Huzaifa"
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                {/* Experience Badge */}
                <div className="absolute -right-4 -bottom-4 z-20 rounded-2xl bg-[#c5f82a] px-5 py-3 shadow-xl">
                  <span className="text-2xl font-black">2+</span>
                  <span className="block text-xs font-semibold">
                    Years Experience
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Testimonials */}
          <div>
            <StaggerReveal
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              stagger={0.12}
            >
              {testimonials.map((item, index) => (
                <StaggerItem key={index} variant="up">
                  <div className="group relative overflow-hidden rounded-[26px] border border-[#ececec] bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#c5f82a] hover:shadow-2xl hover:shadow-[#c5f82a]/10">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c5f82a]/0 via-[#c5f82a]/0 to-[#7c5cfc]/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-[#c5f82a]/5 group-hover:to-[#7c5cfc]/10" />

                    {/* Quote Icon */}
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c5f82a]/15">
                      <Quote className="h-6 w-6 text-[#7c5cfc]" />
                    </div>

                    {/* Review */}
                    <p className="relative z-10 text-[14px] leading-[1.9] text-[#666]">
                      {item.review}
                    </p>

                    {/* Divider */}
                    <div className="my-6 h-px w-full bg-[#eee]" />

                    {/* Footer */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7c5cfc] to-[#c5f82a] text-sm font-black text-white">
                        {item.name.charAt(0)}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-black">
                          {item.name}
                        </h4>

                        <p className="text-xs text-[#888]">{item.role}</p>
                      </div>
                    </div>

                    {/* Floating Blur */}
                    <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#c5f82a]/10 blur-2xl transition-all duration-500 group-hover:bg-[#7c5cfc]/10" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>

            {/* Bottom Stats */}
            <ScrollReveal variant="up" delay={0.2}>
              <div className="mt-14 flex flex-wrap gap-8 border-t border-[#eee] pt-8">
                {[
                  { num: '8+', label: 'Completed Projects' },
                  { num: '5+', label: 'Happy Clients' },
                  { num: '2+', label: 'Years Experience' },
                ].map((item) => (
                  <div key={item.label}>
                    <h3 className="text-3xl font-black text-[#7c5cfc]">
                      {item.num}
                    </h3>
                    <p className="mt-1 text-sm text-[#777]">{item.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials