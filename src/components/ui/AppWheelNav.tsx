"use client";

import { routerConfig } from "@/configs/router-config";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores";
import { cva, type VariantProps } from "class-variance-authority";
import { throttle } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const items = [...routerConfig];

const variants = cva("", {
  variants: {},
  defaultVariants: {},
});

interface AppWheelNavProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const AppWheelNav: React.FC<AppWheelNavProps> = ({ className }) => {
  const router = useRouter();
  const wheelNav = useAppStore(useCallback((state) => state.wheelNav, []));

  const radius = 160;
  const itemSize = 80;

  const [rotation, setRotation] = useState(-90);

  const circleRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<{ x: number; y: number } | null>(null);
  const isTouching = useRef(false); // 터치 중 여부
  const startAngle = useRef(rotation); // 시작 각도
  const previousAngle = useRef(rotation); // 이전 각도
  const currentAngle = useRef(rotation); // 현재 각도

  // 원 중심 좌표 계산
  const getCenter = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    return (centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  // 특정 좌표에서 각도 계산
  const calculateAngle = (
    x: number,
    y: number,
    centerX: number,
    centerY: number,
  ) => {
    return (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI;
  };

  const handleTouchStart = throttle(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!circleRef.current) return;
      isTouching.current = true;
      const { clientX, clientY } = "touches" in e ? e.touches[0] : e;
      const center = getCenter(circleRef.current);
      startAngle.current = calculateAngle(clientX, clientY, center.x, center.y);
      previousAngle.current = startAngle.current; // 시작 각도를 저장
      // document.documentElement.style.overscrollBehavior = "none";
      // document.body.style.overflow = "hidden";
    },
    16,
  );

  const handleTouchMove = throttle((e: React.TouchEvent | React.MouseEvent) => {
    if (!circleRef.current || !isTouching.current) return;

    const { clientX, clientY } = "touches" in e ? e.touches[0] : e;
    const center = getCenter(circleRef.current);
    currentAngle.current = calculateAngle(clientX, clientY, center.x, center.y);

    // deltaAngle을 시작 각도와의 차이로 계산
    let deltaAngle = currentAngle.current - previousAngle.current;

    // 회전 값 반영
    // deltaAngle이 +180보다 크거나 -180보다 작을 경우, 보정하는 부분
    if (deltaAngle > 180) {
      deltaAngle -= 360;
    } else if (deltaAngle < -180) {
      deltaAngle += 360;
    }

    // 이전 각도를 업데이트
    previousAngle.current = currentAngle.current;

    // if (animationFrameId.current) {
    //   cancelAnimationFrame(animationFrameId.current);
    // }

    // animationFrameId.current = requestAnimationFrame(() => {
    // 회전 값을 계속 누적
    setRotation((prevRotation) => prevRotation + deltaAngle);
    // });
  }, 16);

  const handleTouchEnd = () => {
    isTouching.current = false; // 터치 종료
    // document.documentElement.style.overscrollBehavior = "auto";
    // document.body.style.overflow = "auto";
  };

  // 휠 이벤트 핸들러 추가
  const animationFrameId = useRef<number | null>(null);
  const previousRotation = useRef(rotation);
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    // delta 값을 부드럽게 처리하기 위해 속도 조정
    const delta = e.deltaY / 5;

    // 애니메이션을 부드럽게 하기 위해 requestAnimationFrame 사용
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    // requestAnimationFrame을 통해 회전 값 업데이트
    const updateRotation = () => {
      previousRotation.current -= delta;
      setRotation(previousRotation.current);
    };

    animationFrameId.current = requestAnimationFrame(updateRotation);
  };

  useEffect(() => {
    // 휠 이벤트 리스너 등록
    if (circleRef.current) {
      circleRef.current.addEventListener("wheel", handleWheel);
    }

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      if (circleRef.current) {
        circleRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    if (!wheelNav.isOpen) {
      setRotation(-90);
    }
  }, [wheelNav.isOpen]);

  return (
    <>
      <div className={cn("invisible contents", wheelNav.isOpen && "visible")}>
        <div className="fixed z-10 size-full">
          {/** dimmed 레이어 */}
          <div
            className="absolute z-0 size-full bg-black/75"
            onClick={() => wheelNav.onClose()}
          ></div>
          {/** 네비 리스트 */}
          <div className="absolute bottom-0 left-0 right-0 z-10 h-16">
            <div
              className={cn(
                "absolute left-1/2 top-0 origin-center -translate-x-1/2 -translate-y-1/2",
              )}
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                touchAction: "none",
                userSelect: "none",
              }}
            >
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 size-full origin-center -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white shadow-sm transition-transform duration-300 will-change-transform",
                  {
                    "scale-100": wheelNav.isOpen,
                  },
                )}
              >
                <button
                  onClick={() => wheelNav.onClose()}
                  className={cn(
                    "border-gradient",
                    "absolute left-1/2 top-1/2 z-10 flex size-1/3 -translate-x-1/2 -translate-y-1/2 place-content-center place-items-center rounded-full",
                  )}
                ></button>
                <div
                  ref={circleRef}
                  className="relative size-full origin-center"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleTouchStart}
                  onMouseMove={handleTouchMove}
                  onMouseUp={handleTouchEnd}
                >
                  <ul
                    className={cn(
                      "absolute flex size-full items-center justify-center",
                      "before:-mt-10 before:ml-24 before:origin-[top_center] before:rotate-[-24deg] before:bg-gray-200 before:content-['']",
                      "after:ml-24 after:mt-10 after:origin-[top_center] after:rotate-[24deg] after:bg-gray-200 after:content-['']",
                      "before:absolute before:left-1/2 before:top-1/2 before:z-10 before:h-px before:w-16 before:-translate-x-1/2 before:-translate-y-1/2",
                      "after:absolute after:left-1/2 after:top-1/2 after:z-10 after:h-px after:w-16 after:-translate-x-1/2 after:-translate-y-1/2",
                    )}
                  >
                    {items.map((item, index) => {
                      const angle = (index / items.length) * 360;
                      const x =
                        Math.cos((angle * Math.PI) / 180) * (radius * 0.7);
                      const y =
                        Math.sin((angle * Math.PI) / 180) * (radius * 0.7);

                      // const top = radius + y - itemSize / 2;
                      // const left = radius + x - itemSize / 2;

                      return (
                        <li
                          key={index}
                          className={cn(
                            "absolute flex items-center justify-center",
                            "origin-center -translate-x-1/2 -translate-y-1/2",
                          )}
                          style={{
                            width: `${itemSize}px`,
                            height: `${itemSize}px`,
                            transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)`,
                            // top: `${top}px`,
                            // left: `${left}px`,
                          }}
                        >
                          <button
                            onClick={(e) => {
                              if (item.external) {
                                window.open(item.path, "_blank");
                              } else {
                                router.push(item.path);
                              }

                              wheelNav.onClose();
                            }}
                            className="block w-full select-none text-center"
                          >
                            <span className="inline-block size-6 [&_svg]:inline-block [&_svg]:size-full">
                              {item.icon}
                            </span>
                            <p className="mt-1 select-none text-xs font-medium uppercase">
                              {item.title}
                            </p>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppWheelNav;
