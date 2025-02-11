"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const variants = cva(
  "font-bold uppercase leading-none portrait:text-[10vw] landscape:text-[4vw]",
  {
    variants: {},
    defaultVariants: {},
  },
);

interface HomeTitleProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const HomeTitle: React.FC<HomeTitleProps> = ({ className, children }) => {
  return <h2 className={cn(variants({ className }))}>{children}</h2>;
};

export default HomeTitle;
