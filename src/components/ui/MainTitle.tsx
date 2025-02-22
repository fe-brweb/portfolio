import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const DynamicSVGFilter = () => {
  const { scrollY } = useScroll();
  const [toggleBlur, setToggleBlur] = useState(false);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const matrixRef = useRef<SVGFEColorMatrixElement>(null);

  // 문자열로 지정된 기본 matrix 값
  const defaultMatrix = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0";

  // 기본 및 변경 blur 값 (문자열 형태)
  const defaultBlur = "0 0";

  // 편의상 숫자 값으로 정의 (x, y 동일)
  const defaultBlurVal = 0;
  const toggledBlurVal = 35;

  // feColorMatrix의 보간을 위해 문자열을 숫자 배열로 변환한 값
  const defaultMatrixArr = [
    1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
  ];
  const toggledMatrixArr = [
    1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 40, -20,
  ];

  // 스크롤 값에 따라 toggleBlur 상태 업데이트: scrollY가 0보다 크면 true, 아니면 false
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 0) {
        setToggleBlur(true);
      } else {
        setToggleBlur(false);
      }
    });
  }, [scrollY]);

  // toggleBlur 상태 변경에 따른 애니메이션 처리 (500ms 동안 보간)
  useEffect(() => {
    const duration = 500; // 애니메이션 시간 (ms)
    let startTime: number | null = null;

    const blurElement = blurRef.current!;
    const matrixElement = matrixRef.current!;
    if (!blurElement || !matrixElement) return;

    // toggleBlur가 true이면 기본 값에서 변경 값으로, false이면 반대로 전환
    const startBlur = toggleBlur ? defaultBlurVal : toggledBlurVal;
    const endBlur = toggleBlur ? toggledBlurVal : defaultBlurVal;

    const startMatrix = toggleBlur ? defaultMatrixArr : toggledMatrixArr;
    const endMatrix = toggleBlur ? toggledMatrixArr : defaultMatrixArr;

    function animate(time: number) {
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // blur 값 보간 (x, y 동일하게 적용)
      const currentBlur = startBlur + (endBlur - startBlur) * progress;
      blurElement.setAttribute("stdDeviation", `${currentBlur} ${currentBlur}`);

      // matrix 값 보간
      const currentMatrix = startMatrix.map((startVal, i) => {
        return startVal + (endMatrix[i] - startVal) * progress;
      });
      matrixElement.setAttribute("values", currentMatrix.join(" "));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }, [toggleBlur]);

  return (
    <div>
      {/* SVG 필터 정의 (화면에 보이지 않도록 display: none 처리) */}
      <svg aria-hidden="true" style={{ display: "none" }}>
        <defs>
          <filter id="dynamic-filter" colorInterpolationFilters="sRGB">
            <feGaussianBlur
              ref={blurRef}
              in="SourceGraphic"
              stdDeviation={defaultBlur}
              result="blur"
            />
            <feColorMatrix
              ref={matrixRef}
              in="blur"
              mode="matrix"
              values={defaultMatrix}
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* 필터가 적용된 텍스트 */}
      <h1 className="relative text-center font-bold leading-none text-white transition-all portrait:text-[10vw] landscape:text-[6vw]">
        <span
          style={{
            filter: "url(#dynamic-filter)",
          }}
        >
          UI/UX INTERACTIVE
          <br />
          DEVELOPER
        </span>
      </h1>
    </div>
  );
};

export default DynamicSVGFilter;
