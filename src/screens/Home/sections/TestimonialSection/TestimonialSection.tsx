import { ArrowLeft, ArrowRight, PlayIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import useEmblaCarousel from 'embla-carousel-react';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const TestimonialSection = (): JSX.Element => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(max-width: 767px)': { slidesToScroll: 1 }
    }
  });

  // Refs for parallax effects
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let fancyboxInstance: any;
    
    requestAnimationFrame(() => {
      const galleryElements = document.querySelectorAll("[data-fancybox='hero-gallery']");
      if (galleryElements.length > 0) {
        fancyboxInstance = Fancybox.bind("[data-fancybox='hero-gallery']", {
          animated: true,
          showClass: "fancybox-fadeIn",
          hideClass: "fancybox-fadeOut",
          dragToClose: false,
          template: {
            closeButton: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
          },
          on: {
            reveal: (fancybox, slide) => {
              if (slide.$content) {
                const video = slide.$content.querySelector('video');
                if (video) {
                  video.play();
                }
              }
            },
            closing: (fancybox, slide) => {
              if (slide.$content) {
                const video = slide.$content.querySelector('video');
                if (video) {
                  video.pause();
                }
              }
            }
          }
        });
      }
    });

    return () => {
      if (fancyboxInstance) {
        fancyboxInstance.destroy();
      }
    };
  }, []);

  // Parallax and animation effects
  useEffect(() => {
    if (!sectionRef.current) return;

    // Split text animation for heading
    if (headingRef.current) {
      const splitText = new SplitText(headingRef.current, { 
        type: "words,chars",
        charsClass: "char",
        wordsClass: "word"
      });

      // Set initial state to be visible
      gsap.set(splitText.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        transformOrigin: "50% 50%"
      });

      // Create a subtle reveal animation
      gsap.fromTo(splitText.chars,
        {
          opacity: 0.2,
          y: 30,
          scale: 0.9,
          rotationY: -15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          stagger: {
            amount: 0.6,
            from: "start"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for heading
      gsap.to(headingRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });
    }

    // Description animation and parallax
    if (descriptionRef.current) {
      gsap.fromTo(descriptionRef.current,
        {
          opacity: 0,
          y: 40,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle parallax for description
      gsap.to(descriptionRef.current, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });
    }

    // Carousel container animation and parallax
    if (carouselContainerRef.current) {
      gsap.fromTo(carouselContainerRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselContainerRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for carousel
      gsap.to(carouselContainerRef.current, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.3,
          invalidateOnRefresh: true
        }
      });
    }

    // Navigation buttons animation
    if (navigationRef.current) {
      const navButtons = navigationRef.current.querySelectorAll('button');
      
      gsap.fromTo(navButtons,
        {
          opacity: 0,
          scale: 0.8,
          x: (i) => i === 0 ? -30 : 30
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: carouselContainerRef.current,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax for navigation
      gsap.to(navButtons, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.4,
          invalidateOnRefresh: true
        }
      });
    }

    // Background elements parallax
    if (backgroundElementsRef.current) {
      gsap.to(backgroundElementsRef.current, {
        yPercent: -15,
        rotation: 90,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });
    }

    // Individual card hover animations with 3D effects
    const cards = carouselContainerRef.current?.querySelectorAll('[data-card]');
    cards?.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      
      // Staggered entrance animation
      gsap.fromTo(cardElement,
        {
          opacity: 0,
          y: 80,
          rotationX: -20,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardElement,
            start: "top 90%",
            end: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Individual parallax for each card
      gsap.to(cardElement, {
        yPercent: -2 - (index * 1.5),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.2 + (index * 0.1),
          invalidateOnRefresh: true
        }
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      image: "/create-an-image-that-a-couple-represent-their-home-interior.png",
      alt: "Couple home interior",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      id: 2,
      image: "/create-an-image-a-corporate-officer-represent-his-office-interio.png",
      alt: "Corporate office interior",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
      id: 3,
      image: "/create-an-image-where-a-beautiful-girl-shows-her-bedroom-interio.png",
      alt: "Bedroom interior",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      id: 4,
      image: "/create-an-image-that-a-couple-represent-their-home-interior.png",
      alt: "Modern living room",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
      id: 5,
      image: "/create-an-image-a-corporate-officer-represent-his-office-interio.png",
      alt: "Kitchen design",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
      id: 6,
      image: "/create-an-image-where-a-beautiful-girl-shows-her-bedroom-interio.png",
      alt: "Bathroom interior",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    }
  ];

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section 
      ref={sectionRef}
      className="w-full py-12 md:py-24 relative overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Background decorative elements */}
      <div 
        ref={backgroundElementsRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        <div className="absolute top-20 left-10 w-8 h-8 bg-primary rounded-full opacity-8 animate-pulse" />
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-secondary rounded-full opacity-12 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-10 h-10 bg-primary rounded-full opacity-6 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-secondary rounded-full opacity-10 animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Geometric shapes */}
        <div className="absolute top-40 right-10 w-16 h-16 border-2 border-primary opacity-5 rotate-45" />
        <div className="absolute bottom-40 left-16 w-20 h-20 border border-secondary opacity-8 rounded-full" />
        <div className="absolute top-1/2 left-10 w-12 h-12 border-2 border-primary opacity-6" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" style={{ maxWidth: "1219px" }}>
        <div className="flex flex-col items-center mb-8 md:mb-16">
          <h2 
            ref={headingRef}
            className="font-medium text-2xl md:text-4xl mb-4 md:mb-8 text-center tracking-tight leading-tight font-['Fahkwang',Helvetica] will-change-transform"
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)',
              transformStyle: 'preserve-3d',
              opacity: 1,
              visibility: 'visible'
            }}
          >
            Testimonials
          </h2>
          <p 
            ref={descriptionRef}
            className="max-w-lg text-center font-text-medium-normal text-base md:text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] px-4 will-change-transform"
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            We create spaces that inspire and reflect your unique lifestyle
          </p>
        </div>

        <div 
          ref={carouselContainerRef}
          className="relative will-change-transform"
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <div ref={navigationRef}>
            <button
              onClick={scrollPrev}
              className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 hover:scale-110 will-change-transform"
              style={{
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden'
              }}
            >
              <ArrowLeft className="w-4 h-4 md:w-6 md:h-6 text-black" />
            </button>
            
            <button
              onClick={scrollNext}
              className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 hover:scale-110 will-change-transform"
              style={{
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden'
              }}
            >
              <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-black" />
            </button>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  data-card
                  className="relative flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] transition-all duration-500 ease-in-out will-change-transform"
                  onMouseEnter={() => setHoveredCard(testimonial.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    transform: hoveredCard === testimonial.id ? 'scale(1.05) translateY(-8px)' : 'scale(1) translateY(0)',
                    zIndex: hoveredCard === testimonial.id ? 10 : 1,
                    transformOrigin: 'center center',
                    backfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Card
                    className="h-[200px] sm:h-[250px] md:h-[314px] w-full rounded-xl md:rounded-2xl overflow-hidden border-2 border-solid border-primary bg-cover bg-center relative cursor-pointer"
                    style={{ 
                      backgroundImage: `url(${testimonial.image})`,
                      boxShadow: hoveredCard === testimonial.id 
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(117, 191, 68, 0.3)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <CardContent className="flex items-center justify-center h-full p-0 relative">
                      {/* Overlay gradient on hover */}
                      <div 
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                          background: hoveredCard === testimonial.id 
                            ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(117, 191, 68, 0.2) 100%)'
                            : 'transparent',
                          opacity: hoveredCard === testimonial.id ? 1 : 0
                        }}
                      />
                      
                      <a
                        href={testimonial.video}
                        data-fancybox="hero-gallery"
                        className={`w-12 h-12 md:w-[70px] md:h-[70px] rounded-full md:rounded-[35px] border-2 border-solid border-white shadow-[0px_4px_15px_#00000040] flex items-center justify-center transition-all duration-300 relative z-10 ${
                          hoveredCard === testimonial.id 
                            ? 'bg-white scale-110 transform-gpu' 
                            : 'bg-white/10'
                        }`}
                        style={{
                          transform: hoveredCard === testimonial.id 
                            ? 'scale(1.2) rotateY(10deg)' 
                            : 'scale(1) rotateY(0deg)',
                          boxShadow: hoveredCard === testimonial.id 
                            ? '0 15px 35px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.5)'
                            : '0px 4px 15px rgba(0, 0, 0, 0.25)'
                        }}
                      >
                        <PlayIcon 
                          className={`w-6 h-6 md:w-[38px] md:h-[38px] transition-all duration-300 ${
                            hoveredCard === testimonial.id ? 'text-primary' : 'text-white'
                          }`}
                          style={{
                            transform: hoveredCard === testimonial.id ? 'translateX(2px)' : 'translateX(0)'
                          }}
                        />
                      </a>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .fancybox__container {
          --fancybox-bg: rgba(0, 0, 0, 0.95);
        }

        .fancybox__content {
          padding: 0;
          background: transparent;
          border-radius: 8px;
          overflow: hidden;
        }

        .fancybox__content video {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .fancybox__toolbar {
          background: transparent;
        }

        .fancybox__toolbar button {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          padding: 8px;
          margin: 8px;
          transition: all 0.3s ease;
        }

        .fancybox__toolbar button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .fancybox-fadeIn {
          animation: fancybox-fadeIn 0.3s ease-out;
        }

        .fancybox-fadeOut {
          animation: fancybox-fadeOut 0.3s ease-out;
        }

        @keyframes fancybox-fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fancybox-fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        @media (max-width: 768px) {
          .fancybox__toolbar button {
            width: 32px;
            height: 32px;
            padding: 6px;
            margin: 6px;
          }
        }
      `}</style>
    </section>
  );
};