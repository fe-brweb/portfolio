"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useRef } from "react";

const items: Array<{
  title: string;
  desc: string;
  x: string;
  y: string;
  line: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    rotate: number;
  };
}> = [
  {
    title: "Goal Directed",
    desc: "능동적이고 적극적인 문제해결을 통해 원하는 결과에 도달할때 까지 노력합니다",
    x: "0%",
    y: "-84%",
    line: {
      left: "22%",
      top: "49.5%",
      rotate: -55,
    },
  },
  {
    title: "Collaboration Skills",
    desc: "관련 지식 및 유연한 커뮤니케이션으로 협업 능력 발휘합니다",
    x: "-94%",
    y: "84%",
    line: {
      right: "22%",
      top: "49.5%",

      rotate: 55,
    },
  },
  {
    title: "Continuous Self-Development",
    desc: "새로운 프로젝트와 도전을 통해 지속적으로 학습하고 성장하여 역량을 확대합니다",
    x: "94%",
    y: "84%",
    line: {
      bottom: "19%",
      rotate: 0,
    },
  },
];

const variants = cva("h-lvh overflow-hidden bg-primary", {
  variants: {},
  defaultVariants: {},
});

interface AboutTestProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const AboutTest: React.FC<AboutTestProps> = ({
  className,
  children,
  ...props
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const lineWrapRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  const h4Refs = useRef<HTMLDivElement[]>([]);
  const pRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (
      !sectionRef.current ||
      !rectRef.current ||
      itemRefs.current.length === 0 ||
      !lineWrapRef.current ||
      lineRefs.current.length === 0 ||
      h4Refs.current.length === 0 ||
      pRefs.current.length === 0
    )
      return;

    const tl = gsap.timeline();

    gsap.set(gsap.utils.toArray(lineRefs.current), {
      scaleX: 0,
      stagger: 0,
      rotate: (index) => items[index].line.rotate,
    });

    tl.fromTo(
      rectRef.current,
      {
        opacity: 0,
        top: 80,
        rotate: -120,
      },
      {
        opacity: 1,
        top: 0,
        rotate: 0,
      },
      "-=100%",
    )
      .to(
        itemRefs.current,
        {
          x: (index) => items[index].x,
          y: (index) => items[index].y,
          borderRadius: "50%",
          stagger: 0,
        },
        "-=100%",
      )
      .to(
        lineWrapRef.current,
        {
          scale: 1,
        },
        "-=100%",
      )
      .to(
        lineRefs.current,
        {
          scaleX: 1,
          opacity: 1,
          stagger: 0,
          duration: 0.2,
        },
        "-=100%",
      )
      .to(
        [h4Refs.current, pRefs.current],
        {
          opacity: 1,
          stagger: 0,
          duration: 0.1,
        },
        "-=80%",
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
        },
        "-=50%",
      );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      scrub: true,
      start: "top-=100% top",
      animation: tl,
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      scrub: true,
      start: "top top",
    });
  }, []);

  return (
    <section
      className={cn(variants({ className }))}
      ref={sectionRef}
      {...props}
    >
      <div className="container flex h-[inherit] items-center justify-center">
        <div
          ref={rectRef}
          className="relative flex w-[calc(850/920*var(--vh,1vh)*100)] origin-center items-center justify-center before:pb-[82.352%] before:content-['']"
        >
          <h3
            className="font-medium uppercase leading-none text-white opacity-0 portrait:pt-[6vw] portrait:text-[6vw] landscape:pt-[15vh] landscape:text-[6vh]"
            ref={titleRef}
          >
            Strength
          </h3>
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                el && (itemRefs.current[index] = el);
              }}
              className="absolute flex aspect-square w-1/3 origin-center flex-col items-center justify-center bg-white p-4 text-center opacity-100"
            >
              <h4
                className="text-[max(calc(24/920*var(--vh,1vh)*100),20px)] font-medium leading-none text-violet-900 opacity-0"
                ref={(el) => {
                  el && (h4Refs.current[index] = el);
                }}
              >
                {item.title}
              </h4>
              <p
                className="mt-4 break-keep text-[max(calc(16/920*var(--vh,1vh)*100),12px)] text-gray-800 opacity-0 portrait:hidden"
                ref={(el) => {
                  el && (pRefs.current[index] = el);
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
          <div
            className="absolute flex size-full origin-center scale-0 items-center justify-center"
            ref={lineWrapRef}
          >
            {items.map((item, index) => (
              <div
                ref={(el) => {
                  el && (lineRefs.current[index] = el);
                }}
                key={index}
                className="absolute h-[2px] w-[calc(26%-30px)] origin-center bg-white"
                style={{
                  left: item.line.left,
                  right: item.line.right,
                  top: item.line.top,
                  bottom: item.line.bottom,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTest;
