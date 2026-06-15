import React, { useRef, useEffect, useState } from 'react';
import styles from './scrollbar.module.css';

interface ScrollbarProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Scrollbar: React.FC<ScrollbarProps> = ({ children, className = '', style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(1);
  const dragStartOffset = useRef(0);

  const updateScrollbar = () => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const { clientHeight, scrollHeight, scrollTop } = container;
    const trackHeight = track.clientHeight;

    // If content fits inside container, hide the scrollbar
    if (scrollHeight <= clientHeight) {
      setThumbHeight(0);
      return;
    }

    const ratio = clientHeight / scrollHeight;
    const calculatedThumbHeight = Math.max(ratio * trackHeight, 36); // min 36px for usability
    setThumbHeight(calculatedThumbHeight);
    
    // The scrolling distance ratio between container scroll and thumb movement
    const maxThumbTop = trackHeight - calculatedThumbHeight;
    setScrollRatio((scrollHeight - clientHeight) / maxThumbTop);

    // Calculate thumb top position
    const percentScrolled = scrollTop / (scrollHeight - clientHeight);
    setThumbTop(percentScrolled * maxThumbTop);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollbar();

    // Recalculate on window/container resize
    const resizeObserver = new ResizeObserver(() => {
      updateScrollbar();
    });
    resizeObserver.observe(container);

    // Recalculate on DOM mutation (content changes)
    const mutationObserver = new MutationObserver(() => {
      updateScrollbar();
    });
    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const handleScroll = () => {
    updateScrollbar();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartOffset.current = e.clientY - thumbTop;
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const trackHeight = track.clientHeight;
      const maxThumbTop = trackHeight - thumbHeight;
      let newThumbTop = e.clientY - dragStartOffset.current;
      
      // Clamp the thumb within the track boundary
      newThumbTop = Math.max(0, Math.min(newThumbTop, maxThumbTop));
      setThumbTop(newThumbTop);

      // Sync the scroll container position
      container.scrollTop = newThumbTop * scrollRatio;
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.userSelect = '';
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, thumbHeight, scrollRatio]);

  return (
    <div className={`${styles.viewport} ${className}`} style={style}>
      <div 
        ref={containerRef} 
        className={styles.scrollContainer} 
        onScroll={handleScroll}
      >
        {children}
      </div>
      <div 
        ref={trackRef} 
        className={`${styles.track} ${isDragging ? styles.trackActive : ''}`}
      >
        <div
          ref={thumbRef}
          className={`${styles.thumb} ${isDragging ? styles.thumbActive : ''}`}
          style={{
            height: `${thumbHeight}px`,
            transform: `translateY(${thumbTop}px)`,
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default Scrollbar;
