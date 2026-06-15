import { type FC, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.css';
import { ASSETS } from '../../utils/asset';

gsap.registerPlugin(ScrollTrigger);

export const Hero: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const brandWord = "Haven";
  const letters = brandWord.split("");

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // 1. Entrance Animations on Load
    tl.fromTo(
      `.${styles.navbar}`,
      { opacity: 0, y: -25 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    );

    tl.fromTo(
      `.${styles.descriptionBlock}`,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.2 },
      '-=0.8'
    );

    tl.fromTo(
      `.js-reveal-char`,
      { y: '110%' },
      { y: '0%', duration: 1.4, stagger: 0.05, ease: 'power4.out' },
      '-=1.0'
    );

    tl.fromTo(
      `.${styles.metaLeft}, .${styles.metaRight}`,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
      '-=0.8'
    );

    // Initial load animation of the video card resting at the bottom
    tl.fromTo(
      videoWrapperRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
      '-=1.1'
    );

    // 2. Scroll-pinned Video Expansion ("Eating" the page)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, 
        invalidateOnRefresh: true,
      }
    });

    // Video expands from the bottom bar to fill the entire viewport
    scrollTl.to(videoWrapperRef.current, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      ease: 'none',
    }, 0);

    // Push the entire text content UP and out of the viewport
    scrollTl.to(`.${styles.mainContent}`, {
      yPercent: -100,
      ease: 'none',
    }, 0);

    // Fade out description and metadata early in the scroll
    scrollTl.to(`.${styles.descriptionBlock}`, {
      opacity: 0,
      ease: 'none',
    }, 0);

    scrollTl.to(`.${styles.metaRow}`, {
      opacity: 0,
      ease: 'none',
    }, 0);

    // Spread the letters horizontally as the text scrolls up
    scrollTl.to('.js-char-mask-0', { xPercent: -150, ease: 'none' }, 0);
    scrollTl.to('.js-char-mask-1', { xPercent: -75, ease: 'none' }, 0);
    scrollTl.to('.js-char-mask-3', { xPercent: 75, ease: 'none' }, 0);
    scrollTl.to('.js-char-mask-4', { xPercent: 150, ease: 'none' }, 0);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.stickyWrapper}>
        
        {/* Navigation Bar */}
        <header className={styles.navbar}>
          <div className={styles.logoContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" className={styles.logo}>
              <rect y="0" width="12" height="12" fill="currentColor" />
              <rect x="24" width="12" height="12" fill="currentColor" />
              <path d="M24 12 H11.65 V24.35Z" fill="currentColor" />
              <path d="M0 24H12V12Z" fill="currentColor" />
              <path d="M24 24H36V12Z" fill="currentColor" />
              <rect y="23.65" width="12.35" height="12.35" fill="currentColor" />
              <rect x="24" y="23.65" width="12" height="12.35" fill="currentColor" />
            </svg>
          </div>
          <div className={styles.menuContainer}>
            <button className={styles.menuBtn}>
              <span className={styles.menuText}>Menu</span>
              <div className={styles.hamburger}>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
              </div>
            </button>
          </div>
          <div className={styles.ctaContainer}>
            <button className={styles.ctaBtn}>Let's Talk</button>
          </div>
        </header>

        {/* Text Content (Layered underneath the expanding video) */}
        <div className={styles.mainContent}>
          <div className={styles.brandContainer}>
            <div className={styles.descriptionBlock}>
              <span className={styles.blueSquare}></span>
              <p className={styles.descText}>
                A Haven home is more than bricks and mortar.<br />
                It’s crafted, personal and shaped around you.
              </p>
            </div>

            <h1 className={styles.brandTitle} aria-label={brandWord}>
              {letters.map((char, idx) => (
                <span key={idx} className={`${styles.charMask} js-char-mask-${idx}`}>
                  <span className={`${styles.char} js-reveal-char`}>
                    {char}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <div className={styles.metaRow}>
            <div className={styles.metaLeft}>EST. 1990</div>
            <div className={styles.metaRight}>MELBOURNE</div>
          </div>
        </div>

        {/* The Video Card Layer (Sits on top, centralized at the bottom) */}
        <div ref={videoWrapperRef} className={styles.videoWrapper}>
          <video
            src={ASSETS.heroVideo}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={styles.heroImg}
            width="1440"
            height="800"
          />
        </div>

      </div>
    </div>
  );
};

export default Hero;