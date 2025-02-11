"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Project } from "@/types/project.type";
import { useGSAP } from "@gsap/react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { useRef } from "react";
import ProjectItem from "../project/ProjectItem";
import { Button } from "../ui/Button";
import HomeTitle from "./HomeTitle";

const variants = cva("relative overflow-hidden bg-black", {
  variants: {},
  defaultVariants: {},
});

interface HomeProjectProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {
  projects: Project[];
  count?: number;
}

const media = gsap.matchMedia();

const HomeProject: React.FC<HomeProjectProps> = ({
  projects,
  count = 5,
  className,
}) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const boxRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    media.add("(orientation: landscape)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: titleRef.current,
        pinSpacing: false,
        scrub: 1,
      });
    });

    media.add("(orientation: portrait)", () => {
      itemRefs.current.forEach((el, index) => {
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: `top +=${80 + index * 10}`,
            end: "top +=80",
            endTrigger: itemRefs.current[itemRefs.current.length - 1],
            scrub: true,
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });

          gsap.to(boxRefs.current[index], {
            rotateX: -3,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: `top +=${80 + index * 10}`,
              end: "top -=30%",
              scrub: 1,
            },
          });

          gsap.to(boxRefs.current[index], {
            scale: 0.2,
            filter: "brightness(0)",
            top: -200,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: `top +=${80 + index * 10}`,
              end: "top -=700%",
              scrub: 1,
            },
          });
        }
      });
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section className={cn(variants({ className }))} ref={sectionRef}>
      <div className="items-top container flex flex-col gap-10 pb-20 pt-10 landscape:h-auto landscape:flex-row landscape:py-0">
        <div className="flex-[40%]">
          <div ref={titleRef}>
            <div className="flex flex-col items-start justify-center text-white landscape:h-dvh">
              <HomeTitle>Project</HomeTitle>
              <p className="mt-5">
                더 많은 프로젝트를 확인하려면 <br />
                아래 버튼을 클릭해주세요
              </p>
              <div className="mt-5">
                <Button asChild variant="secondary" shape="rounded" size="lg">
                  <Link href="/project">More View</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="block flex-[60%] landscape:overflow-visible">
          {projects &&
            projects?.slice(0, count).map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  el && (itemRefs.current[index] = el);
                }}
                className="perspective-[1000px] landscape:p-10"
              >
                <div
                  ref={(el) => {
                    el && (boxRefs.current[index] = el);
                  }}
                  key={item.id}
                  className="relative top-0 inline-block brightness-100 landscape:block landscape:-rotate-12"
                >
                  <ProjectItem item={item} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProject;
