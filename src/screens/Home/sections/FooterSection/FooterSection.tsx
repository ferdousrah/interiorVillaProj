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
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const splitText = new SplitText(headingRef.current, { type: "words,chars" });
    
    gsap.from(splitText.chars, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 50,
      rotateX: -90,
      stagger: 0.02,
      duration: 1,
      ease: "back.out(1.7)"
    });

    return () => {
      splitText.revert();
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
    <section className="w-full bg-[#1b1b1b] py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          <div className="max-w-2xl">
           <h2 className="text-[40px] leading-[56px] font-medium [font-family:'Fahkwang',Helvetica] bg-gradient-to-b from-white to-[#323232] bg-clip-text text-transparent">
              Let&apos;s Work Together and <br />
              Create Something Extraordinary!
            </h2>

            

            <div className="mt-20">
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
                      className="w-10 h-10 rounded-xl bg-cover bg-center cursor-pointer"
                      style={{ backgroundImage: `url(${container})` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Card className="w-full max-w-[480px] bg-[#ffffff24] rounded-3xl backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] border-none">
            <CardContent className="flex flex-col items-center gap-[39px] p-6">
              <h3 className="relative self-stretch mt-[-1.00px] [font-family:'Fahkwang',Helvetica] font-medium text-white text-2xl text-center tracking-[0] leading-10">
                Let&apos;s Work Together!
              </h3>

              <div className="flex flex-col items-start gap-3 w-full">
                <Input
                  className="bg-[#9b9b9b1f] rounded-xl border-[0.5px] border-solid border-[#ebebeb] text-white [font-family:'Fahkwang',Helvetica] p-3 h-auto"
                  placeholder="Your Name"
                />

                <Input
                  className="bg-[#9b9b9b1f] rounded-xl border-[0.5px] border-solid border-[#ebebeb] text-white [font-family:'Fahkwang',Helvetica] p-3 h-auto"
                  placeholder="Your Email"
                />

                <Textarea
                  className="bg-[#9b9b9b1f] rounded-xl border-[0.5px] border-solid border-[#ebebeb] text-white [font-family:'Fahkwang',Helvetica] p-3 h-[211px] resize-none"
                  placeholder="Describe Your Case"
                />
              </div>

              <Button className="w-full bg-[#75bf44] rounded-[60px] text-black [font-family:'Fahkwang',Helvetica] font-medium text-base py-3 shadow-[inset_0px_0px_12px_4px_#00000040] hover:bg-[#68ab3c]">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
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
                    className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-sm tracking-[0] leading-6 hover:underline"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separator className="bg-white/10 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between">
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

      {/* Background blur effects */}
      <div className="absolute w-[443px] h-[449px] right-0 top-20 bg-[#999999] blur-[294px] pointer-events-none" />
      <div className="absolute w-[443px] h-[449px] left-0 bottom-20 bg-[#999999] blur-[322px] pointer-events-none" />
    </section>
  );
};