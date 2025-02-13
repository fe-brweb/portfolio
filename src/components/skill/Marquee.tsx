"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import {
  Children,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const variants = cva("relative flex w-full flex-row overflow-hidden", {
  variants: {},
  defaultVariants: {},
});

interface MarqueeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {
  duration?: number;
  reverse?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({
  reverse,
  duration = 50,
  children,
  className,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [clone, setClone] = useState(1);
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  const calculateWidth = useCallback(() => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const marqueeRect = marqueeRef.current?.getBoundingClientRect();
    const containerWidth = containerRect?.width;
    const marqueeWidth = marqueeRect?.width;

    if (containerWidth && marqueeWidth) {
      setClone(
        marqueeWidth < containerWidth
          ? Math.ceil(containerWidth / marqueeWidth)
          : 1,
      );
      setMarqueeWidth(marqueeWidth);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    calculateWidth();
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cloneChildren = useCallback(
    (count: number) => {
      return [...Array(count)].map((_, i) => (
        <Fragment key={i}>
          {Children.map(children, (child) => (
            <div>{child}</div>
          ))}
        </Fragment>
      ));
    },
    [children],
  );

  const scroll = {
    x: reverse ? [`-${marqueeWidth}px`, "0%"] : ["0%", `-${marqueeWidth}px`],
    transition: {
      duration: duration ? duration : marqueeWidth / 100,
      ease: "linear",
      repeat: Infinity,
    },
  };

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className={cn(variants({ className }))}>
      <motion.div
        animate={scroll}
        className="flex min-w-full flex-shrink-0 flex-grow-0 basis-auto flex-row items-center will-change-transform"
      >
        {reverse && cloneChildren(clone)}
        <div
          ref={marqueeRef}
          className="flex min-w-fit flex-shrink-0 flex-grow-0 basis-auto flex-row items-center"
        >
          {Children.map(children, (child) => (
            <div>{child}</div>
          ))}
        </div>
        {!reverse && cloneChildren(clone)}
      </motion.div>
    </div>
  );
};

export default Marquee;
