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
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

        <header className={`${isScrolled ? 'fixed top-0 left-0 w-full bg-[#1b1b1b]' : 'absolute w-full max-w-[1226px] h-[90px] top-[22px] left-1/2 -translate-x-1/2'} z-50 transition-all duration-300`}>
          <div className="container mx-auto px-4 relative">
            <img
              className="absolute left-0 top-1/2 -translate-y-1/2 w-52 h-[41px] object-cover z-10"
              alt="Interior villa dark"
              src="/interior-villa-dark.png"
            />
            
            <div className={`ml-64 ${!isScrolled && 'bg-white-fade rounded-[50px] backdrop-blur-[5px]'}`}>
              <div className="flex items-center justify-end h-[60px]">
                <button 
                  className="lg:hidden text-white"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>

                <div className={`lg:relative ${isMobileMenuOpen ? 'absolute top-full left-0 right-0 bg-[#1b1b1b]' : 'hidden lg:block'}`}>
                  <nav className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
                    {navItems.map((item, index) => (
                      <div 
                        key={index} 
                        className="relative group"
                        onMouseEnter={() => setHoveredMenu(item.name)}
                        onMouseLeave={() => setHoveredMenu(null)}
                      >
                        <Button
                          variant={item.active ? "default" : "ghost"}
                          className={`min-w-[108px] px-6 h-[38px] rounded-[50px] whitespace-nowrap transition-colors duration-200 hover:bg-[#75bf44] hover:text-white ${
                            item.active
                              ? "bg-[#75bf44] text-white"
                              : "bg-transparent text-[#c6c6c6]"
                          }`}
                        >
                          <span className="[font-family:'Fahkwang',Helvetica] font-medium text-sm text-center">
                            {item.name}
                          </span>
                          {item.subItems && (
                            <span className="ml-1">+</span>
                          )}
                        </Button>
                        
                        <AnimatePresence>
                          {item.subItems && hoveredMenu === item.name && (
                            <motion.div
                              variants={submenuVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              className="absolute top-full left-0 mt-2 min-w-[200px] bg-[#1b1b1b] rounded-lg shadow-lg overflow-hidden z-50"
                            >
                              <motion.div className="py-1">
                                {item.subItems.map((subItem, subIndex) => (
                                  <motion.button
                                    key={subIndex}
                                    variants={itemVariants}
                                    transition={{ delay: subIndex * 0.1 }}
                                    className="w-full px-4 py-3 text-left text-sm text-white hover:bg-[#75bf44] hover:text-white transition-colors duration-200 [font-family:'Fahkwang',Helvetica]"
                                  >
                                    {subItem}
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
      
    </div>
  );
};