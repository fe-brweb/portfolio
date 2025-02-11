"use client";

import BounceText from "@/components/skill/BounceText";
import Marquee from "@/components/skill/Marquee";
import SkillItem, { Skill } from "@/components/skill/SkillItem";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

const items: Skill[] = [
  {
    category: "FE",
    title: "React",
    position: {
      left: "25%",
      top: "0%",
    },
    to: {
      x: -160,
      y: -116.3,
    },
  },
  {
    category: "FE",
    title: "NextJS",
    position: {
      right: "34%",
      top: "10%",
    },
    to: {
      x: 180,
      y: -126.3,
    },
  },
  {
    category: "FE",
    title: "Vue",
    position: {
      left: "10%",
      top: "30%",
    },
    to: {
      x: 164.5,
      y: 156.3,
    },
  },
  {
    category: "FE",
    title: "NuxtJS",
    position: {
      right: "44%",
      top: "30%",
    },
    to: {
      x: -174.5,
      y: -176.3,
    },
  },
  {
    category: "FE",
    title: "JavaScript",
    position: {
      left: "0%",
      top: "55%",
    },
    to: {
      x: 134.5,
      y: 116.3,
    },
  },
  {
    category: "FE",
    title: "TypeScript",
    position: {
      right: "44%",
      top: "44%",
    },
    to: {
      x: 134.5,
      y: 116.3,
    },
  },
];

const SkillContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  const [containerRect, setContainerRect] = useState<{
    top: number;
    bottom: number;
  }>({
    top: 0,
    bottom: 0,
  });

  useGSAP(() => {
    itemRefs.current.forEach((el, index) => {
      gsap.to(el, {
        x: items[index].to.x,
        y: items[index].to.y,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
          start: "top bottom",
          end: "bottom top",
        },
      });
    });

    if (containerRef.current)
      setContainerRect({
        top: containerRef.current?.getBoundingClientRect().top,
        bottom: containerRef.current?.clientHeight,
      });
  }, []);

  return (
    <article className="min-h-dvh overflow-hidden bg-primary pt-[20px]">
      <section className="relative leading-none">
        <BounceText>
          <Marquee>
            <span className="block text-[10.9375vw]">
              UX UI CREATIVE FE DEVELOPER
            </span>
          </Marquee>
        </BounceText>
        <BounceText>
          <Marquee reverse>
            <span className="block text-[10.9375vw]">
              UX UI CREATIVE FE DEVELOPER
            </span>
          </Marquee>
        </BounceText>
      </section>
      <section className="relative mt-[100px] h-[2000px]" ref={containerRef}>
        {items.map((item, index) => (
          <div
            key={index}
            className="absolute size-0"
            style={{
              left: item.position.left,
              right: item.position.right,
              top: item.position.top,
            }}
          >
            <SkillItem
              item={item}
              index={index + 1}
              ref={(el: HTMLDivElement) => {
                el && (itemRefs.current[index] = el);
              }}
              containerRect={containerRect}
            />
          </div>
        ))}
      </section>
    </article>
  );
};

export default SkillContainer;
