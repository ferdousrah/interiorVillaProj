import { CopyrightIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";
import { Textarea } from "../../../../components/ui/textarea";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const FooterSection = (): JSX.Element => {
  // Refs for parallax effects
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const socialSectionRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const footerMenusRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);
  const blurElementsRef = useRef<HTMLDivElement>(null);
  const menuColumnRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Split text animation for main heading
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

      // Create a dramatic reveal animation
      gsap.fromTo(splitText.chars,
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
          rotationY: -30,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: {
            amount: 1.2,
            from: "start"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for heading
      gsap.to(headingRef.current, {
        yPercent: -15,
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

    // Left content animation and parallax
    if (leftContentRef.current) {
      gsap.fromTo(leftContentRef.current,
        {
          opacity: 0,
          x: -80,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax for left content
      gsap.to(leftContentRef.current, {
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

    // Contact form animation and parallax
    if (contactFormRef.current) {
      gsap.fromTo(contactFormRef.current,
        {
          opacity: 0,
          x: 80,
          scale: 0.9,
          rotationY: 15
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotationY: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactFormRef.current,
            start: "top 85%",
            end: "top 45%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax for contact form
      gsap.to(contactFormRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Animate form inputs individually
      const formInputs = contactFormRef.current.querySelectorAll('input, textarea, button');
      gsap.fromTo(formInputs,
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
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: contactFormRef.current,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Social section animation and parallax
    if (socialSectionRef.current) {
      gsap.fromTo(socialSectionRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: socialSectionRef.current,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax for social section
      gsap.to(socialSectionRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      });
    }

    // Social icons animation
    if (socialIconsRef.current) {
      const icons = socialIconsRef.current.querySelectorAll('div');
      
      gsap.fromTo(icons,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
          y: 30
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialIconsRef.current,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Individual parallax for each icon
      icons.forEach((icon, index) => {
        gsap.to(icon, {
          yPercent: -3 - (index * 2),
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.3 + (index * 0.1),
            invalidateOnRefresh: true
          }
        });
      });
    }

    // Footer menus animation and parallax
    if (footerMenusRef.current) {
      gsap.fromTo(footerMenusRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerMenusRef.current,
            start: "top 85%",
            end: "top 45%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax for footer menus
      gsap.to(footerMenusRef.current, {
        yPercent: -4,
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

    // Individual menu column animations
    menuColumnRefs.current.forEach((column, index) => {
      if (!column) return;

      // Staggered entrance animation
      gsap.fromTo(column,
        {
          opacity: 0,
          y: 80,
          x: (index % 2 === 0 ? -30 : 30),
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 1.5,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: column,
            start: "top 90%",
            end: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Individual parallax for each column
      gsap.to(column, {
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

      // Animate menu items within each column
      const menuItems = column.querySelectorAll('a');
      gsap.fromTo(menuItems,
        {
          opacity: 0,
          x: -20,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3 + (index * 0.1),
          scrollTrigger: {
            trigger: column,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Bottom section animation and parallax
    if (bottomSectionRef.current) {
      gsap.fromTo(bottomSectionRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomSectionRef.current,
            start: "top 90%",
            end: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax for bottom section
      gsap.to(bottomSectionRef.current, {
        yPercent: -10,
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

    // Background blur elements parallax
    if (blurElementsRef.current) {
      const blurElements = blurElementsRef.current.querySelectorAll('div');
      
      blurElements.forEach((element, index) => {
        gsap.to(element, {
          yPercent: index === 0 ? -25 : 25,
          xPercent: index === 0 ? 15 : -15,
          rotation: index === 0 ? 45 : -45,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5 + (index * 0.5),
            invalidateOnRefresh: true
          }
        });
      });
    }

    // Background decorative elements parallax
    if (backgroundElementsRef.current) {
      gsap.to(backgroundElementsRef.current, {
        yPercent: -30,
        rotation: 180,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
          invalidateOnRefresh: true
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Footer menu data for mapping
  const footerMenus = [
    {
      title: "Home",
      items: ["Footer Menu One", "Footer Menu Two", "Footer Menu Three"],
    },
    {
      title: "About Me",
      items: ["Footer Menu Four", "Footer Menu Five", "Footer Menu Six"],
    },
    {
      title: "Portfolio",
      items: ["Footer Menu Seven", "Footer Menu Eight", "Footer Menu Nine"],
    },
    {
      title: "Service",
      items: ["Footer Menu Ten", "Footer Menu Eleven", "Footer Menu Twelve"],
    },
  ];

  // Social media containers
  const socialMediaContainers = [
    "/container-2.svg",
    "/container-1.svg",
    "/container-3.svg",
    "/container.svg",
  ];

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#1b1b1b] py-20 relative overflow-hidden"
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
        <div className="absolute top-20 left-10 w-8 h-8 bg-[#75bf44] rounded-full opacity-5 animate-pulse" />
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-[#75bf44] rounded-full opacity-8 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-10 h-10 bg-[#75bf44] rounded-full opacity-4 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-[#75bf44] rounded-full opacity-6 animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Geometric shapes */}
        <div className="absolute top-40 right-10 w-16 h-16 border border-[#75bf44] opacity-3 rotate-45" />
        <div className="absolute bottom-40 left-16 w-20 h-20 border border-[#75bf44] opacity-4 rounded-full" />
        <div className="absolute top-1/2 left-10 w-12 h-12 border border-[#75bf44] opacity-3" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          <div 
            ref={leftContentRef}
            className="max-w-2xl will-change-transform"
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            <h2 
              ref={headingRef}
              className="text-[40px] leading-[56px] font-medium [font-family:'Fahkwang',Helvetica] bg-gradient-to-b from-white to-[#323232] bg-clip-text text-transparent will-change-transform"
              style={{
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)',
                transformStyle: 'preserve-3d',
                opacity: 1,
                visibility: 'visible'
              }}
            >
              Let&apos;s Work Together and <br />
              Create Something Extraordinary!
            </h2>

            <div 
              ref={socialSectionRef}
              className="mt-20 will-change-transform"
              style={{
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <div className="flex flex-col items-start gap-6">
                <div className="flex flex-col items-start gap-3 w-full">
                  <h3 className="[font-family:'Fahkwang',Helvetica] font-medium text-white text-xl tracking-[0] leading-8">
                    Follow Us
                  </h3>
                  <p className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-xs tracking-[0] leading-5 max-w-[520px]">
                    Stay connected and inspired! Follow us on our social media
                    platforms to keep up with the latest design trends, project
                    updates, and behind-the-scenes insights
                  </p>
                </div>

                <div 
                  ref={socialIconsRef}
                  className="flex items-center gap-6 will-change-transform"
                  style={{
                    transformOrigin: 'center center',
                    backfaceVisibility: 'hidden',
                    transform: 'translate3d(0, 0, 0)'
                  }}
                >
                  {socialMediaContainers.map((container, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-xl bg-cover bg-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 will-change-transform"
                      style={{ 
                        backgroundImage: `url(${container})`,
                        transformOrigin: 'center center',
                        backfaceVisibility: 'hidden'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div 
            ref={contactFormRef}
            className="will-change-transform"
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            <Card className="w-full max-w-[480px] bg-[#ffffff24] rounded-3xl backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] border-none">
              <CardContent className="flex flex-col items-center gap-[39px] p-6">
                <h3 className="relative self-stretch mt-[-1.00px] [font-family:'Fahkwang',Helvetica] font-medium text-white text-2xl text-center tracking-[0] leading-10">
                  Let&apos;s Work Together!
                </h3>

                <div className="flex flex-col items-start gap-3 w-full">
                  <Input
                    className="bg-[#9b9b9b1f] rounded-xl border-[0.5px] border-solid border-[#ebebeb] text-white [font-family:'Fahkwang',Helvetica] p-3 h-auto transition-all duration-300 hover:border-[#75bf44] focus:border-[#75bf44]"
                    placeholder="Your Name"
                  />

                  <Input
                    className="bg-[#9b9b9b1f] rounded-xl border-[0.5px] border-solid border-[#ebebeb] text-white [font-family:'Fahkwang',Helvetica] p-3 h-auto transition-all duration-300 hover:border-[#75bf44] focus:border-[#75bf44]"
                    placeholder="Your Email"
                  />

                  <Textarea
                    className="bg-[#9b9b9b1f] rounded-xl border-[0.5px] border-solid border-[#ebebeb] text-white [font-family:'Fahkwang',Helvetica] p-3 h-[211px] resize-none transition-all duration-300 hover:border-[#75bf44] focus:border-[#75bf44]"
                    placeholder="Describe Your Case"
                  />
                </div>

                <Button className="w-full bg-[#75bf44] rounded-[60px] text-black [font-family:'Fahkwang',Helvetica] font-medium text-base py-3 shadow-[inset_0px_0px_12px_4px_#00000040] hover:bg-[#68ab3c] transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div 
          ref={footerMenusRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16 will-change-transform"
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {footerMenus.map((menu, index) => (
            <div 
              key={index} 
              ref={el => menuColumnRefs.current[index] = el}
              className="flex flex-col items-start gap-6 will-change-transform"
              style={{
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <h4 className="[font-family:'Fahkwang',Helvetica] font-medium text-white text-lg tracking-[0] leading-[26px]">
                {menu.title}
              </h4>

              <div className="flex flex-col items-start gap-3 w-full">
                {menu.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href="#"
                    className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-sm tracking-[0] leading-6 hover:underline transition-all duration-300 hover:text-[#75bf44] hover:translate-x-2"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separator className="bg-white/10 mb-6" />

        <div 
          ref={bottomSectionRef}
          className="flex flex-col sm:flex-row items-center justify-between will-change-transform"
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <div className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-sm tracking-[0] leading-6">
            Privacy Policy/Terms
          </div>

          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <CopyrightIcon className="w-3.5 h-3.5 text-white" />
            <div className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-sm tracking-[0] leading-6">
              2025 Interior Villa, All right reserved
            </div>
          </div>
        </div>
      </div>

      {/* Background blur effects with parallax */}
      <div 
        ref={blurElementsRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        <div className="absolute w-[443px] h-[449px] right-0 top-20 bg-[#999999] blur-[294px] will-change-transform" />
        <div className="absolute w-[443px] h-[449px] left-0 bottom-20 bg-[#999999] blur-[322px] will-change-transform" />
      </div>
    </section>
  );
};