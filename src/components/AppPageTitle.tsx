"use client";

import usePageTitleTransform from "@/hooks/usePageTitleTransform";
import { useRouterConfig } from "@/hooks/useRouterConfig";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, MotionStyle } from "framer-motion";
import React, { useRef } from "react";

const variants = cva("h-[60px] flex-none bg-transparent", {
  variants: {},
  defaultVariants: {},
});

export interface AppPageTitleProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {
  title?: string;
  motionStyle?: MotionStyle;
}

const AppPageTitle: React.FC<AppPageTitleProps> = ({ className, children }) => {
  const pageTitleRef = useRef<HTMLDivElement>(null);

  const config = useRouterConfig();
  const motionStyle = usePageTitleTransform();

  return (
    <>
      <div className={cn(variants({ className }))} ref={pageTitleRef}>
        <div className="reltive container flex h-[inherit] w-full place-items-center">
          <motion.h2
            className={cn(
              "page-title fixed z-[1] block w-full origin-left text-2xl font-bold uppercase leading-none text-inherit",
            )}
            style={motionStyle.title}
          >
            <span className="mr-14 block overflow-hidden text-ellipsis text-nowrap">
              {config?.title || children}
            </span>
          </motion.h2>
        </div>
      </div>
    </>
  );
};

export default AppPageTitle;
