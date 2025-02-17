"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { ImSpinner2 } from "react-icons/im";

const variants = cva("", {
  variants: {},
  defaultVariants: {},
});

interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div className={cn(variants({ className }))}>
      <ImSpinner2 className="size-10 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
