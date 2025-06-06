import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../../../components/ui/card";

// Service data for mapping
const services = [
  {
    title: "Residential interior",
    icon: "/create-an-svg-home-icon.png",
    description:
      "There are many variations of passages of lorem ipsum available",
    iconBg: "#f5fdfd",
  },
  {
    title: "Commercial Interior",
    icon: "/create-a-svg-long-stroied-building-icon.png",
    description:
      "There are many variations of passages of lorem ipsum available",
    iconBg: "#f5fdfd",
  },
  {
    title: "Architectural consultancy",
    icon: "/create-a-svg-geometry-icon.png",
    description:
      "There are many variations of passages of lorem ipsum available",
    iconBg: "#f5fdfd",
  },
];

export const ServicesSection = (): JSX.Element => {
  return (
    <section className="w-full py-32 bg-[#f7f9fb]">
      <div className="container mx-auto max-w-7xl relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-medium text-[40px] leading-[55px] tracking-normal [font-family:'Fahkwang',Helvetica]">
            Services We Offer
          </h2>
          <p className="font-bold text-triatry text-[25px] leading-[30px] tracking-normal [font-family:'Darker_Grotesque',Helvetica]">
            Bringing Your Dream Spaces to Life
          </p>
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Vertical lines */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={`vline-${index}`}
              className="absolute top-6 bottom-6 w-px bg-[url(/line-7.svg)]"
              style={{ left: `${(index + 1) * 7.8}%` }}
            />
          ))}

          {/* Horizontal lines */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`hline-${index}`}
              className="absolute left-0 right-0 h-px bg-[url(/line-14.svg)]"
              style={{ top: `${(index + 1) * 140 + 26}px` }}
            />
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {services.map((service, index) => (
            <Card key={index} className="rounded-[5px] overflow-hidden">
              <CardContent className="p-11 pt-11">
                <div className="flex gap-6">
                  <div
                    className="w-[82px] h-[82px] rounded-full border border-solid border-black flex items-center justify-center"
                    style={{ backgroundColor: service.iconBg }}
                  >
                    <img
                      className="w-11 h-[37px] object-cover"
                      alt={`${service.title} icon`}
                      src={service.icon}
                    />
                  </div>
                  <div className="mt-[6px]">
                    <h3 className="[font-family:'Fahkwang',Helvetica] font-medium text-[#010212] text-xl leading-9">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="opacity-80 [font-family:'Fahkwang',Helvetica] font-normal text-[#000000] text-sm leading-8">
                    {service.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <div className="w-full h-[49px] bg-[url(/rectangle-285.svg)] bg-[100%_100%] flex items-center justify-center">
                  <Button
                    variant="ghost"
                    className="[font-family:'Inter',Helvetica] font-semibold text-base"
                  >
                    Read More
                    <ArrowRightIcon className="ml-2 w-[22px] h-[22px]" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
