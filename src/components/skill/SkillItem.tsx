"use client";

import useDevice from "@/hooks/useDevice";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import React, { forwardRef, RefObject } from "react";

export interface Skill {
  category: string;
  title: string;
  description?: string;
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

const variants = cva("cursor-grab select-none active:cursor-grabbing", {
  variants: {},
  defaultVariants: {},
});

interface SkillItemProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {
  item: Skill;
  containerRef: RefObject<HTMLDivElement>;
  reset: boolean;
}

const SkillItem = forwardRef<HTMLDivElement, SkillItemProps>(
  ({ item, containerRef, reset, className }, ref) => {
    const { isMobile } = useDevice();

    return (
      <div ref={ref}>
        <motion.div
          className={cn(variants({ className }))}
          transition={{
            type: "spring",
            stiffness: 10,
            damping: 20,
          }}
          animate={
            reset
              ? { x: 0, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              : undefined
          }
          {...(!isMobile && {
            drag: true,
            dragConstraints: containerRef,
            dragElastic: 0.2,
            whileTap: { scale: 2 },
          })}
        >
          <div
            className={cn(
              "relative size-full rounded-lg bg-white p-4 text-primary shadow-lg shadow-gray-500/10 md:p-7",
              !isMobile && "touch-none select-none",
            )}
          >
            <div className="relative block h-full">
              <div className="block h-full text-left">
                <div className="mb-[10px] block md:mb-[40px]">
                  <p className="block select-none">{item.category}</p>
                </div>
                <div className="block">
                  <div className="flex select-none flex-col gap-y-1.5 font-pretendard">
                    {item.description?.split("::").map((text, index) => (
                      <div
                        className="items-top tex-sm break-word flex gap-x-1 text-[12px] leading-[14px] md:text-[13px] md:leading-[18px]"
                        key={index}
                      >
                        - <p>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 block">
                  <div className="pc-only">
                    <div className="pointer-events-none select-none">
                      <div className="origin-top text-2xl md:text-5xl">
                        <h4 className="opacity-1 select-none">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  },
);

SkillItem.displayName = "SkillItem";

export default SkillItem;
