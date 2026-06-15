import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


export const useLenis = () => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Update ScrollTrigger on Lenis scroll events
    lenis.on('scroll', ScrollTrigger.update)

    // Bind Lenis requestAnimationFrame to GSAP ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
      gsap.ticker.remove(tick)
    }
  }, [])
}
