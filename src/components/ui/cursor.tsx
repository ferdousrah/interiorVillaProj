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
  const arrowsRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  
  const [isMoving, setIsMoving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const idleTimeoutRef = useRef<NodeJS.Timeout>();
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef(0);

  useEffect(() => {
    // Check if device supports hover (not touch device)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const cursor = cursorRef.current;
    const pointer = pointerRef.current;
    const trail = trailRef.current;
    const glow = glowRef.current;
    const arrows = arrowsRef.current;
    const ripple = rippleRef.current;

    if (!cursor || !pointer || !trail || !glow || !arrows || !ripple) return;

    // Set initial positions off-screen
    gsap.set([cursor, pointer, trail, glow, arrows, ripple], {
      x: -100,
      y: -100,
      scale: 0
    });

    // Optimized mouse move handler with throttling
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      // Throttle to 60fps max
      if (now - lastMoveTimeRef.current < 16) return;
      lastMoveTimeRef.current = now;

      const { clientX: x, clientY: y } = e;
      mousePositionRef.current = { x, y };

      if (!isVisible) {
        setIsVisible(true);
        // Fast entrance animation
        gsap.to([cursor, pointer, trail, glow], {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
          stagger: 0.02
        });
      }

      // Ultra-fast cursor tracking with different speeds for layered effect
      gsap.to(pointer, {
        x: x,
        y: y,
        duration: 0.05, // Fastest - immediate response
        ease: "none"
      });

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.1, // Very fast
        ease: "power1.out"
      });

      gsap.to(trail, {
        x: x,
        y: y,
        duration: 0.15, // Slightly slower for trail effect
        ease: "power1.out"
      });

      gsap.to(glow, {
        x: x,
        y: y,
        duration: 0.2, // Slowest for smooth glow
        ease: "power1.out"
      });

      gsap.to(arrows, {
        x: x,
        y: y,
        duration: 0.08,
        ease: "power1.out"
      });

      // Set moving state
      if (!isMoving) {
        setIsMoving(true);
        // Quick transition to active state
        gsap.to([cursor, pointer, trail, glow, arrows], {
          borderColor: '#A9F577',
          backgroundColor: '#A9F577',
          duration: 0.2,
          ease: "power2.out"
        });
        
        // Show arrows
        gsap.to(arrows, {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "back.out(1.7)"
        });
      }

      // Clear and reset idle timeout
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }

      idleTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
        // Quick transition to idle state
        gsap.to([cursor, pointer, trail, glow, arrows], {
          borderColor: '#CC4922',
          backgroundColor: '#CC4922',
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Hide arrows
        gsap.to(arrows, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.out"
        });
      }, 800); // Reduced from 1500ms to 800ms for faster response
    };

    // Fast click handler
    const handleMouseDown = () => {
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

      // Quick ripple effect
      gsap.set(ripple, {
        x: mousePositionRef.current.x,
        y: mousePositionRef.current.y,
        scale: 0,
        opacity: 0.8
      });
      
      gsap.to(ripple, {
        scale: 3,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      gsap.to([cursor, pointer], {
        scale: 1,
        duration: 0.15,
        ease: "back.out(1.7)"
      });
    };

    // Fast mouse leave handler
    const handleMouseLeave = () => {
      setIsVisible(false);
      gsap.to([cursor, pointer, trail, glow, arrows, ripple], {
        scale: 0,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [isMoving, isVisible]);

  // Check if device supports hover
  const hasHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
  if (!hasHover) return null;

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        a, button, input, textarea, select, [role="button"], [tabindex] {
          cursor: none !important;
        }
      `}</style>

      {/* Glow Layer - Largest, softest */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[9998] mix-blend-difference"
        style={{
          width: '48px',
          height: '48px',
          marginLeft: '-24px',
          marginTop: '-24px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${isMoving ? '#A9F577' : '#CC4922'}40 0%, transparent 70%)`,
          filter: 'blur(8px)',
          willChange: 'transform, background'
        }}
      />

      {/* Trail Layer - Following ring */}
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: '36px',
          height: '36px',
          marginLeft: '-18px',
          marginTop: '-18px',
          borderRadius: '50%',
          border: `2px solid ${isMoving ? '#A9F577' : '#CC4922'}`,
          background: `${isMoving ? '#A9F577' : '#CC4922'}20`,
          backdropFilter: 'blur(2px)',
          willChange: 'transform, border-color, background'
        }}
      />

      {/* Main Cursor Ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[10000] mix-blend-difference"
        style={{
          width: '28px',
          height: '28px',
          marginLeft: '-14px',
          marginTop: '-14px',
          borderRadius: '50%',
          border: `2px dashed ${isMoving ? '#A9F577' : '#CC4922'}`,
          background: 'transparent',
          animation: isMoving ? 'spin 1.5s linear infinite' : 'spin 3s linear infinite',
          willChange: 'transform, border-color'
        }}
      />

      {/* Pointer Dot - Fastest tracking */}
      <div
        ref={pointerRef}
        className="fixed pointer-events-none z-[10001] mix-blend-difference"
        style={{
          width: '8px',
          height: '8px',
          marginLeft: '-4px',
          marginTop: '-4px',
          borderRadius: '50%',
          background: `${isMoving ? '#A9F577' : '#CC4922'}`,
          boxShadow: `0 0 10px ${isMoving ? '#A9F577' : '#CC4922'}80`,
          willChange: 'transform, background, box-shadow'
        }}
      />

      {/* Directional Arrows - Only visible when moving */}
      <div
        ref={arrowsRef}
        className="fixed pointer-events-none z-[10002] mix-blend-difference"
        style={{
          width: '40px',
          height: '40px',
          marginLeft: '-20px',
          marginTop: '-20px',
          opacity: 0,
          scale: 0.8,
          willChange: 'transform, opacity'
        }}
      >
        {/* Top Arrow */}
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderBottom: `6px solid ${isMoving ? '#A9F577' : '#CC4922'}`,
          }}
        />
        
        {/* Right Arrow */}
        <div
          style={{
            position: 'absolute',
            right: '2px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '0',
            height: '0',
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: `6px solid ${isMoving ? '#A9F577' : '#CC4922'}`,
          }}
        />
        
        {/* Bottom Arrow */}
        <div
          style={{
            position: 'absolute',
            bottom: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: `6px solid ${isMoving ? '#A9F577' : '#CC4922'}`,
          }}
        />
        
        {/* Left Arrow */}
        <div
          style={{
            position: 'absolute',
            left: '2px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '0',
            height: '0',
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderRight: `6px solid ${isMoving ? '#A9F577' : '#CC4922'}`,
          }}
        />
      </div>

      {/* Click Ripple Effect */}
      <div
        ref={rippleRef}
        className="fixed pointer-events-none z-[10002] mix-blend-difference"
        style={{
          width: '20px',
          height: '20px',
          marginLeft: '-10px',
          marginTop: '-10px',
          borderRadius: '50%',
          border: `2px solid ${isMoving ? '#A9F577' : '#CC4922'}`,
          background: 'transparent',
          opacity: 0,
          willChange: 'transform, opacity'
        }}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};