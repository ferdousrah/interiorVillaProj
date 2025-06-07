import { ArrowUpRightIcon, ZoomIn, ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from 'react-masonry-css';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface Project {
  id: number;
  category: string;
  image: string;
  title: string;
  width: string;
  height: string;
}

export const FeaturedProjectSection = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTabWidth, setActiveTabWidth] = useState(0);
  const [activeTabLeft, setActiveTabLeft] = useState(0);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Refs for parallax effects
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const masonryContainerRef = useRef<HTMLDivElement>(null);
  const viewAllButtonRef = useRef<HTMLButtonElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);

  const categories = [
    { value: "all", label: "All" },
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "consultancy", label: "Architectural Consultancy" }
  ];

  useEffect(() => {
    const activeTab = tabRefs.current[selectedCategory];
    if (activeTab) {
      setActiveTabWidth(activeTab.offsetWidth);
      setActiveTabLeft(activeTab.offsetLeft);
    }
  }, [selectedCategory]);

  // Parallax and animation effects
  useEffect(() => {
    if (!sectionRef.current) return;

    // Split text animation for heading - FIXED VERSION
    if (headingRef.current) {
      const splitText = new SplitText(headingRef.current, { 
        type: "words,chars",
        charsClass: "char",
        wordsClass: "word"
      });

      // Set initial state to be visible but slightly transformed
      gsap.set(splitText.chars, {
        opacity: 1, // Changed from 0 to 1 to ensure visibility
        y: 0, // Changed from 50 to 0
        rotationX: 0, // Changed from -45 to 0
        transformOrigin: "50% 50%"
      });

      // Create a subtle reveal animation instead of hiding the text
      gsap.fromTo(splitText.chars,
        {
          opacity: 0.3,
          y: 20,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.4,
            from: "start"
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            end: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle parallax effect for heading
      gsap.to(headingRef.current, {
        yPercent: -5, // Reduced from -10
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

    // Tabs container animation and parallax
    if (tabsContainerRef.current) {
      gsap.fromTo(tabsContainerRef.current,
        {
          opacity: 0,
          x: 30,
          scale: 0.98
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tabsContainerRef.current,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle parallax for tabs
      gsap.to(tabsContainerRef.current, {
        yPercent: -3, // Reduced from -5
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

    // Masonry container parallax
    if (masonryContainerRef.current) {
      gsap.to(masonryContainerRef.current, {
        yPercent: -2, // Reduced from -3
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.2,
          invalidateOnRefresh: true
        }
      });
    }

    // View all button animation
    if (viewAllButtonRef.current) {
      gsap.fromTo(viewAllButtonRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: viewAllButtonRef.current,
            start: "top 95%",
            end: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle parallax for button
      gsap.to(viewAllButtonRef.current, {
        yPercent: -4, // Reduced from -8
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

    // Background elements parallax
    if (backgroundElementsRef.current) {
      gsap.to(backgroundElementsRef.current, {
        yPercent: -10, // Reduced from -20
        rotation: 45, // Reduced from 90
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
    };
  }, []);

  useEffect(() => {
    // First, destroy any existing Fancybox instances
    Fancybox.destroy();
    
    // Wait for the next render cycle to ensure DOM elements are available
    requestAnimationFrame(() => {
      // Check if there are any gallery elements before binding
      const galleryElements = document.querySelectorAll("[data-fancybox='service-gallery']");
      
      if (galleryElements.length > 0) {
        // Then bind Fancybox to the current gallery elements
        Fancybox.bind("[data-fancybox='service-gallery']", {
          animated: true,
          showClass: "fancybox-fadeIn",
          hideClass: "fancybox-fadeOut",
          dragToClose: false,
          Image: {
            zoom: true,
          },
          Toolbar: {
            display: [
              "prev",
              "counter",
              "next",
              "zoom",
              "slideshow",
              "fullscreen",
              "close",
            ],
          },
        });
      }
    });

    return () => {
      Fancybox.destroy();
    };
  }, [selectedCategory]); // Add selectedCategory as a dependency

  const projects: Project[] = [
    {
      id: 1,
      category: "residential",
      image: "/a-residential-interior-image.png",
      title: "Modern Living Room",
      width: "w-full md:w-[400px]",
      height: "h-[500px]"
    },
    {
      id: 2,
      category: "commercial",
      image: "/a-office-interior-image.png",
      title: "Corporate Office",
      width: "w-full md:w-[600px]",
      height: "h-[300px]"
    },
    {
      id: 3,
      category: "consultancy",
      image: "/dining-interior.png",
      title: "Design Consultation",
      width: "w-full md:w-[350px]",
      height: "h-[400px]"
    },
    {
      id: 4,
      category: "residential",
      image: "/rectangle-8.png",
      title: "Luxury Bedroom",
      width: "w-full md:w-[450px]",
      height: "h-[350px]"
    },
    {
      id: 5,
      category: "commercial",
      image: "/rectangle-9.png",
      title: "Restaurant Interior",
      width: "w-full md:w-[500px]",
      height: "h-[450px]"
    },
    {
      id: 6,
      category: "consultancy",
      image: "/rectangle-12.png",
      title: "Space Planning",
      width: "w-full md:w-[400px]",
      height: "h-[300px]"
    }
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full py-16 md:py-28 bg-[#f7f9fb] relative overflow-hidden"
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
        <div className="absolute top-20 left-10 w-6 h-6 bg-primary rounded-full opacity-10 animate-pulse" />
        <div className="absolute top-1/3 right-20 w-4 h-4 bg-secondary rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-primary rounded-full opacity-8 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-secondary rounded-full opacity-12 animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Geometric shapes */}
        <div className="absolute top-40 right-10 w-12 h-12 border-2 border-primary opacity-5 rotate-45" />
        <div className="absolute bottom-40 left-16 w-16 h-16 border border-secondary opacity-8 rounded-full" />
      </div>

      <div className="container mx-auto px-4 max-w-[1280px] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-8 md:mb-16">
          <h2 
            ref={headingRef}
            className="[font-family:'Fahkwang',Helvetica] font-medium text-[#4E545A] text-2xl md:text-[40px] leading-tight md:leading-[53.8px] will-change-transform"
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)',
              transformStyle: 'preserve-3d',
              // Ensure the heading is always visible
              opacity: 1,
              visibility: 'visible'
            }}
          >
            Featured Projects
          </h2>

          {/* Mobile Dropdown */}
          <div className="block md:hidden w-full relative">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full bg-primary-light text-[#4E545A] rounded-[88px] flex items-center justify-between px-6 py-3"
              whileTap={{ scale: 0.98 }}
            >
              <span className="[font-family:'Fahkwang',Helvetica] font-normal">
                {categories.find(cat => cat.value === selectedCategory)?.label || "All"}
              </span>
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {categories.map((category) => (
                    <motion.button
                      key={category.value}
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left relative overflow-hidden"
                      whileHover={{ backgroundColor: "rgba(117, 191, 68, 0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="[font-family:'Fahkwang',Helvetica] font-normal text-[#4E545A] relative z-10">
                        {category.label}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Tabs */}
          <div 
            ref={tabsContainerRef}
            className="hidden md:block w-auto will-change-transform"
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            <Tabs 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
              className="w-auto"
            >
              <TabsList className="bg-primary-light h-auto p-1 gap-2 rounded-[88px] flex flex-nowrap relative">
                <motion.div
                  className="absolute bg-white rounded-[88px] transition-all duration-300"
                  layoutId="activeTab"
                  style={{
                    width: activeTabWidth,
                    height: "calc(100% - 8px)",
                    top: "4px",
                    left: activeTabLeft + 4,
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    ref={el => tabRefs.current[category.value] = el}
                    onMouseEnter={() => setHoveredTab(category.value)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className={`relative [font-family:'Fahkwang',Helvetica] font-normal text-[#4E545A] text-sm whitespace-nowrap leading-[18.8px] px-6 py-2 rounded-[88px] transition-all duration-300 hover:text-primary ${
                      selectedCategory === category.value 
                        ? 'text-primary z-10' 
                        : ''
                    }`}
                    style={{
                      transform: hoveredTab === category.value && category.value !== selectedCategory ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    <span className="relative z-10">{category.label}</span>
                    {hoveredTab === category.value && category.value !== selectedCategory && (
                      <motion.div
                        layoutId="hoverBackground"
                        className="absolute inset-0 bg-white/50 rounded-[88px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div 
          ref={masonryContainerRef}
          className="will-change-transform"
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Masonry
                breakpointCols={breakpointColumns}
                className="flex -ml-4 md:-ml-8 w-auto"
                columnClassName="pl-4 md:pl-8 bg-clip-padding"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className={`mb-4 md:mb-8 relative group overflow-hidden rounded-2xl ${project.width} ${project.height} cursor-pointer`}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <a
                      href={project.image}
                      data-fancybox="service-gallery"
                      data-caption={project.title}
                      className="block w-full h-full"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: hoveredProject === project.id ? 1 : 0,
                            scale: hoveredProject === project.id ? 1 : 0.8
                          }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center mb-2 md:mb-4">
                            <ZoomIn className="w-5 h-5 md:w-6 md:h-6 text-black" />
                          </div>
                          <h3 className="text-white text-base md:text-xl font-medium text-center mb-1 md:mb-2 px-2">
                            {project.title}
                          </h3>
                          <p className="text-white text-xs md:text-sm text-center capitalize">
                            {project.category}
                          </p>
                        </motion.div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </Masonry>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-16 md:mt-28">
          <Button 
            ref={viewAllButtonRef}
            className={`bg-[#1d1e24] text-white rounded-[80px] group relative overflow-hidden transition-all duration-700 ease-out hover:pr-12 md:hover:pr-16 will-change-transform ${
              isHovered ? 'pl-4 md:pl-6' : 'px-4 md:px-6'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            <span className="relative z-10 font-semibold text-sm tracking-[-0.28px] leading-6 transition-transform duration-700 ease-out group-hover:translate-x-[-8px]">
              View all
            </span>
            <div className={`absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-secondary rounded-full flex items-center justify-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}>
              <ArrowUpRightIcon className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </div>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .masonry-grid {
          display: flex;
          width: auto;
          margin-left: -16px;
        }
        .masonry-grid_column {
          padding-left: 16px;
          background-clip: padding-box;
        }

        @media (min-width: 768px) {
          .masonry-grid {
            margin-left: -32px;
          }
          .masonry-grid_column {
            padding-left: 32px;
          }
        }

        :global(.fancybox__container) {
          --fancybox-bg: rgba(0, 0, 0, 0.95);
        }

        :global(.fancybox__toolbar) {
          --fancybox-color: #fff;
          --fancybox-hover-color: #75bf44;
        }

        :global(.fancybox__toolbar__items) {
          --fancybox-toolbar-height: 48px;
          --fancybox-toolbar-background: rgba(0, 0, 0, 0.3);
        }

        :global(.fancybox__toolbar__items button) {
          color: var(--fancybox-color);
        }

        :global(.fancybox__toolbar__items button:hover) {
          color: var(--fancybox-hover-color);
        }

        :global(.fancybox__caption) {
          text-align: center;
          font-family: 'Fahkwang', Helvetica;
        }

        :global(.fancybox-fadeIn) {
          animation: fancybox-fadeIn 0.3s ease-out;
        }

        :global(.fancybox-fadeOut) {
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
      `}</style>
    </section>
  );
};