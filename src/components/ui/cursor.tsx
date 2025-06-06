import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CustomCursorProps {
  className?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ className }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const idleTimeoutRef = useRef<NodeJS.Timeout>();
  const trailTimelineRef = useRef<gsap.core.Timeline>();

  useEffect(() => {
    // Check if device supports hover (not touch device)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) {
      return;
    }

    const cursor = cursorRef.current;
    const pointer = pointerRef.current;
    const trail = trailRef.current;
    const glow = glowRef.current;

    if (!cursor || !pointer || !trail || !glow) return;

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    // Set initial positions
    gsap.set([cursor, pointer, trail, glow], {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0
    });

    // Show cursor with entrance animation
    gsap.to([cursor, pointer, trail, glow], {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.1
    });

    // Create trail animation timeline
    trailTimelineRef.current = gsap.timeline({ repeat: -1 });
    trailTimelineRef.current
      .to(trail, {
        scale: 1.5,
        opacity: 0.3,
        duration: 1.5,
        ease: "power2.out"
      })
      .to(trail, {
        scale: 2,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Update moving state
      setIsMoving(true);
      
      // Clear idle timeout
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }

      // Set idle timeout
      idleTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 1500); // 1.5 seconds idle detection

      // Animate cursor elements with different speeds for natural feel
      gsap.to(cursor, {
        x,
        y,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(pointer, {
        x,
        y,
        duration: 0.4,
        ease: "power3.out"
      });

      gsap.to(trail, {
        x,
        y,
        duration: 1.2,
        ease: "power1.out"
      });

      gsap.to(glow, {
        x,
        y,
        duration: 1,
        ease: "power2.out"
      });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      
      // Click animation
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.2,
        ease: "power2.out"
      });

      gsap.to(pointer, {
        scale: 1.5,
        duration: 0.2,
        ease: "back.out(2)"
      });

      // Create click ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'fixed pointer-events-none z-[10002] rounded-full border-2 border-current';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.color = isMoving ? '#A9F577' : '#CC4922';
      cursor.appendChild(ripple);

      gsap.fromTo(ripple, 
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 3,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            ripple.remove();
          }
        }
      );
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      
      // Release animation
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });

      gsap.to(pointer, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      gsap.to([cursor, pointer, trail, glow], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      gsap.to([cursor, pointer, trail, glow], {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      
      if (trailTimelineRef.current) {
        trailTimelineRef.current.kill();
      }

      // Restore default cursor
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
    };
  }, []);

  // Update cursor colors and animations based on state
  useEffect(() => {
    const cursor = cursorRef.current;
    const pointer = pointerRef.current;
    const glow = glowRef.current;

    if (!cursor || !pointer || !glow) return;

    const activeColor = '#A9F577'; // Bright green when moving
    const idleColor = '#CC4922';   // Orange-red when idle

    if (isMoving) {
      // Active state - bright green
      gsap.to(cursor, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.to(pointer, {
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      });

      // Update colors
      cursor.style.borderColor = activeColor;
      cursor.style.backgroundColor = `${activeColor}15`;
      pointer.style.backgroundColor = activeColor;
      glow.style.boxShadow = `0 0 30px ${activeColor}80, 0 0 60px ${activeColor}40`;

    } else {
      // Idle state - orange-red with pulsing
      gsap.to(cursor, {
        scale: 1.2,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(pointer, {
        scale: 0.8,
        duration: 0.6,
        ease: "power2.out"
      });

      // Update colors
      cursor.style.borderColor = idleColor;
      cursor.style.backgroundColor = `${idleColor}15`;
      pointer.style.backgroundColor = idleColor;
      glow.style.boxShadow = `0 0 40px ${idleColor}80, 0 0 80px ${idleColor}40`;

      // Add pulsing animation for idle state
      gsap.to(cursor, {
        scale: 1.3,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      gsap.to(glow, {
        scale: 1.5,
        opacity: 0.8,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }
  }, [isMoving]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 pointer-events-none z-[10000] ${className || ''}`}>
      {/* Glow Effect */}
      <div
        ref={glowRef}
        className="fixed w-16 h-16 rounded-full pointer-events-none z-[9998] transition-all duration-500"
        style={{
          background: 'radial-gradient(circle, transparent 30%, rgba(169, 245, 119, 0.1) 70%)',
          filter: 'blur(8px)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Trail Effect */}
      <div
        ref={trailRef}
        className="fixed w-12 h-12 rounded-full pointer-events-none z-[9999] border-2 transition-all duration-300"
        style={{
          borderColor: isMoving ? '#A9F577' : '#CC4922',
          backgroundColor: 'transparent',
          opacity: 0.4
        }}
      />

      {/* Main Cursor Ring */}
      <div
        ref={cursorRef}
        className="fixed w-10 h-10 rounded-full pointer-events-none z-[10000] border-2 transition-all duration-500"
        style={{
          borderColor: isMoving ? '#A9F577' : '#CC4922',
          backgroundColor: isMoving ? '#A9F57720' : '#CC492220',
          backdropFilter: 'blur(4px)',
          mixBlendMode: 'difference'
        }}
      >
        {/* Rotating Border Animation */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-dashed animate-spin"
          style={{
            borderColor: isMoving ? '#A9F577' : '#CC4922',
            opacity: 0.6,
            animationDuration: isMoving ? '2s' : '4s'
          }}
        />

        {/* Inner Decorative Ring */}
        <div 
          className="absolute inset-1 rounded-full border border-current opacity-30"
          style={{
            color: isMoving ? '#A9F577' : '#CC4922'
          }}
        />
      </div>

      {/* Pointer Dot */}
      <div
        ref={pointerRef}
        className="fixed w-3 h-3 rounded-full pointer-events-none z-[10001] transition-all duration-300"
        style={{
          backgroundColor: isMoving ? '#A9F577' : '#CC4922',
          boxShadow: `0 0 15px ${isMoving ? '#A9F577' : '#CC4922'}80`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Pointer Shine Effect */}
        <div 
          className="absolute inset-0 rounded-full bg-white opacity-40 animate-pulse"
          style={{
            animationDuration: isMoving ? '1s' : '2s'
          }}
        />
      </div>

      {/* Click Indicator */}
      {isClicking && (
        <div
          className="fixed w-8 h-8 rounded-full pointer-events-none z-[10002] border-4 animate-ping"
          style={{
            borderColor: isMoving ? '#A9F577' : '#CC4922',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}

      {/* Directional Arrows for Movement */}
      {isMoving && (
        <>
          <div
            className="fixed w-1 h-4 pointer-events-none z-[10001] transition-all duration-200"
            style={{
              backgroundColor: '#A9F577',
              transform: 'translate(-50%, -50%) translate(-15px, 0) rotate(45deg)',
              opacity: 0.6
            }}
          />
          <div
            className="fixed w-1 h-4 pointer-events-none z-[10001] transition-all duration-200"
            style={{
              backgroundColor: '#A9F577',
              transform: 'translate(-50%, -50%) translate(15px, 0) rotate(-45deg)',
              opacity: 0.6
            }}
          />
          <div
            className="fixed w-4 h-1 pointer-events-none z-[10001] transition-all duration-200"
            style={{
              backgroundColor: '#A9F577',
              transform: 'translate(-50%, -50%) translate(0, -15px) rotate(45deg)',
              opacity: 0.6
            }}
          />
          <div
            className="fixed w-4 h-1 pointer-events-none z-[10001] transition-all duration-200"
            style={{
              backgroundColor: '#A9F577',
              transform: 'translate(-50%, -50%) translate(0, 15px) rotate(-45deg)',
              opacity: 0.6
            }}
          />
        </>
      )}

      <style jsx>{`
        * {
          cursor: none !important;
        }
        
        a, button, input, textarea, select, [role="button"], [tabindex] {
          cursor: none !important;
        }

        @media (hover: none) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </div>
  );
};