"use client";

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

const variants = cva(
  "cursor-grab touch-none select-none active:cursor-grabbing",
  {
    variants: {},
    defaultVariants: {},
  },
);

interface SkillItemProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {
  item: Skill;
  containerRef: RefObject<HTMLDivElement>;
  reset: boolean;
}

const SkillItem = forwardRef<HTMLDivElement, SkillItemProps>(
  ({ item, containerRef, reset, className }, ref) => {
    return (
      <div ref={ref}>
        <motion.div
          className={cn(variants({ className }))}
          drag
          dragConstraints={containerRef}
          dragElastic={0.2}
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
          whileTap={{
            scale: 2,
          }}
        >
          <div className="relative size-full touch-none select-none rounded-lg bg-white p-4 text-primary shadow-lg shadow-gray-500/10 md:p-7">
            <div className="relative block h-full touch-none">
              <div className="block h-full touch-none text-left">
                <div className="mb-[10px] block touch-none md:mb-[40px]">
                  <p className="block touch-none select-none">
                    {item.category}
                  </p>
                </div>
                <div className="block touch-none">
                  <div className="flex touch-none select-none flex-col gap-y-1.5 font-pretendard">
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
                <div className="absolute bottom-0 left-0 block touch-none">
                  <div className="pc-only touch-none">
                    <div className="pointer-events-none touch-none select-none">
                      <div className="origin-top touch-none text-2xl md:text-5xl">
                        <h4 className="opacity-1 touch-none select-none">
                          {item.title}
                        </h4>
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
