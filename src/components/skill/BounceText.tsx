"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import BounceLine from "./BounceLine";

const variants = cva("relative block py-4", {
  variants: {},
  defaultVariants: {},
});

interface BounceTextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const BounceText: React.FC<BounceTextProps> = ({ className, children }) => {
  return (
    <div className={cn(variants({ className }))}>
      <BounceLine className="absolute bottom-[7.03125vw] top-auto w-[calc(100%-200px)] origin-left" />
      <BounceLine className="absolute -bottom-[7.03125vw] top-auto w-[calc(100%-200px)] origin-right" />
      <span className="block w-max -translate-y-[0.3125vw] text-white will-change-transform">
        {children}
      </span>
    </div>
  );
};

export default BounceText;
