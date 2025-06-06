import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CustomCursorProps {
  className?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ className }) => {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const idleTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const cursorRing = cursorRingRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursorRing || !cursorDot) return;

    // Set initial position
    gsap.set([cursorRing, cursorDot], {
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      opacity: 0
    });

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) {
        setIsVisible(true);
        gsap.to([cursorRing, cursorDot], {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Reset idle state and timer
      setIsIdle(false);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }

      // Animate cursor position
      gsap.to(cursorRing, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      // Set new idle timer
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 2000); // 2 seconds of no movement
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsIdle(false);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      gsap.to([cursorRing, cursorDot], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursorRing, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 1.5,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursorRing, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [isVisible]);

  // Idle animation effect
  useEffect(() => {
    const cursorRing = cursorRingRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursorRing || !cursorDot) return;

    if (isIdle) {
      // Start idle animations - color change and gentle pulsing
      gsap.to(cursorRing, {
        backgroundColor: '#75bf44',
        borderColor: '#75bf44',
        scale: 1.2,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(cursorDot, {
        backgroundColor: '#75bf44',
        scale: 1.3,
        duration: 1,
        ease: "power2.out"
      });

      // Gentle pulsing animation
      const pulseAnimation = gsap.to([cursorRing, cursorDot], {
        scale: "+=0.1",
        opacity: 0.8,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      return () => {
        pulseAnimation.kill();
      };
    } else {
      // Reset to normal state
      gsap.to(cursorRing, {
        backgroundColor: 'transparent',
        borderColor: '#000000',
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(cursorDot, {
        backgroundColor: '#000000',
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [isIdle]);

  return (
    <>
      {/* Cursor Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-8 h-8 border-2 border-black rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform ${className}`}
        style={{
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden'
        }}
      />
      
      {/* Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden'
        }}
      />

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        /* Show default cursor on touch devices */
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
          
          .custom-cursor {
            display: none !important;
          }
        }

        /* Hide custom cursor on mobile */
        @media (max-width: 768px) {
          .custom-cursor {
            display: none !important;
          }
          
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};