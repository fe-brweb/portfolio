"use client";

import { useRouterConfig } from "@/hooks/useRouterConfig";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useRef, useState } from "react";
import AppHeader from "./AppHeader";
import AppPageTitle from "./AppPageTitle";

const variants = cva("contents", {
  variants: {},
  defaultVariants: {},
});

interface AppLayoutProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const AppLayout: React.FC<AppLayoutProps> = ({ className, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const config = useRouterConfig();

  return (
    <div className={cn(variants({ className }))}>
      <AppHeader {...config?.headerProps} />
      <main ref={contentRef}>
        {config?.visibleTitle && <AppPageTitle {...config?.pageTitleProps} />}
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
