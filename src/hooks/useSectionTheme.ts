"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { RefObject } from "react";

const useSectionTheme = ({
  sectionRefs,
}: {
  sectionRefs: RefObject<HTMLDivElement | null>[];
}) => {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const sections = sectionRefs!
        .map((ref) => ref.current)
        .filter(Boolean) as HTMLDivElement[];
      const switchColor = (color: string, bgcolor?: string) => {
        gsap.to("h2.page-title", {
          duration: 0.3,
          ease: "power1.inOut",
          color,
        });
        gsap.to("header", {
          duration: 0.3,
          ease: "power1.inOut",
          backgroundColor: bgcolor,
        });
      };

      sections.forEach((section, index) => {
        const { color, bgcolor } = section.dataset;
        const { color: previousColor, bgcolor: previousBgcolor } = sections[
          index - 1
        ]
          ? sections[index - 1].dataset
          : sections[0].dataset;

        if (color && previousColor && previousBgcolor)
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            onEnter: () => switchColor(color, bgcolor),
            onEnterBack: () =>
              index === sections.length - 1 && switchColor(color, bgcolor),
            onLeaveBack: () => switchColor(previousColor, previousBgcolor),
          });
      });
    });
    return () => ctx.revert();
  }, [sectionRefs]);
};
export default useSectionTheme;
