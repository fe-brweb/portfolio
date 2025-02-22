"use client";

import BounceText from "@/components/skill/BounceText";
import Marquee from "@/components/skill/Marquee";
import SkillItem, { Skill } from "@/components/skill/SkillItem";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { RefObject, useRef, useState } from "react";
import { IoRefreshOutline } from "react-icons/io5";

const items: Skill[] = [
  {
    category: "FE",
    title: "React",
    description: `
      Virtual DOM의 개념을 이해합니다::
      useState(상태관리), useEffect(라이프사이클 관리),
      useMemo/useCallback(성능 최적화), useRef(DOM요소 및 변수 관리) 등 주요 훅을 이해하고 사용할 수 있습니다::
      Redux 또는 Recoil, Zustand 등의 라이브러리를 활용한 전역상태관리가 가능합니다::
      단방향 데이터 흐름을 이해하고 props를 사용할 수 있습니다
      `,
    position: {
      left: "20%",
      top: "8%",
    },
    to: {
      x: 160,
      y: -200,
    },
  },
  {
    category: "FE",
    title: "NextJS",
    description: `
      SSR을 이해하며, 서버 컴포넌트와 클라이언트 컴포넌트를 구분하여 사용할 수 있습니다::
      코드스플리팅을 이해하며, Dynamic Import를 통해 성능 최적화를 할 수 있습니다::
      next/head 또는 metadata를 사용하여 SEO 친화적인 메타 태그를 설정 할 수 있습니다::
      파일기반 라우팅 시스템을 이해하며, useRouter 훅을 통해 네비게이션 관리가 가능합니다
    `,
    position: {
      right: "20%",
      top: "10%",
    },
    to: {
      x: 180,
      y: -126,
    },
  },
  {
    category: "FE",
    title: "Vue",
    description: `
      Reactive 시스템을 이해하고, v-if, v-for, v-show 등의 디렉트브를 통한 제어가 가능합니다::
      Vuex 또는 injext()를 통해 전역상태 관리를 할 수 있습니다::
      setup(), reactive() 등의 Composition API를 사용하여 Options API 보다 더 나은 로직을 작성이 가능합니다::
      양방향 데이터 흐름을 이해하며, v-model를 사용한 데이터바인딩이 가능합니다
    `,
    position: {
      left: "0%",
      top: "15%",
    },
    to: {
      x: 100,
      y: 180,
    },
  },
  {
    category: "FE",
    title: "NuxtJS",
    description: `
    SSR을 이해하며, asyncData 또는 fetch 메서드를 사용한 서버데이터를 렌더링할 수 있습니다::
    head() 메서드를 사용하여 페이지별 메타태그 작성 및 SEO를 최적화 할 수 있습니다::
    플러그인 시스템을 통해 외부라이브러리 또는 전역 컴포넌트를 설정등의 애플리케이션 확장이 가능합니다::
    파일기반 라우팅 시스템을 이해하며, this.$router 를 통해 네비게이션 관리가 가능합니다
    `,
    position: {
      right: "34%",
      top: "30%",
    },
    to: {
      x: -174,
      y: -176,
    },
  },
  {
    category: "FE",
    title: "JavaScript",
    description: `
      let/const, 화살표함수, 템플릿 리터럴, 구조분해할당 등의 ES6 문법을 이해하고 사용할 수 있습니다:: 
      이벤트 리스너를 통한 이벤트 핸들러 및 이벤트 객체를 사용한 이벤트 처리가 가능합니다::
      이벤트 버블링과 캡처링 등의 이벤트 흐름을 이해 및 이벤트 전파 제어 처리가 가능합니다::
      콜스택, 이벤트 큐등의 이벤트 루프 개념을 이해하며, fetch, async/await, setTimeout, setInterval 등의 비동기 처리가 가능합니다
    `,
    position: {
      left: "55%",
      top: "55%",
    },
    to: {
      x: -300,
      y: 400,
    },
  },
  {
    category: "FE",
    title: "TypeScript",
    description: `
    interface를 사용한 객체 구조 정의가 가능합니다::
    class의 개념을 이해하고 extends 을 통확 클래스 확장 사용이 가능합니다::
    제네릭 함수를 이해하고 보다 유연한 타입 처리가 가능합니다::
    유니언/인터섹션 타입 및 Type 앨리어스를 통한 정의가 가능합니다::
    React(Next), Vue(Nuxt) 등에서 타입스크립트를 적용하여 더욱 체계적이고 안전성 있는 코드를 작성할수 있습니다`,
    position: {
      right: "54%",
      top: "54%",
    },
    to: {
      x: 135,
      y: -200,
    },
  },
  {
    category: "CS",
    title: "Architecture",
    description: `
    컴포넌트 기반 (Component-Based) 아키텍처를 이해하며, 모듈화를 통한 재사용성 가능 및 효율적인 개발이 가능합니다::
    SPA (Single Page Application) 아키텍처를 이해하며, 사용자 경험을 개선한 애플리캐이션 개발이 가능합니다::
    API-중심 아키텍처 (API-First) 아키텍처를 이해하며, RESTful API를 통한 애플리캐이션 개발이 가능합니다 `,
    position: {
      left: "0%",
      top: "54%",
    },
    to: {
      x: 200,
      y: 200,
    },
  },
  {
    category: "UI/UX",
    title: "DESIGN TOOL",
    description: `
    Figma를 사용한 디자이너와의 실시간 협업 및 UI/UX 프로토타입 제작이 가능합니다::
    Zeplin을 사용한 디자이너와의 협업 및 디자인 시스템 관리가 가능합니다::
    Phothoshop, Iillustrator를 활용한 그래픽 편집이 가능하며, UI/UX 협업툴로도 작업이 가능합니다`,
    position: {
      right: "35%",
      top: "64%",
    },
    to: {
      x: 200,
      y: 300,
    },
  },
  {
    category: "UI/UX",
    title: "Interaction",
    description: `
    HTML,CSS,JavaScript를 활용한 인터랙티브 구현이 가능합니다::
    GSAP의 ScrollTrigger, timeline, useGSAP 등을 활용한 애니매이션 구현이 가능합니다::
    Framer Motion의 motion 컴포넌트 및 다양한 API를 통해 React 애플리케이션 애니메이션 구현이 가능합니다::
    ChartJs, Swiper 등 사용자 인터페이스 및 콘텐츠 시각화와 관련된 효과 구현이 가능합니다
    `,
    position: {
      left: "60%",
      top: "34%",
    },
    to: {
      x: 134,
      y: 116,
    },
  },
];

