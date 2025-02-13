"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "../ui/Button";
import HomeTitle from "./HomeTitle";

const wordWrap = `안녕하세요 개발자 김보라입니다
HTML, CSS, JavaScript를 비롯하여 Vue, React와 같은 웹 기술들을 다룰 수 있으며,
제가 가진 기술과 열정으로 더 나은 사용자 경험을 제공하는
웹 애플리케이션을 만들기 위해 최선을 다하겠습니다`;

const variants = cva(
  "relative overflow-hidden bg-primary pb-[calc(400lvh+300px)]",
  {
    variants: {},
    defaultVariants: {},
  },
);

interface HomeAboutProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const HomeAbout: React.FC<HomeAboutProps> = ({ className }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const wordWrapRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    if (!wordRefs.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=500%",
      pin: true,
      pinSpacing: false,
      invalidateOnRefresh: true,
      refreshPriority: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "center center",
        end: "+=400%",
        scrub: 0.05,
      },
    });

    tl.to(titleRef.current, {
      opacity: 1,
      duration: 1,
    })
      .to(wordRefs.current, {
        opacity: 1,
        color: "#fff",
        stagger: 0.1,
        duration: 2,
      })
      .to(wordRefs.current, {
        opacity: 0,
        duration: 10,
      })
      .to(titleRef.current, {
        position: "relative",
        left: "50%",
        top: "50%",
        x: "-50%",
        duration: 10,
      })
      .to(
        containerRef.current,
        {
          gap: 16,
          duration: 10,
        },
        "<",
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          duration: 10,
          height: "auto",
          visibility: "visible",
        },
        "-=50%",
      )
      .to(
        wordWrapRef.current,
        {
          opacity: 0,
          duration: 10,
          height: 0,
          visibility: "hidden",
        },
        "<",
      );
  }, []);

  return (
    <section className={cn(variants({ className }))}>
      <div className="relative flex h-lvh place-items-center" ref={sectionRef}>
        <div className="container">
          <div className="relative flex flex-col gap-2" ref={containerRef}>
            <HomeTitle className="relative">
              <span
                className="inline-block text-white opacity-0"
                ref={titleRef}
              >
                ABOUT
              </span>
            </HomeTitle>
            <div
              className="invisible h-0 text-center opacity-0"
              ref={buttonRef}
            >
              <Button asChild variant="secondary" size="lg" shape="rounded">
                <Link href="/about">More View</Link>
              </Button>
            </div>
            <div className="relative">
              <div
                className="h-auto font-bold portrait:text-[6vw] portrait:leading-[9vw] landscape:text-[2.5vw] landscape:leading-[4vw]"
                ref={wordWrapRef}
              >
                {wordWrap.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className="inline-block text-white opacity-0"
                    ref={(el) => {
                      el && (wordRefs.current[index] = el);
                    }}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
