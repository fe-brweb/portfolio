"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import React, { forwardRef, useEffect, useRef, useState } from "react";

export interface Skill {
  category: string;
  title: string;
  position: {
    left?: string;
    right?: string;
    top: string;
  };
  to: {
    x: string | number;
    y: string | number;
  };
}

const variants = cva("", {
  variants: {},
  defaultVariants: {},
});

interface SkillItemProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {
  item: Skill;
  index: number;
  containerRect: {
    top: number;
    bottom: number;
  };
}

const SkillItem = forwardRef<HTMLDivElement, SkillItemProps>(
  ({ item, containerRect }, ref) => {
    const motionRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startRotation, setStartRotation] = useState(0);
    const [dragConstraints, setDragConstraints] = useState({
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    });
    useEffect(() => {
      if (window !== undefined)
        setDragConstraints({
          left: -motionRef.current?.getBoundingClientRect().left!,
          right:
            window.innerWidth +
            -motionRef.current?.getBoundingClientRect().right!,
          top: containerRect.top,
          // - motionRef.current?.getBoundingClientRect().top!,
          bottom: containerRect.bottom,
          // +            -motionRef.current?.getBoundingClientRect().bottom!,
        });
    }, []);

    const handleMouseMove = (event: MouseEvent) => {
      if (motionRef.current) {
        const rect = motionRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;

        const angle = Math.atan2(dy, dx);

        let angleDeg = (angle * 180) / Math.PI;

        if (isDragging) {
          const deltaX = mouseX - startX;

          const angleDelta = deltaX * 0.001;

          angleDeg = startRotation + angleDelta;

          angleDeg = Math.max(
            startRotation - 45,
            Math.min(startRotation + 45, angleDeg),
          );
        }
        setRotation(angleDeg);
      }
    };

    const handleMouseDown = (event: React.MouseEvent) => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
      <div ref={ref}>
        <motion.div
          className="h-[400px] w-[293px] cursor-grab touch-none select-none active:cursor-grabbing"
          drag
          dragConstraints={dragConstraints}
          ref={motionRef}
          dragElastic={0.2}
          onMouseDown={handleMouseDown}
          animate={{
            rotate: rotation,
          }}
          transition={{
            type: "spring",
            stiffness: 10,
            damping: 20,
          }}
        >
          <div className="relative size-full touch-none rounded-lg bg-white px-7 py-6 text-primary shadow-lg shadow-gray-500/10">
            <button className="relative block h-full touch-none">
              <span className="block h-full touch-none text-left">
                <span className="mb-[60px] block touch-none">
                  <span className="block touch-none">{item.category}</span>
                </span>
                <span className="block touch-none">
                  <span className="block touch-none"></span>
                </span>
                <span className="absolute bottom-0 left-0 block touch-none">
                  <span className="pc-only touch-none">
                    <span className="pointer-events-none touch-none select-none">
                      <span className="origin-top touch-none text-[60px]">
                        <span className="opacity-1 touch-none">
                          {item.title}
                        </span>
                      </span>
                    </span>
                  </span>
                  <span className="hidden touch-none">{item.title}</span>
                </span>
              </span>
            </button>
          </div>
        </motion.div>
        <div className="app-card-observer"></div>
      </div>
    );
  },
);

SkillItem.displayName = "SkillItem";

export default SkillItem;
