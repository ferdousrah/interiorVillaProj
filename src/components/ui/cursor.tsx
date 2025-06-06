import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CustomCursorProps {
  className?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ className }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const [isIdle, setIsIdle] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const idleTimeoutRef = useRef<NodeJS.Timeout>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) {
      return () => window.removeEventListener('resize', checkMobile);
    }

    const cursor = cursorRef.current;
    const pointer = pointerRef.current;
    
    if (!cursor || !pointer) return;

    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Set initial position
    gsap.set([cursor, pointer], {
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      opacity: 1
    });

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Clear idle timeout
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }

      // Set cursor to active state immediately
      if (isIdle) {
        setIsIdle(false);
      }

      // Animate cursor and pointer to follow mouse
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.to(pointer, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power3.out"
      });

      // Set idle timeout
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 2000);
    };

    const handleMouseDown = () => {
      setIsActive(true);
    };

    const handleMouseUp = () => {
      setIsActive(false);
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, pointer], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, pointer], {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', checkMobile);
      
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [isIdle, isMobile]);

  // Animate cursor state changes
  useEffect(() => {
    const cursor = cursorRef.current;
    const pointer = pointerRef.current;
    
    if (!cursor || !pointer || isMobile) return;

    if (isIdle) {
      // Idle state: Orange-red color with pulsing animation
      gsap.to(cursor, {
        scale: 1.3,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(pointer, {
        scale: 1.2,
        duration: 0.8,
        ease: "power2.out"
      });

      // Start pulsing animation
      gsap.to([cursor, pointer], {
        scale: "+=0.1",
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

    } else {
      // Active state: Bright green color, stop pulsing
      gsap.killTweensOf([cursor, pointer]);
      
      gsap.to(cursor, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(pointer, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [isIdle, isMobile]);

  // Animate click state
  useEffect(() => {
    const cursor = cursorRef.current;
    const pointer = pointerRef.current;
    
    if (!cursor || !pointer || isMobile) return;

    if (isActive) {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(pointer, {
        scale: 1.5,
        duration: 0.1,
        ease: "power2.out"
      });
    } else {
      gsap.to(cursor, {
        scale: isIdle ? 1.3 : 1,
        duration: 0.2,
        ease: "power2.out"
      });

      gsap.to(pointer, {
        scale: isIdle ? 1.2 : 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  }, [isActive, isIdle, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Main Bubble Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference ${className || ''}`}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid',
          borderColor: isIdle ? '#CC4922' : '#A9F577',
          backgroundColor: isIdle ? 'rgba(204, 73, 34, 0.2)' : 'rgba(169, 245, 119, 0.2)',
          backdropFilter: 'blur(8px)',
          boxShadow: isIdle 
            ? '0 0 20px rgba(204, 73, 34, 0.4), inset 0 0 20px rgba(204, 73, 34, 0.1)' 
            : '0 0 20px rgba(169, 245, 119, 0.4), inset 0 0 20px rgba(169, 245, 119, 0.1)',
          transition: 'border-color 0.8s ease, background-color 0.8s ease, box-shadow 0.8s ease',
          willChange: 'transform, opacity'
        }}
      />

      {/* Pointer Dot */}
      <div
        ref={pointerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isIdle ? '#CC4922' : '#A9F577',
          boxShadow: isIdle 
            ? '0 0 15px rgba(204, 73, 34, 0.8)' 
            : '0 0 15px rgba(169, 245, 119, 0.8)',
          transition: 'background-color 0.8s ease, box-shadow 0.8s ease',
          willChange: 'transform, opacity'
        }}
      />

      {/* Global cursor styles */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        a, button, input, textarea, select, [role="button"], [tabindex] {
          cursor: none !important;
        }

        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
          
          a, button, input, textarea, select, [role="button"], [tabindex] {
            cursor: pointer !important;
          }
        }

        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
          
          a, button, input, textarea, select, [role="button"], [tabindex] {
            cursor: pointer !important;
          }
        }
      `}</style>
    </>
  );
};