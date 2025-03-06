"use client";

import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { cva, VariantProps } from "class-variance-authority";
import React, { useEffect, useRef } from "react";
import { BiLogoFlutter, BiLogoTypescript } from "react-icons/bi";
import { IoLogoSass } from "react-icons/io5";
import {
  RiJavascriptFill,
  RiNextjsLine,
  RiReactjsLine,
  RiVuejsLine,
} from "react-icons/ri";
import { TbBrandNuxt } from "react-icons/tb";
import { TiHtml5 } from "react-icons/ti";
import MainTitle from "../ui/MainTitle";

const items = [
  { background: "#28BC72", scale: 3.0, icon: <RiVuejsLine /> },
  { background: "#F29F22", scale: 2.0, icon: <BiLogoFlutter /> },
  { background: "#8A89EB", scale: 1.5, icon: <RiNextjsLine /> },
  { background: "#5FC8E2", scale: 2.5, icon: <RiReactjsLine /> },
  { background: "#F6636C", scale: 2.0, icon: <RiJavascriptFill /> },
  { background: "#F07FCA", scale: 3.0, icon: <IoLogoSass /> },
  { background: "#1F87D5", scale: 1.5, icon: <BiLogoTypescript /> },
  { background: "#EED548", scale: 2.5, icon: <TiHtml5 /> },
  { background: "#EED548", scale: 3.0, icon: <TbBrandNuxt /> },
];

interface Point {
  x: number;
  y: number;
  z: number;
  scale: number;
}

const variants = cva(
  "flex h-lvh w-full items-center justify-center overflow-hidden bg-black",
  {
    variants: {},
    defaultVariants: {},
  },
);

interface HomeIntroProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const HomeIntro: React.FC<HomeIntroProps> = ({ className, ...props }) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(16);
  const degreeRef = useRef(0);
  const slopeRef = useRef(0);
  const xMouseRef = useRef(-100);
  const yMouseRef = useRef(-100);
  const touchFlagRef = useRef(
    typeof window !== "undefined" && "ontouchstart" in window,
  );

  const centerWRef = useRef(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0,
  );
  const centerHRef = useRef(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  );
  const basebgScaleRef = useRef(1.0);

  const resizeRef = useRef<number | null>(null);

  const ulRef = useRef<HTMLUListElement | null>(null);
  const liRefs = useRef<Array<HTMLLIElement | null>>(
    new Array(items.length).fill(null),
  );

  const pointRef = useRef<Array<Point>>(
    items.map(() => ({
      x: 0,
      y: 0,
      z: 0,
      scale: 0,
    })),
  );

  const updateStyle = (newPoints: Point[]) => {
    if (ulRef.current) {
      ulRef.current.style.transform = `rotate(${slopeRef.current}deg)`;

      liRefs.current.forEach((liElement, index) => {
        const p = newPoints[index];
        if (liElement) {
          liElement.style.left = `${p.x}px`;
          liElement.style.top = `${p.y}px`;
          liElement.style.zIndex = `${Math.round(p.z)}`;
          liElement.style.transform = `scale(${p.scale})`;
        }
      });
    }
  };

  const animate = () => {
    if (!bgRef.current) return;

    // 3D [x,y,z] 중심 좌표
    const coordinates = [
      0,
      0,
      Math.max(centerWRef.current, centerHRef.current) * 2.75,
    ];

    const newPoints = pointRef.current.map((_, i) => {
      const radius =
        [1.5, 0.9, 1.2, 1.6, 0.6, 1.0, 1.4, 0.7, 1][i] *
        Math.max(centerWRef.current, centerHRef.current);
      const angle = 45 * i;
      const y =
        [0.14, 0.7, -0.42, 0.98, -0.7, 0.42, -0.14, -0.98][i] *
        centerHRef.current;

      const x =
        Math.sin((Math.PI * (degreeRef.current + angle)) / 180) * radius;
      const z =
        Math.cos((Math.PI * (degreeRef.current + angle)) / 180) * radius;

      const distance = Math.sqrt(x * x + y * y + (z - coordinates[2]) ** 2);
      const scale = (coordinates[2] / distance) * basebgScaleRef.current;

      return {
        x,
        y,
        z,
        scale,
      };
    });

    pointRef.current = newPoints;

    // 각도 업데이트
    degreeRef.current = (degreeRef.current + 0.4) % 360;

    // 요소 업데이트
    updateStyle(newPoints);

    if (!touchFlagRef.current) {
      const deltaX = xMouseRef.current - centerWRef.current;
      const deltaY = yMouseRef.current - centerHRef.current;
      const trigger =
        (deltaX / centerHRef.current) * (deltaY / centerWRef.current) * 30;
      slopeRef.current = slopeRef.current + (trigger - slopeRef.current) / 10;
    }

    // 다음 프레임 요청
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // 애니메이션 시작
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // 리사이징
  useEffect(() => {
    const handleResize = () => {
      if (resizeRef.current) {
        cancelAnimationFrame(resizeRef.current);
      }

      resizeRef.current = requestAnimationFrame(() => {
        centerWRef.current = window.innerWidth / 2;
        centerHRef.current = window.innerHeight / 2;
        basebgScaleRef.current = Math.max(
          (window.innerWidth * window.innerHeight) / (1600 * 900),
          1.0,
        );
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeRef.current) {
        cancelAnimationFrame(resizeRef.current);
      }
    };
  }, []);

  // 마우스 이동 핸들러
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xMouseRef.current = clientX;
      yMouseRef.current = clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });
  }, []);

  return (
    <section
      className={cn(variants({ className }))}
      {...props}
      ref={sectionRef}
    >
      <div
        className="absolute size-full bg-[url(/assets/images/noise.gif)] bg-repeat opacity-10"
        style={{ backgroundSize: "160px 120px" }}
      ></div>
      <div
        ref={bgRef}
        className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden"
      >
        <ul
          ref={ulRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-45"
        >
          {pointRef.current.map((_, index) => (
            <li
              key={index}
              ref={(el) => {
                liRefs.current[index] = el;
              }}
              className="absolute left-0 top-0 z-0 scale-100 will-change-transform"
            >
              <div
                className="absolute flex size-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full text-[30px] text-white"
                style={{
                  backgroundColor: items[index].background,
                  transform: `scale(${items[index].scale})`,
                }}
              >
                {items[index].icon}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="container">
        <MainTitle />
      </div>
      <div className="absolute left-0 right-0 z-10 text-center text-white portrait:bottom-[20vh] landscape:bottom-[10vh]">
        <span>SCROLL DOWN</span>
      </div>
    </section>
  );
};

export default HomeIntro;
