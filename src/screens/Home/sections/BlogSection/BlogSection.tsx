import { ArrowRightIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import VanillaTilt from 'vanilla-tilt';

export const BlogSection = (): JSX.Element => {
  const imageRef = useRef<HTMLImageElement>(null);

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
            <div className="relative overflow-hidden rounded-lg shadow-lg transform-gpu">
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