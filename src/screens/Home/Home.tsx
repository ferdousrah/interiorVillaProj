import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../components/ui/button";
import { ServicesSection } from "./sections/ServicesSection/ServicesSection";
import { FooterSection } from "./sections/FooterSection/FooterSection";
import { TestimonialSection } from "./sections/TestimonialSection/TestimonialSection";
import { AboutSection } from "./sections/AboutSection/AboutSection";
import { FeaturedProjectSection } from "./sections/FeaturedProjectSection/FeaturedProjectSection";
import { OurProcessSection } from "./sections/OurProcessSection/OurProcessSection";
import { motion, AnimatePresence } from "framer-motion";
import { BlogSection } from "./sections/BlogSection/BlogSection";
import { CustomCursor } from "../../components/ui/cursor";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Home = (): JSX.Element => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", active: true },
    { name: "About Us", active: false },
    { 
      name: "Services", 
      active: false,
      subItems: [
        "Residential Interior",
        "Commercial Interior",
        "Architectural Consultancy"
      ]
    },
    { name: "Portfolio", active: false },
    { name: "Blog", active: false },
    { name: "Contact Us", active: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldBeScrolled = scrollPosition > 50;
      
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Enhanced header animations
  useEffect(() => {
    if (!headerRef.current || !logoRef.current || !menuContainerRef.current) return;

    const header = headerRef.current;
    const logo = logoRef.current;
    const menuContainer = menuContainerRef.current;

    // Create timeline for smooth transitions
    const tl = gsap.timeline({ paused: true });

    // Header transformation
    tl.to(header, {
      height: "60px", // Reduced from 90px
      backgroundColor: "rgba(27, 27, 27, 0.95)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      duration: 0.6,
      ease: "power3.out"
    }, 0)
    
    // Logo scaling and positioning
    .to(logo, {
      scale: 0.8, // Slightly smaller in sticky mode
      duration: 0.6,
      ease: "power3.out"
    }, 0)
    
    // Menu container adjustments
    .to(menuContainer, {
      height: "50px", // Reduced height
      padding: "0 16px", // Adjust padding
      duration: 0.6,
      ease: "power3.out"
    }, 0);

    // Play or reverse animation based on scroll state
    if (isScrolled) {
      tl.play();
    } else {
      tl.reverse();
    }

    return () => {
      tl.kill();
    };
  }, [isScrolled]);

  useEffect(() => {
    if (!heroImageRef.current || !heroContainerRef.current) return;

    // Create parallax effect for hero image
    gsap.to(heroImageRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroContainerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    // Add subtle scale effect on scroll
    gsap.fromTo(heroImageRef.current, 
      {
        scale: 1.1,
      },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true
        }
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const submenuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        when: "beforeChildren"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex flex-col w-full items-start relative bg-white overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor className="custom-cursor" />
      
      <div ref={heroContainerRef} className="w-full relative overflow-hidden">
        <img
          ref={heroImageRef}
          className="w-full h-[800px] object-cover will-change-transform"
          alt="Hero background"
          src="/image.png"
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)'
          }}
        />

        <header 
          ref={headerRef}
          className={`${
            isScrolled 
              ? 'fixed top-0 left-0 w-full z-50' 
              : 'absolute w-full top-[22px] z-50'
          } transition-all duration-700 ease-out`}
          style={{
            height: isScrolled ? "60px" : "90px",
            backgroundColor: isScrolled ? "rgba(27, 27, 27, 0.95)" : "transparent",
            backdropFilter: isScrolled ? "blur(20px)" : "none",
            boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "none"
          }}
        >
          <div className="container mx-auto px-4 relative flex items-center justify-between h-full">
            <img
              ref={logoRef}
              className="w-52 h-[41px] object-cover z-10 transition-transform duration-700 ease-out"
              alt="Interior villa dark"
              src="/interior-villa-dark.png"
              style={{
                transform: isScrolled ? "scale(0.8)" : "scale(1)"
              }}
            />
            
            <div 
              ref={menuContainerRef}
              className={`flex items-center transition-all duration-700 ease-out ${
                !isScrolled && 'bg-white-fade rounded-[50px] backdrop-blur-[5px] px-4'
              }`}
              style={{
                height: isScrolled ? "50px" : "60px",
                padding: isScrolled ? "0 16px" : !isScrolled ? "0 16px" : "0"
              }}
            >
              <div className="flex items-center justify-end h-full">
                <button 
                  className="lg:hidden text-white transition-all duration-300 hover:scale-110"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>

                <div className={`lg:relative ${isMobileMenuOpen ? 'absolute top-full left-0 right-0 bg-[#1b1b1b] rounded-b-2xl shadow-2xl' : 'hidden lg:block'}`}>
                  <nav className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 p-4 lg:p-0">
                    {navItems.map((item, index) => (
                      <div 
                        key={index} 
                        className="relative group"
                        onMouseEnter={() => setHoveredMenu(item.name)}
                        onMouseLeave={() => setHoveredMenu(null)}
                      >
                        <Button
                          variant={item.active ? "default" : "ghost"}
                          className={`min-w-[108px] px-6 rounded-[50px] whitespace-nowrap transition-all duration-300 hover:bg-[#75bf44] hover:text-white hover:scale-105 hover:shadow-lg ${
                            item.active
                              ? "bg-[#75bf44] text-white shadow-lg"
                              : "bg-transparent text-[#c6c6c6] hover:shadow-[0_0_20px_rgba(117,191,68,0.3)]"
                          }`}
                          style={{
                            height: isScrolled ? "36px" : "38px",
                            fontSize: isScrolled ? "13px" : "14px"
                          }}
                        >
                          <span className="[font-family:'Fahkwang',Helvetica] font-medium text-center transition-all duration-300">
                            {item.name}
                          </span>
                          {item.subItems && (
                            <motion.span 
                              className="ml-1 transition-transform duration-300"
                              animate={{ rotate: hoveredMenu === item.name ? 45 : 0 }}
                            >
                              +
                            </motion.span>
                          )}
                        </Button>
                        
                        <AnimatePresence>
                          {item.subItems && hoveredMenu === item.name && (
                            <motion.div
                              variants={submenuVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              className="absolute top-full left-0 mt-2 min-w-[200px] bg-[#1b1b1b] rounded-lg shadow-2xl overflow-hidden z-50 border border-[#75bf44]/20"
                              style={{
                                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(117, 191, 68, 0.2)"
                              }}
                            >
                              <motion.div className="py-1">
                                {item.subItems.map((subItem, subIndex) => (
                                  <motion.button
                                    key={subIndex}
                                    variants={itemVariants}
                                    transition={{ delay: subIndex * 0.1 }}
                                    className="w-full px-4 py-3 text-left text-sm text-white hover:bg-[#75bf44] hover:text-white transition-all duration-300 [font-family:'Fahkwang',Helvetica] relative group overflow-hidden"
                                  >
                                    <span className="relative z-10">{subItem}</span>
                                    {/* Slide-in background effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#75bf44] to-[#68ab3c] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                                  </motion.button>
                                ))}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      <AboutSection />
      <ServicesSection />
      <OurProcessSection />
      <FeaturedProjectSection />
      <TestimonialSection />
      <BlogSection />
      <FooterSection />
      
      <style jsx>{`
        /* Enhanced smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Improved backdrop blur support */
        @supports (backdrop-filter: blur(20px)) {
          .backdrop-blur-enhanced {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
        }

        /* Custom scrollbar for better UX */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #75bf44;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #68ab3c;
        }

        /* Enhanced focus states for accessibility */
        button:focus-visible {
          outline: 2px solid #75bf44;
          outline-offset: 2px;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition-property: transform, opacity, background-color, border-color, color, box-shadow;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};