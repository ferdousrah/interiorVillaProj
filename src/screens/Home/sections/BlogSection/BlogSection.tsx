import { ArrowRightIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import VanillaTilt from 'vanilla-tilt';
import gsap from "gsap";

export const BlogSection = (): JSX.Element => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      VanillaTilt.init(imageRef.current, {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.1,
        transition: true,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        perspective: 1000,
      });
    }

    // GSAP hover animations with blur and brighten effects
    if (imageRef.current && imageContainerRef.current) {
      const image = imageRef.current;
      const container = imageContainerRef.current;

      // Create a timeline for smooth hover animations
      const hoverTimeline = gsap.timeline({ paused: true });
      
      hoverTimeline
        .to(image, {
          scale: 1.08,
          filter: "blur(2px) brightness(1.3) saturate(1.2)",
          duration: 0.5,
          ease: "power2.out"
        }, 0)
        .to(container, {
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 30px rgba(117, 191, 68, 0.2)",
          duration: 0.4,
          ease: "power2.out"
        }, 0);

      // Mouse enter event
      const handleMouseEnter = () => {
        hoverTimeline.play();
        
        // Add floating animation
        gsap.to(container, {
          y: -6,
          duration: 0.4,
          ease: "power2.out"
        });

        // Add container glow effect
        gsap.to(container, {
          filter: "drop-shadow(0 0 20px rgba(117, 191, 68, 0.3))",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      // Mouse leave event
      const handleMouseLeave = () => {
        hoverTimeline.reverse();
        
        // Reset floating animation
        gsap.to(container, {
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });

        // Reset container glow effect
        gsap.to(container, {
          filter: "drop-shadow(0 0 0px rgba(117, 191, 68, 0))",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      // Mouse move parallax effect with enhanced blur interaction
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;

        // Calculate distance from center for dynamic blur
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const blurAmount = Math.min(distance * 3, 4); // Max blur of 4px

        gsap.to(image, {
          x: deltaX * 12,
          y: deltaY * 8,
          rotationY: deltaX * 8,
          rotationX: -deltaY * 6,
          filter: `blur(${2 + blurAmount}px) brightness(${1.3 + distance * 0.2}) saturate(${1.2 + distance * 0.3})`,
          duration: 0.3,
          ease: "power2.out",
          transformOrigin: "center center"
        });
      };

      // Add event listeners
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mousemove', handleMouseMove);

      // Cleanup function
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // Blog post data for mapping
  const blogPosts = [
    {
      id: 1,
      title:
        "Small Space, Big Impact: Interior Design Hacks for Compact Living",
      author: "MERKULOVE",
      date: "06.12.2024",
      readTime: "2 MIN READ",
      featured: false,
    },
    {
      id: 2,
      title: "Sustainable Chic: Eco-Friendly Interior Design Ideas You'll Love",
      author: "MERKULOVE",
      date: "06.12.2024",
      readTime: "2 MIN READ",
      featured: false,
    },
  ];

  return (
    <section className="w-full py-20 bg-[#f7f9fb]">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center justify-center mb-3">
            <div className="w-1 h-[25px] bg-[#75bf44] rounded-sm"></div>
            <div className="mx-3 [font-family:'Fahkwang',Helvetica] font-normal text-[#48515c] text-sm text-center tracking-[0.90px]">
              BLOG
            </div>
            <div className="w-1 h-[25px] bg-[#75bf44] rounded-sm"></div>
          </div>

          <h2 className="[font-family:'Fahkwang',Helvetica] font-medium text-[40px] text-center tracking-[0] leading-[62px]">
            <span className="text-[#0d1529]">Latest </span>
            <span className="text-[#000000]">Stories</span>
          </h2>
        </div>

        {/* Featured Blog Post */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          <div className="lg:w-1/2">
            <div 
              ref={imageContainerRef}
              className="relative overflow-hidden rounded-lg shadow-lg transform-gpu cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <img
                ref={imageRef}
                className="w-full h-auto object-cover rounded-lg transition-all duration-700"
                alt="Interior design blog post"
                src="/create-an-image-for-a-residential-interior-design-blog-post.svg"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="flex items-center mb-3">
              <Badge className="bg-[#75bf44] border-[6px] border-[#75bf445a] rounded-full h-10 w-10 flex items-center justify-center p-0">
                <span className="text-white text-xs"></span>
              </Badge>

              <span className="ml-4 [font-family:'Fahkwang',Helvetica] font-medium text-[#48515c] text-xs tracking-[0.77px]">
                BY MERKULOVE | 06.12.2024 | 2 MIN READ
              </span>
            </div>

            <h3 className="[font-family:'Fahkwang',Helvetica] font-medium text-[#0d1529] text-[32px] tracking-[0.93px] leading-[51px] mb-6">
              7 Classic Interior Design Styles That Never Go Out of Fashion
            </h3>

            <p className="[font-family:'Fahkwang',Helvetica] font-normal text-[#48515c] text-sm tracking-[0] leading-6 mb-8">
              Discover the charm of design styles that have stood the test of
              time. From minimalist Scandinavian to ornate Victorian, this post
              explores how you can incorporate classic elements into modern
              spaces for a look that&apos;s always in style.
            </p>

            <Button className="bg-[#75bf44] rounded-[25px] h-9 px-6 relative">
              <span className="[font-family:'Fahkwang',Helvetica] font-bold text-white text-xs tracking-[0.09px]">
                READ MORE
              </span>
              <div className="w-[26px] h-[26px] bg-white rounded-full ml-3 flex items-center justify-center">
                <ArrowRightIcon className="h-4 w-4 text-[#75bf44]" />
              </div>
            </Button>
          </div>
        </div>

        {/* Blog Post Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-[#f7f9fb] rounded-3xl border-none"
            >
              <CardContent className="p-6">
                <div className="mb-4 [font-family:'Fahkwang',Helvetica] font-normal text-[#48515c] text-xs tracking-[0.77px]">
                  BY {post.author} | {post.date} | {post.readTime}
                </div>

                <h3 className="[font-family:'Fahkwang',Helvetica] font-medium text-[#0d1529] text-[32px] tracking-[0] leading-9 mb-6">
                  {post.title}
                </h3>

                <Button className="bg-[#75bf44] rounded-[25px] h-9 px-6 relative">
                  <span className="[font-family:'Fahkwang',Helvetica] font-bold text-white text-xs tracking-[0.09px]">
                    READ MORE
                  </span>
                  <div className="w-[26px] h-[26px] bg-white rounded-full ml-3 flex items-center justify-center">
                    <ArrowRightIcon className="h-4 w-4 text-[#75bf44]" />
                  </div>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-4">
          <div className="w-[9px] h-2.5 bg-[#d7d7d7] rounded-[5px]"></div>
          <div className="w-[9px] h-2.5 bg-[#75bf44] rounded-[5px]"></div>
          <div className="w-[9px] h-2.5 bg-[#d7d7d7] rounded-[5px]"></div>
        </div>
      </div>
    </section>
  );
};