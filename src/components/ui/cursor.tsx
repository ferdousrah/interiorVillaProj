import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CustomCursorProps {
  className?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ className }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const moveTimeoutRef = useRef<NodeJS.Timeout>();
  const idleTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position off-screen
    gsap.set(cursor, {
      x: -100,
      y: -100,
      scale: 0
    });

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update cursor position with smooth tracking
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: "power2.out"
      });

      // Show cursor on first move
      if (cursor.style.opacity === '0' || cursor.style.opacity === '') {
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }

      // Set moving state
      setIsMoving(true);
      setIsIdle(false);

      // Clear existing timeouts
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }

      // Set timeout for when movement stops
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
        
        // Set idle timeout
        idleTimeoutRef.current = setTimeout(() => {
          setIsIdle(true);
        }, 500);
      }, 100);
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.in"
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  // Don't render on touch devices
  const hasHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
  if (!hasHover) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference ${className || ''}`}
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: isIdle ? '#CC4922' : '#A9F577',
        transform: 'translate(-50%, -50%)',
        transition: 'background-color 0.3s ease',
        opacity: 0,
        willChange: 'transform, opacity, background-color'
      }}
    >
      {/* Inner dot for pointer precision */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: 'white',
          opacity: 0.8
        }}
      />
      
      {/* Outer ring for visual appeal */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white/30"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          animation: isMoving ? 'pulse 1s infinite' : 'none'
        }}
      />

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};