const media = gsap.matchMedia();

const SkillContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemPosRefs = useRef<HTMLDivElement[]>([]);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [reset, setReset] = useState(false);

  useGSAP(() => {
    media.add("(orientation: landscape)", () => {
      itemPosRefs.current.forEach((el, index) => {
        gsap.set(el, {
          left: items[index].position.left
            ? items[index].position.left
            : undefined,
          right: items[index].position.right
            ? items[index].position.right
            : undefined,
          top: items[index].position.top,
        });
      });

      itemRefs.current.forEach((el, index) => {
        gsap.to(el, {
          x: items[index].to.x,
          y: items[index].to.y,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: 1,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });
    });

    media.add("(orientation: portrait)", () => {
      itemPosRefs.current.forEach((el, index) => {
        gsap.set(el, {
          left: items[index].position.left ? "10%" : undefined,
          right: items[index].position.right ? "10" : undefined,
          top: index * 350,
        });
      });

      itemRefs.current.forEach((el, index) => {
        gsap.to(el, {
          x: index % 2 === 0 ? 100 : -100,
          y: -200,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: 1,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });
    });
  }, []);

  return (
    <article className="relative overflow-hidden bg-primary">
      <BounceText className="my-10">
        <Marquee duration={5}>
          <span className="block px-5 text-[10.9375vw]">
            UX UI CREATIVE FE DEVELOPER
          </span>
        </Marquee>
      </BounceText>
      <section
        className="relative z-[2] portrait:h-[3000px] landscape:h-[2000px]"
        ref={containerRef}
      >
        <button
          onClick={() => {
            setReset(true);
            setTimeout(() => setReset(false), 1000);
          }}
          className="absolute bottom-0 right-10 z-[20] text-white"
        >
          <IoRefreshOutline size={40} />
          <span className="sr-only">위치 초기화</span>
        </button>
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className={cn(
                "absolute size-0",
                item.position.right &&
                  "-translate-x-[210px] md:-translate-x-[293px]",
              )}
              ref={(el) => {
                el && (itemPosRefs.current[index] = el);
              }}
            >
              <SkillItem
                item={item}
                containerRef={containerRef as RefObject<HTMLDivElement>}
                ref={(el: HTMLDivElement) => {
                  el && (itemRefs.current[index] = el);
                }}
                className="h-[320px] w-[210px] md:h-[400px] md:w-[290px]"
                reset={reset}
              />
            </div>
          );
        })}
      </section>
      <BounceText className="my-10">
        <Marquee reverse duration={5}>
          <span className="block px-5 text-[10.9375vw]">
            UX UI CREATIVE FE DEVELOPER
          </span>
        </Marquee>
      </BounceText>
    </article>
  );
};

export default SkillContainer;
