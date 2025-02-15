"use client";

import usePageTitleTransform from "@/hooks/usePageTitleTransform";
import { useRouterConfig } from "@/hooks/useRouterConfig";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useCallback } from "react";

const variants = cva("w-full flex-none", {
  variants: {
    variant: {
      base: "bg-white text-black",
      transparent: "bg-transparent text-white",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});

export interface AppHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const AppHeader: React.FC<AppHeaderProps> = ({ variant, className }) => {
  const config = useRouterConfig();
  const wheelNav = useAppStore(useCallback((state) => state.wheelNav, []));
  const motionStyle = usePageTitleTransform();

  return (
    <header
      className={cn(
        variants({ variant, className }),
        config?.visibleTitle && "h-[60px]",
      )}
    >
      <div className="fixed left-0 top-0 z-10 h-[60px] w-full bg-[inherit]">
        <div className="container flex h-[inherit] place-items-center">
          <motion.h1
            className="inline-flex items-center gap-x-1 text-2xl font-bold"
            style={motionStyle.logo}
          >
            <Link href="/" className="ml-auto">
              BR.DEV
            </Link>
          </motion.h1>
          <div className="ml-auto">
            <button
              onClick={() => wheelNav.onOpen()}
              className={cn(
                "border-gradient",
                "relative flex size-8 place-content-center place-items-center rounded-full",
              )}
            ></button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
