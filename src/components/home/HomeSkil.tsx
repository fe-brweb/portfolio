"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "../ui/Button";
import HomeTitle from "./HomeTitle";

const skils = [
  "React",
  "Vue",
  "Next",
  "Nuxt",
  "JavaScript",
  "TypeScript",
  "Framer Motion",
  "GASP",
  "TailwindCSS",
  "SASS",
  "HTML5",
  "JQuery",
  "MySQL",
  "GASP",
  "GASP",
];

const variants = cva("relative h-lvh overflow-hidden bg-primary", {
  variants: {},
  defaultVariants: {},
});

interface HomeSkilProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const HomeSkil: React.FC<HomeSkilProps> = ({ className, children }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const perspective = 1000;

  useGSAP(() => {
    if (!titleRef.current && wordsRef.current.length === 0) return;
    wordsRef.current.forEach((word) =>
      gsap.set(word.parentNode, { perspective }),
    );

    const tl = gsap.timeline();

    tl.fromTo(
      wordsRef.current,
      {
        "will-change": "opacity, transform",
        z: () => gsap.utils.random(500, 950),
        opacity: 0,
        xPercent: () => gsap.utils.random(-100, 100),
        yPercent: () => gsap.utils.random(-10, 10),
        rotationX: () => gsap.utils.random(-90, 90),
      },
      {
        ease: "expo",
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        xPercent: 0,
        yPercent: 0,
        z: 0,
        duration: 2,
        stagger: {
          each: 0.001,
          from: "random",
        },
      },
    );

    tl.to(circleRef.current, {
      clipPath: "circle(100%)",
      duration: 1,
      ease: "power2.out",
    });

    tl.to(
      textRef.current,
      {
        duration: 1,
        opacity: 1,
        ease: "power2.out",
      },
      "-=100%",
    );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      start: "center center",
      end: "+=5000",
      animation: tl,
      scrub: true,
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <section className={cn(variants({ className }))} ref={sectionRef}>
        <div className="container flex h-[inherit] items-center">
          <h2
            ref={titleRef}
            className="flex flex-wrap justify-center gap-5 text-white"
          >
            {skils.map((word, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  perspective: `${perspective}px`,
                }}
              >
                <span
                  ref={(el: HTMLSpanElement) => {
                    wordsRef.current[index] = el;
                  }}
                  className="inline-block origin-left font-bold leading-none portrait:text-[10.5vw] landscape:text-[4.5vw]"
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>
        <div className="absolute left-0 top-0 size-full">
          <div
            className="absolute left-1/2 top-1/2 z-10 size-[100%] origin-center -translate-x-1/2 -translate-y-1/2 bg-secondary [clip-path:circle(0%)]"
            ref={circleRef}
          ></div>
          <div
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center font-bold uppercase text-secondary-foreground opacity-0"
            ref={textRef}
          >
            <HomeTitle>Skills</HomeTitle>
            <div className="mt-5">
              <Button asChild variant="primary" size="lg" shape="rounded">
                <Link href="/skill">More View</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSkil;
