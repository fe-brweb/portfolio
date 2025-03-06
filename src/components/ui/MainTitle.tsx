import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const DynamicSVGFilter = () => {
  const { scrollY } = useScroll();
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const matrixRef = useRef<SVGFEColorMatrixElement>(null);

  // 블러 값 애니메이션 (0 ~ 35 범위)
  const blurValue = useTransform(scrollY, [0, 200], [0, 40]);

  // feColorMatrix 값 보간
  const matrixValues = useTransform(
    scrollY,
    [0, 200],
    [
      "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0", // 기본 상태
      "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -20", // 변경 상태
    ],
  );

  return (
    <div>
      {/* SVG 필터 정의 (숨김 처리) */}
      <svg aria-hidden="true" style={{ display: "none" }}>
        <defs>
          <filter id="dynamic-filter" colorInterpolationFilters="sRGB">
            <motion.feGaussianBlur
              ref={blurRef}
              in="SourceGraphic"
              stdDeviation={blurValue}
              result="blur"
            />
            <motion.feColorMatrix
              ref={matrixRef}
              in="blur"
              mode="matrix"
              values={matrixValues}
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* 필터 적용된 텍스트 */}
      <h1 className="relative text-center font-bold leading-none text-white transition-all portrait:text-[10vw] landscape:text-[6vw]">
        <span style={{ filter: "url(#dynamic-filter)" }}>
          UI/UX INTERACTIVE
          <br />
          DEVELOPER
        </span>
      </h1>
    </div>
  );
};

export default DynamicSVGFilter;
