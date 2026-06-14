import { type FC, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.css';
import { ASSETS } from '../../utils/asset';


gsap.registerPlugin(ScrollTrigger);

export const Hero: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const brandWord = "Haven";
  const letters = brandWord.split("");

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Navbar animation
    tl.fromTo(
      `.${styles.navbar}`,
      { opacity: 0, y: -25 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    );

    // Side description reveal
    tl.fromTo(
      `.${styles.descriptionBlock}`,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.2 },
      '-=0.8'
    );

    // Oasis letters reveal
    tl.fromTo(
      `.js-reveal-char`,
      { y: '110%' },
      { y: '0%', duration: 1.4, stagger: 0.05, ease: 'power4.out' },
      '-=1.0'
    );

    // Bottom metadata labels
    tl.fromTo(
      `.${styles.metaLeft}, .${styles.metaRight}`,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
      '-=0.8'
    );

    // Image/Video reveal animation on load
    tl.fromTo(
      videoWrapperRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
      '-=1.1'
    );

    // Scroll-triggered Video scaling and pinning
    gsap.timeline({
      scrollTrigger: {
        trigger: videoContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrub delay
        invalidateOnRefresh: true,
      }
    })
      .to(videoSectionRef.current, {
        paddingLeft: 0,
        paddingRight: 0,
        ease: 'none',
      }, 0)
      .to(videoWrapperRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        aspectRatio: 'auto',
        ease: 'none',
      }, 0);

  }, { scope: containerRef });

  return (
    <>
      <section ref={containerRef} className={styles.heroSection}>
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

        <div className={styles.mainContent}>
          {/* Brand Container with side description + giant brand name */}
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
                <span key={idx} className={styles.charMask}>
                  <span className={`${styles.char} js-reveal-char`}>
                    {char}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Bottom Metadata row */}
          <div className={styles.metaRow}>
            <div className={styles.metaLeft}>EST. 1990</div>
            <div className={styles.metaRight}>MELBOURNE</div>
          </div>
        </div>
      </section>

      {/* Scroll-pinned video expansion section */}
      <div ref={videoContainerRef} className={styles.videoScrollContainer}>
        <div className={styles.stickyWrapper}>
          <div ref={videoSectionRef} className={styles.imageSection}>
            <div ref={videoWrapperRef} className={styles.imageWrapper}>
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
      </div>
    </>
  );
};

export default Hero;
