import { motionValue, useScroll, useTransform } from "framer-motion";

const usePageTitleTransform = (value?: number, indent?: boolean) => {
  const { scrollY } = useScroll();
  const headerHeight = 60;
  const titleHeight = 60;
  const motion = value ? motionValue(value) : scrollY;

  /** scale 값 변경 */
  const scale = useTransform(motion, [0, titleHeight], [1, 0.85]);

  /** x 값 위치 이동 */
  const translateX = useTransform(
    motion,
    [0, titleHeight],
    [0, indent ? 36 : 0],
  );

  /** y 값 위치 이동 */
  const translateY = useTransform(
    motion,
    [0, titleHeight],
    [0, -titleHeight - (headerHeight - titleHeight) / 2],
  );

  /** 폰트 굵기 변경 */
  const fontWeight = useTransform(motion, [0, titleHeight], [700, 500]);

  /** opacity  변경 */
  const opacity = useTransform(motion, [0, titleHeight], [1, 0]);

  return {
    title: {
      scale,
      translateX,
      translateY,
      fontWeight,
    },
    logo: {
      opacity,
    },
  };
};

export default usePageTitleTransform;
