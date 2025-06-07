import { ArrowRightIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../../../components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Service data for mapping
const services = [
  {
    title: "Residential interior",
    icon: "/create-an-svg-home-icon.png",
    description:
      "There are many variations of passages of lorem ipsum available",
    iconBg: "#f5fdfd",
  },
  {
    title: "Commercial Interior",
    icon: "/create-a-svg-long-stroied-building-icon.png",
    description:
      "There are many variations of passages of lorem ipsum available",
    iconBg: "#f5fdfd",
  },
  {
    title: "Architectural consultancy",
    icon: "/create-a-svg-geometry-icon.png",
    description:
      "There are many variations of passages of lorem ipsum available",
    iconBg: "#f5fdfd",
  },
];

export const ServicesSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Parallax effect for background grid
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true
        }
      });
    }

    // Header animation with parallax
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle parallax for header
      gsap.to(headerRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // Staggered card animations with individual parallax
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Initial entrance animation
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 80,
          rotationX: -15,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Individual parallax movement for each card
      gsap.to(card, {
        yPercent: -5 - (index * 3), // Different speeds for depth
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1 + (index * 0.2), // Different scrub speeds
          invalidateOnRefresh: true
        }
      });

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -12,
          scale: 1.03,
          rotationY: 2,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Store cleanup functions
      card.dataset.cleanup = 'true';
    });

    // Grid container parallax
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Remove event listeners
      cardRefs.current.forEach(card => {
        if (card && card.dataset.cleanup) {
          card.removeEventListener('mouseenter', () => {});
          card.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full py-32 bg-[#f7f9fb] relative overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="flex flex-col items-center text-center mb-16 will-change-transform"
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <h2 className="font-medium text-[40px] leading-[55px] tracking-normal [font-family:'Fahkwang',Helvetica]">
            Services We Offer
          </h2>
          <p className="font-bold text-secondary text-[25px] leading-[30px] tracking-normal [font-family:'Darker_Grotesque',Helvetica]">
            Bringing Your Dream Spaces to Life
          </p>
        </div>

        {/* Service Cards */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 will-change-transform"
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="will-change-transform"
              style={{
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)',
                transformStyle: 'preserve-3d'
              }}
            >
              <Card className="rounded-[5px] overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
                <CardContent className="p-11 pt-11">
                  <div className="flex gap-6">
                    <div
                      className="w-[82px] h-[82px] rounded-full border border-solid border-black flex items-center justify-center transition-transform duration-300 hover:scale-110"
                      style={{ backgroundColor: service.iconBg }}
                    >
                      <img
                        className="w-11 h-[37px] object-cover"
                        alt={`${service.title} icon`}
                        src={service.icon}
                      />
                    </div>
                    <div className="mt-[6px]">
                      <h3 className="[font-family:'Fahkwang',Helvetica] font-medium text-[#010212] text-xl leading-9">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="opacity-80 [font-family:'Fahkwang',Helvetica] font-normal text-[#000000] text-sm leading-8">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-0">
                  <div className="w-full h-[49px] bg-primary flex items-center justify-center transition-all duration-300 hover:bg-primary-hover group">
                    <Button
                      variant="ghost"
                      className="[font-family:'Inter',Helvetica] font-semibold text-base text-white hover:text-white transition-transform duration-300 hover:scale-105"
                    >
                      Read More
                      <ArrowRightIcon className="ml-2 w-[22px] h-[22px] transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Background with Parallax */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        {/* Vertical lines */}
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={`vline-${index}`}
            className="absolute top-6 bottom-6 w-px bg-[url(/line-7.svg)] opacity-30"
            style={{ left: `${(index + 1) * 7.8}%` }}
          />
        ))}

        {/* Horizontal lines */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`hline-${index}`}
            className="absolute left-0 right-0 h-px bg-[url(/line-14.svg)] opacity-30"
            style={{ top: `${(index + 1) * 140 + 26}px` }}
          />
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-32 right-16 w-6 h-6 bg-secondary rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};