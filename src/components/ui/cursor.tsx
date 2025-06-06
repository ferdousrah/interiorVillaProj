import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CursorProps {
  className?: string;
}

export const CustomCursor: React.FC<CursorProps> = ({ className = '' }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'active' | 'text'>('default');

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Mouse down handler
    const handleMouseDown = () => {
      setIsActive(true);
      setCursorType('active');
    };

    // Mouse up handler
    const handleMouseUp = () => {
      setIsActive(false);
      setCursorType(isHovering ? 'hover' : 'default');
    };

    // Hover handlers for interactive elements
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      
      // Check for special cursor types
      if (target.dataset.cursorText) {
        setCursorText(target.dataset.cursorText);
        setCursorType('text');
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setCursorType('hover');
      } else {
        setCursorType('hover');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
      setCursorType(isActive ? 'active' : 'default');
    };

    // Animation loop
    const animateCursor = () => {
      // Smooth following for main cursor
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      // Faster following for dot
      dotX += (mouseX - dotX) * 0.8;
      dotY += (mouseY - dotY) * 0.8;

      gsap.set(cursor, {
        x: cursorX - 20,
        y: cursorY - 20,
      });

      gsap.set(cursorDot, {
        x: dotX - 3,
        y: dotY - 3,
      });

      requestAnimationFrame(animateCursor);
    };

    // Start animation loop
    animateCursor();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isHovering, isActive]);

  // Cursor state animations
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    switch (cursorType) {
      case 'default':
        gsap.to(cursor, {
          scale: 1,
          opacity: 0.6,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(cursorDot, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        break;
        
      case 'hover':
        gsap.to(cursor, {
          scale: 1.5,
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(cursorDot, {
          scale: 0.5,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        break;
        
      case 'active':
        gsap.to(cursor, {
          scale: 0.8,
          opacity: 0.8,
          duration: 0.1,
          ease: "power2.out"
        });
        gsap.to(cursorDot, {
          scale: 1.5,
          opacity: 1,
          duration: 0.1,
          ease: "power2.out"
        });
        break;
        
      case 'text':
        gsap.to(cursor, {
          scale: 2,
          opacity: 0.2,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(cursorDot, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        break;
    }
  }, [cursorType]);

  // Idle animation
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let idleTimer: NodeJS.Timeout;
    let idleAnimation: gsap.core.Tween;

    const startIdleAnimation = () => {
      idleAnimation = gsap.to(cursor, {
        scale: 1.2,
        opacity: 0.4,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    };

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      if (idleAnimation) {
        idleAnimation.kill();
      }
      
      idleTimer = setTimeout(() => {
        if (cursorType === 'default') {
          startIdleAnimation();
        }
      }, 3000); // Start idle animation after 3 seconds of no movement
    };

    const handleMouseMove = () => {
      resetIdleTimer();
    };

    document.addEventListener('mousemove', handleMouseMove);
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      if (idleAnimation) {
        idleAnimation.kill();
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorType]);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference ${className}`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-full h-full border-2 border-white rounded-full relative">
          {/* Cursor text */}
          {cursorText && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-medium whitespace-nowrap">
              {cursorText}
            </div>
          )}
          
          {/* Animated border */}
          <div className="absolute inset-0 border-2 border-[#75bf44] rounded-full opacity-0 animate-ping"></div>
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        /* Show default cursor on mobile devices */
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
          
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};