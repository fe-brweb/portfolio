"use client";

import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useRef } from "react";

const variants = cva("", {
  variants: {},
  defaultVariants: {},
});

interface BounceLineProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const BounceLine: React.FC<BounceLineProps> = ({ className, children }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useGSAP(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    let amplitude = 0.07;
    let baseLine = 80;
    let mouseMoveBounceAnimation: gsap.core.Tween | null = null;
    let mouseLeaveBounceAnimation: gsap.core.Tween | null = null;
    let isMouseLeaveBounceAnimationActive = false;

    gsap.set(path, {
      attr: { d: `M0,80 Q 640 ${baseLine}, 1280,80` },
    });

    const onMousemove = (event: MouseEvent) => {
      if (mouseLeaveBounceAnimation) mouseLeaveBounceAnimation.kill();

      const bounceValue = (
        (event.offsetY / svg.clientHeight - 0.5) *
          (svg.clientHeight + svg.clientWidth) *
          amplitude +
        baseLine
      ).toFixed(2);

      mouseMoveBounceAnimation = gsap.to(path, {
        duration: 0.3,
        ease: "power1.out",
        attr: { d: `M0,80 Q 640 ${bounceValue}, 1280,80` },
      });
    };

    const onMouseLeave = () => {
      if (mouseMoveBounceAnimation) mouseMoveBounceAnimation.kill();

      isMouseLeaveBounceAnimationActive = true;
      mouseLeaveBounceAnimation = gsap.to(path, {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        attr: { d: `M0,80 Q 640 ${baseLine}, 1280,80` },
        onComplete: () => {
          isMouseLeaveBounceAnimationActive = false;
        },
      });
    };

    svg.addEventListener("mousemove", onMousemove);
    svg.addEventListener("mouseleave", onMouseLeave);

    return () => {
      svg.removeEventListener("mousemove", onMousemove);
      svg.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1280 160"
      style={{ transformOrigin: "center", width: "100%", height: "100%" }}
      className={cn(variants({ className }))}
    >
      <path
        ref={pathRef}
        fill="none"
        strokeWidth="1"
        stroke="#fff"
        d="M0,80 Q 640 80 1280,80"
        className="absolute left-0 top-[-7.8125vw]"
      />
    </svg>
  );
};

export default BounceLine;
