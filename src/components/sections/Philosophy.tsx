import { type FC, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Philosophy.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Philosophy: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Scroll-bound text reveal/highlighting
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0.15,
        y: 30,
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'center 40%',
          scrub: true,
        },
        opacity: 1,
        y: 0,
        ease: 'power2.out',
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.philosophySection}>
      <div className={styles.container}>
        <div className={styles.label}>OUR PHILOSOPHY</div>
        <h2 ref={textRef} className={styles.quoteText}>
          We believe luxury is in the details, precision in the craftsmanship, 
          and home in the bespoke architecture created just for you.
        </h2>
        <div className={styles.divider} />
        <p className={styles.description}>
          Over three generations, we have cultivated a legacy of architectural excellence 
          collaborating with Melbourne's top minds to build homes that are personal, 
          crafted, and timeless.
        </p>
      </div>
    </section>
  );
};

export default Philosophy;
