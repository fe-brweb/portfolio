"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Children,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
};

const Marquee = ({ reverse, duration = 50, children, className }: Props) => {
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
    <div
      ref={containerRef}
      className={cn("relative flex w-full flex-row overflow-hidden", className)}
    >
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
