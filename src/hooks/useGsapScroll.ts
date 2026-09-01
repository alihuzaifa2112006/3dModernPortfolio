import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseGsapScrollOptions {
  trigger?: HTMLElement | null
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  duration?: number
  delay?: number
}

export const useGsapScroll = (callback: (gsap: typeof gsap, trigger: HTMLElement) => void, options: UseGsapScrollOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      callback(gsap, ref.current!)
    }, ref)

    return () => ctx.revert()
  }, [callback])

  return ref
}

export const useScrollRevealGsap = (ref: React.RefObject<HTMLElement>, options: UseGsapScrollOptions = {}) => {
  useEffect(() => {
    if (!ref.current) return

    const defaults = {
      start: 'top 80%',
      end: 'top 50%',
      scrub: false,
      ...options,
    }

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ref.current,
          start: defaults.start,
          end: defaults.end,
          scrub: defaults.scrub,
          markers: defaults.markers,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [ref, options])
}

export const useParallaxGsap = (ref: React.RefObject<HTMLElement>, distance: number = 50) => {
  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      y: distance,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        markers: false,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [ref, distance])
}
