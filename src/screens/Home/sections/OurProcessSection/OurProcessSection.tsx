import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  iconSrc?: string;
  iconBg?: string;
}

export const OurProcessSection = (): JSX.Element => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (!timelineRef.current || !progressLineRef.current) return;

    const timeline = timelineRef.current;
    const steps = timeline.querySelectorAll(".timeline-step");
    const progressLine = progressLineRef.current;
    const icons = timeline.querySelectorAll(".step-icon");
    const contents = timeline.querySelectorAll(".step-content");

    // Reset initial states
    gsap.set(steps, { opacity: 0 });
    gsap.set(icons, { scale: 0.5, opacity: 0 });
    gsap.set(contents, { opacity: 0, x: (i) => (i % 2 === 0 ? 30 : -30) });
    gsap.set(progressLine, { height: 0 });

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: timeline,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 0.5,
        toggleActions: "play none none reverse"
      },
    });

    // Animate progress line
    masterTimeline.to(progressLine, {
      height: "100%",
      duration: 1,
      ease: "none",
    }, 0);

    // Animate steps with minimal delay
    steps.forEach((step, index) => {
      const stepIcon = icons[index];
      const stepContent = contents[index];
      const delay = index * 0.15; // Reduced delay between steps

      masterTimeline.to(step, {
        opacity: 1,
        duration: 0.3,
      }, delay);

      masterTimeline.to(stepIcon, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.5)",
      }, delay);

      masterTimeline.to(stepContent, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power1.out",
      }, delay);
    });

  }, [inView]);

  const timelineSteps: TimelineStep[] = [
    {
      id: 1,
      title: "Chat & Talk",
      description:
        "This is the first step where we discuss your project goals, requirements, and expectations. We'll explore your vision, target audience, and desired outcomes to ensure a clear understanding of what you need.",
      iconSrc: "/create-a-svg-icon-of-chat-between-two-users.svg",
    },
    {
      id: 2,
      title: "Design Development",
      description:
        "This is the first step where we discuss your project goals, requirements, and expectations. We'll explore your vision, target audience, and desired outcomes to ensure a clear understanding of what you need.",
      iconSrc: "/design--tools-pen-tool.png",
    },
    {
      id: 3,
      title: "Confirm Your Order",
      description:
        "This is the first step where we discuss your project goals, requirements, and expectations. We'll explore your vision, target audience, and desired outcomes to ensure a clear understanding of what you need.",
      iconSrc: "/create-a-svg-tic-mark-icon.png",
    },
    {
      id: 4,
      title: "Deployment Process",
      description:
        "This is the first step where we discuss your project goals, requirements, and expectations. We'll explore your vision, target audience, and desired outcomes to ensure a clear understanding of what you need.",
      iconSrc: "/create-a-svg-icon-for-interior-deployment-process--transparent-a.png",
    },
    {
      id: 5,
      title: "You'll Be Happy",
      description:
        "This is the first step where we discuss your project goals, requirements, and expectations. We'll explore your vision, target audience, and desired outcomes to ensure a clear understanding of what you need.",
      iconSrc: "/create-an-line-icon-of-happy-customer.png",
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-32">
      <h2 className="text-center [font-family:'Fahkwang',Helvetica] font-medium text-[#000000] text-2xl md:text-[40px] leading-tight md:leading-10 mb-12 md:mb-24 px-4">
        How We Deliver Results
      </h2>

      <div className="relative max-w-5xl mx-auto px-4" ref={ref}>
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-2 md:transform md:-translate-x-1/2 bg-abu-bg rounded-[32px] overflow-hidden">
          <div
            ref={progressLineRef}
            className="w-full bg-[#75bf44] rounded-[32px] origin-top transition-all duration-500"
            style={{ height: "0%" }}
          />
        </div>

        <div className="relative" ref={timelineRef}>
          {timelineSteps.map((step) => (
            <div
              key={step.id}
              className="timeline-step flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center mb-16 md:mb-32 pl-8 md:pl-0"
            >
              {/* Mobile Layout */}
              <div className="flex items-start md:hidden mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-lg md:text-2xl">{step.id}</span>
                </div>
                <h3 className="[font-family:'Fahkwang',Helvetica] font-medium text-[#000000] text-lg md:text-xl">
                  {step.title}
                </h3>
              </div>

              {/* Desktop Layout - Left Side */}
              <div className="hidden md:flex flex-1 items-center justify-end">
                {step.id % 2 === 1 && (
                  <div className="step-icon w-20 h-20 md:w-32 md:h-32 mr-8">
                    <div className="w-full h-full rounded-full bg-[#E9FFDA] flex items-center justify-center p-6">
                      <img
                        src={step.iconSrc}
                        alt={`Step ${step.id} icon`}
                        className="w-full h-full object-contain"
                        loading="eager"
                        decoding="sync"
                      />
                    </div>
                  </div>
                )}
                {step.id % 2 === 0 && (
                  <div className="step-content flex flex-col items-end text-right mr-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center  mr-4">
                        <span className="text-white text-2xl">{step.id}</span>
                      </div>
                      <h3 className="[font-family:'Fahkwang',Helvetica] font-medium text-[#000000] text-xl">
                        {step.title}
                      </h3>
                      
                    </div>
                    <p className="[font-family:'Fahkwang',Helvetica] font-normal text-[#000000] text-sm max-w-md">
                      {step.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Desktop Layout - Center Spacer */}
              <div className="hidden md:block w-16" />

              {/* Desktop Layout - Right Side */}
              <div className="hidden md:flex flex-1 items-center">
                {step.id % 2 === 1 ? (
                  <div className="step-content flex flex-col items-start ml-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                        <span className="text-white text-2xl">{step.id}</span>
                      </div>
                      <h3 className="[font-family:'Fahkwang',Helvetica] font-medium text-[#000000] text-xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="[font-family:'Fahkwang',Helvetica] font-normal text-[#000000] text-sm max-w-md">
                      {step.description}
                    </p>
                  </div>
                ) : (
                  <div className="step-icon w-20 h-20 md:w-32 md:h-32 ml-8">
                    <div className="w-full h-full rounded-full bg-[#E9FFDA] flex items-center justify-center p-6">
                      <img
                        src={step.iconSrc}
                        alt={`Step ${step.id} icon`}
                        className="w-full h-full object-contain"
                        loading="eager"
                        decoding="sync"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Layout - Content */}
              <div className="md:hidden">
                <div className="step-icon w-20 h-20 mb-4">
                  <div className="w-full h-full rounded-full bg-[#E9FFDA] flex items-center justify-center p-4">
                    <img
                      src={step.iconSrc}
                      alt={`Step ${step.id} icon`}
                      className="w-full h-full object-contain"
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                </div>
                <p className="[font-family:'Fahkwang',Helvetica] font-normal text-[#000000] text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  );
};