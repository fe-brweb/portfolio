"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const variants = cva("", {
  variants: {},
  defaultVariants: {},
});

interface TransitionLayerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const TransitionLayer: React.FC<TransitionLayerProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn(variants({ className }))}>
      <div className="TransitionLayer_transition-layer__Yr53B transition-enter-done">
        <svg
          className="TransitionLayer_wave__fHKOS TransitionLayer_wave__top__HcdR1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <defs>
            <path
              id="transition-wave-path"
              d="M0,128L21.8,138.7C43.6,149,87,171,131,154.7C174.5,139,218,85,262,69.3C305.5,53,349,75,393,101.3C436.4,128,480,160,524,186.7C567.3,213,611,235,655,213.3C698.2,192,742,128,785,122.7C829.1,117,873,171,916,186.7C960,203,1004,181,1047,160C1090.9,139,1135,117,1178,96C1221.8,75,1265,53,1309,53.3C1352.7,53,1396,75,1418,85.3L1440,96L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
            ></path>
          </defs>
          <use href="#transition-wave-path"></use>
        </svg>
        <div className="TransitionLayer_push__NH7A3"></div>
        <svg
          className="TransitionLayer_wave__fHKOS TransitionLayer_wave__bottom__pGsb6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <use href="#transition-wave-path"></use>
        </svg>
      </div>
    </div>
  );
};

export default TransitionLayer;
