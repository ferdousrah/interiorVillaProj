import { CopyrightIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";
import { Textarea } from "../../../../components/ui/textarea";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FooterSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const socialSectionRef = useRef<HTMLDivElement>(null);
  const footerMenusRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Left content animation (excluding h2)
    if (leftContentRef.current) {
      const children = leftContentRef.current.children;
      // Skip the h2 (first child) and animate the rest
      const elementsToAnimate = Array.from(children).slice(1);
      
      gsap.fromTo(elementsToAnimate,
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
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: "top 85%",
            end: "top 55%",
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

    // Contact form animation
    if (contactFormRef.current) {
      gsap.fromTo(contactFormRef.current,
        {
          opacity: 0,
          x: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactFormRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax for contact form
      gsap.to(contactFormRef.current, {
        yPercent: -5,
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

    // Social section animation
    if (socialSectionRef.current) {
      const socialIcons = socialSectionRef.current.querySelectorAll('[style*="background-image"]');
      
      gsap.fromTo(socialIcons,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialSectionRef.current,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Footer menus animation
    if (footerMenusRef.current) {
      const menuColumns = footerMenusRef.current.children;
      
      gsap.fromTo(menuColumns,
        {
          opacity: 0,
          y: 80,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerMenusRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax for footer menus
      gsap.to(footerMenusRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
          invalidateOnRefresh: true
        }
      });
    }

    // Bottom section animation
    if (bottomSectionRef.current) {
      gsap.fromTo(bottomSectionRef.current,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomSectionRef.current,
            start: "top 90%",
            end: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Background elements parallax
    if (backgroundElementsRef.current) {
      gsap.to(backgroundElementsRef.current, {
        yPercent: -15,
        rotation: 45,
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
        <div className="absolute top-20 left-10 w-8 h-8 bg-primary rounded-full opacity-8 animate-pulse" />
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-secondary rounded-full opacity-12 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-10 h-10 bg-primary rounded-full opacity-6 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-secondary rounded-full opacity-10 animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Geometric shapes */}
        <div className="absolute top-40 right-10 w-16 h-16 border-2 border-primary opacity-5 rotate-45" />
        <div className="absolute bottom-40 left-16 w-20 h-20 border border-secondary opacity-8 rounded-full" />
        <div className="absolute top-1/2 left-10 w-12 h-12 border-2 border-primary opacity-6" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
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
            {/* H2 heading - NO ANIMATION */}
            <h2 className="text-[40px] leading-[56px] font-medium [font-family:'Fahkwang',Helvetica] bg-gradient-to-b from-white to-[#323232] bg-clip-text text-transparent">
              Let&apos;s Work Together and <br />
              Create Something Extraordinary!
            </h2>

            <div 
              ref={socialSectionRef}
              className="mt-20"
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

                <div className="flex items-center gap-6">
                  {socialMediaContainers.map((container, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-xl bg-cover bg-center cursor-pointer relative overflow-hidden group transform-gpu transition-all duration-500 ease-out hover:scale-125 hover:-translate-y-2"
                      style={{ backgroundImage: `url(${container})` }}
                    >
                      {/* Glow effect on hover - Updated to primary color */}
                      <div className="absolute inset-0 rounded-xl bg-primary opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm scale-110"></div>
                      
                      {/* Ripple effect - Updated to primary color */}
                      <div className="absolute inset-0 rounded-xl border-2 border-primary opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 ease-out"></div>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                      
                      {/* Rotation on hover */}
                      <div 
                        className="w-full h-full rounded-xl bg-cover bg-center transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110"
                        style={{ backgroundImage: `url(${container})` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Card 
            ref={contactFormRef}
            className="w-full max-w-[480px] bg-[#ffffff24] rounded-3xl backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] border-none will-change-transform"
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            <CardContent className="flex flex-col items-center gap-[39px] p-6">
              <h3 className="relative self-stretch mt-[-1.00px] [font-family:'Fahkwang',Helvetica] font-medium text-white text-2xl text-center tracking-[0] leading-10">
                Let&apos;s Work Together!
              </h3>

              <div className="flex flex-col items-start gap-3 w-full">
                <Input
                  className="bg-[#9b9b9b1f] rounded-xl border-[0.5px] border-solid border-[#ebebeb] text-white [font-family:'Fahkwang',Helvetica] p-3 h-auto transition-all duration-300 focus:scale-105 focus:border-primary"
                  placeholder="Your Name"
                />

                <Input
                  className="bg-[#9b9b9b1f] rounded-xl border-[0.5px] border-solid border-[#ebebeb] text-white [font-family:'Fahkwang',Helvetica] p-3 h-auto transition-all duration-300 focus:scale-105 focus:border-primary"
                  placeholder="Your Email"
                />

                <Textarea
                  className="bg-[#9b9b9b1f] rounded-xl border-[0.5px] border-solid border-[#ebebeb] text-white [font-family:'Fahkwang',Helvetica] p-3 h-[211px] resize-none transition-all duration-300 focus:scale-105 focus:border-primary"
                  placeholder="Describe Your Case"
                />
              </div>

              <Button className="w-full bg-primary rounded-[60px] text-black [font-family:'Fahkwang',Helvetica] font-medium text-base py-3 shadow-[inset_0px_0px_12px_4px_#00000040] hover:bg-primary-hover transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Send Message
              </Button>
            </CardContent>
          </Card>
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
            <div key={index} className="flex flex-col items-start gap-6">
              <h4 className="[font-family:'Fahkwang',Helvetica] font-medium text-white text-lg tracking-[0] leading-[26px]">
                {menu.title}
              </h4>

              <div className="flex flex-col items-start gap-3 w-full">
                {menu.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href="#"
                    className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-sm tracking-[0] leading-6 transition-all duration-300 hover:text-primary hover:translate-x-2 relative group overflow-hidden"
                  >
                    <span className="relative z-10">{item}</span>
                    {/* Draw underline animation */}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
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
          <div className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-sm tracking-[0] leading-6 transition-colors duration-300 hover:text-primary relative group overflow-hidden cursor-pointer">
            <span className="relative z-10">Privacy Policy/Terms</span>
            {/* Draw underline animation for bottom link too */}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
          </div>

          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <CopyrightIcon className="w-3.5 h-3.5 text-white" />
            <div className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-sm tracking-[0] leading-6">
              2025 Interior Villa, All right reserved
            </div>
          </div>
        </div>
      </div>

      {/* Background blur effects */}
      <div className="absolute w-[443px] h-[449px] right-0 top-20 bg-[#999999] blur-[294px] pointer-events-none" />
      <div className="absolute w-[443px] h-[449px] left-0 bottom-20 bg-[#999999] blur-[322px] pointer-events-none" />
    </section>
  );
};