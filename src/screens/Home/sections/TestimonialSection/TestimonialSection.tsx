import { ArrowLeft, ArrowRight, PlayIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import useEmblaCarousel from 'embla-carousel-react';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

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
    <section className="w-full py-12 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4" style={{ maxWidth: "1219px" }}>
        <div className="flex flex-col items-center mb-8 md:mb-16">
          <h2 className="font-medium text-2xl md:text-4xl mb-4 md:mb-8 text-center tracking-tight leading-tight font-['Fahkwang',Helvetica]">
            Testimonials
          </h2>
          <p className="max-w-lg text-center font-text-medium-normal text-base md:text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] px-4">
            We create spaces that inspire and reflect your unique lifestyle
          </p>
        </div>

        <div className="relative">
          <button
            onClick={scrollPrev}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 md:w-6 md:h-6 text-black" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-black" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="relative flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] transition-all duration-500 ease-in-out"
                  onMouseEnter={() => setHoveredCard(testimonial.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    transform: hoveredCard === testimonial.id ? 'scale(1.05)' : 'scale(1)',
                    zIndex: hoveredCard === testimonial.id ? 10 : 1
                  }}
                >
                  <Card
                    className="h-[200px] sm:h-[250px] md:h-[314px] w-full rounded-xl md:rounded-2xl overflow-hidden border-2 border-solid border-[#d1ee2e] bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  >
                    <CardContent className="flex items-center justify-center h-full p-0 relative">
                      <a
                        href={testimonial.video}
                        data-fancybox="hero-gallery"
                        className={`w-12 h-12 md:w-[70px] md:h-[70px] rounded-full md:rounded-[35px] border-2 border-solid border-white shadow-[0px_4px_15px_#00000040] flex items-center justify-center transition-all duration-300 ${
                          hoveredCard === testimonial.id 
                            ? 'bg-white scale-110 transform-gpu' 
                            : 'bg-white/10'
                        }`}
                      >
                        <PlayIcon 
                          className={`w-6 h-6 md:w-[38px] md:h-[38px] transition-colors duration-300 ${
                            hoveredCard === testimonial.id ? 'text-[#75bf44]' : 'text-white'
                          }`} 
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