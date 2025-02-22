"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "../ui/Button";
import HomeTitle from "./HomeTitle";

const variants = cva(
  "relative overflow-hidden bg-primary pb-[calc(400lvh+300px)]",
  {
    variants: {},
    defaultVariants: {},
  },
);

interface HomeAboutProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const HomeAbout: React.FC<HomeAboutProps> = ({ className }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const wordWrapRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    if (!wordRefs.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=500%",
      pin: true,
      pinSpacing: false,
      invalidateOnRefresh: true,
      refreshPriority: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "center center",
        end: "+=400%",
        scrub: 0.05,
      },
    });

    tl.to(titleRef.current, {
      opacity: 1,
      duration: 1,
    })
      .fromTo(
        wordWrapRef.current,
        {
          backgroundPositionX: "100%",
        },
        {
          backgroundPositionX: "0%",
          duration: 10,
        },
      )
      .to(titleRef.current, {
        opacity: 0,
        duration: 5,
      })
      .to(
        wordWrapRef.current,
        {
          opacity: 0,
          duration: 5,
        },
        "<",
      );
  }, []);

  return (
    <>
      <section className={cn(variants({ className }))}>
        <div
          className="relative flex h-lvh place-items-center"
          ref={sectionRef}
        >
          <div className="container">
            <div className="relative flex flex-col gap-2" ref={containerRef}>
              <HomeTitle>
                <span
                  className="inline-block text-white opacity-0"
                  ref={titleRef}
                >
                  ABOUT
                </span>
              </HomeTitle>
              <div
                className="invisible h-0 text-center opacity-0"
                ref={buttonRef}
              >
                <Button asChild variant="secondary" size="lg" shape="rounded">
                  <Link href="/about">More View</Link>
                </Button>
              </div>
              <div className="relative mt-5">
                <span
                  className="inline font-pretendard font-medium text-transparent portrait:text-[6vw] portrait:leading-[9vw] landscape:text-[1.8vw] landscape:leading-[2.6vw]"
                  ref={wordWrapRef}
                  style={{
                    background:
                      "linear-gradient(to right, rgba(255,255,255) 50%, rgba(45,45,45) 50%)",
                    backgroundClip: "text",
                    backgroundSize: "200% 100%",
                  }}
                >
                  안녕하세요 웹퍼블리셔로 시작해 현재 프론트엔드 개발자로서의
                  길을 걷고 있는 김보라 입니다. 웹 에이전시부터 스타트업를
                  거처서 얻은 다앙햔 경험을 통해 확장성과 유지 보수성이 높은
                  아키텍처와 패턴을 위해 언제나 고민하고 있습니다.
                  <br />
                  하나의 서비스를 만들기 위해서는 팀원들뿐만 아니라 다양한
                  부서와의 긴밀한 협업과 소통이 필수적입니다. T자형 인재로서,
                  저의 전문 분야뿐만 아니라 서비스를 만들기 위해 필요한 전반적인
                  지식을 바탕으로 동료들과 원활하게 소통할 수 있으며, 이러한
                  하드스킬과 소프트스킬을 통해 협업 과정에서 더 큰 시너지를
                  발휘해왔습니다. 또한, 제 업무에만 그치지 않고 도움이 필요한
                  부분은 적극적으로 서포트하며, 제한된 리소스 환경에서도 책임감
                  있게 프로젝트를 완수했습니다. 그 결과 동료들과 팀장들로부터
                  높은 신뢰를 얻었고, 함께 일하고 싶다는 긍정적인 평가를 받을 수
                  있었습니다. 앞으로도 이러한 강점을 바탕으로 개인적인 성장뿐
                  아니라 팀과 조직에 의미 있는 가치를 더하며, 목표 성과 달성에
                  지속적으로 기여할 수 있기를 기대합니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeAbout;
