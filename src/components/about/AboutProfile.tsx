"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import React, { forwardRef } from "react";

const items = [
  {
    title: "Name",
    value: "김보라",
  },
  {
    title: "Birth",
    value: "1989.12.24",
  },
  {
    title: "Email",
    value: "rockbell89@naver.com",
  },
  {
    title: "Github",
    value: "github.com/rockbell89",
  },
];

const variants = cva("bg-white py-10", {
  variants: {},
  defaultVariants: {},
});

interface AboutProfileProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const AboutProfile: React.FC<AboutProfileProps> = forwardRef<
  HTMLDivElement,
  AboutProfileProps
>(({ className, ...props }, ref) => {
  return (
    <div className={cn(variants({ className }))} {...props} ref={ref}>
      <div className="container">
        <div className="flex flex-col gap-10 landscape:flex-row">
          <div className="mx-auto max-w-[360px] landscape:w-1/4 landscape:min-w-[300px]">
            <figure className="flex aspect-square items-center justify-center overflow-hidden rounded-full bg-primary-foreground p-10">
              <Image
                src="/assets/images/about_me.jpg"
                width={400}
                height={400}
                alt=""
                priority
                className="mx-auto block mix-blend-multiply"
              />
            </figure>
          </div>
          <div className="landscape:w-3/4">
            <div>
              <h3 className="text-2xl font-medium uppercase">Profile</h3>
              <div>
                <dl className="my-4 flex flex-wrap gap-y-2">
                  {items.map((item, index) => (
                    <React.Fragment key={index}>
                      <dt className="w-[100px] font-medium uppercase">
                        {item.title}
                      </dt>
                      <dd className="w-[calc(100%-100px)]">{item.value}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              </div>
            </div>
            <p>
              IT업계에 첫 발을 디디고 HTML, CSS 마크업에 흥미를 느껴
              웹퍼블리셔의 길을 걷고 있습니다. 기획서와 디자인을 꼼꼼히 확인하여
              마크업을 어떻게 효율적으로 구조화 할 지 숙고하고, 단지 화면에 잘
              보여지는 것 뿐만 아니라 얼마나 시맨틱한 마크업인지, 어떻게
              코딩하면 운영과 유지보수, 개발에 효율적일지 끊임없이 생각하며
              코딩합니다. 기획서와 디자인이 설계도면이라면 마크업은 건물의
              기초공사와 같다고 생각합니다. 기초공사가 잘 된 건물이 튼튼하듯이
              잘 만들어진 웹사이트의 필수조건은 탄탄한 마크업입니다. 여러
              프로젝트에서 디자인과 개발에 비해 HTML마크업과 CSS스타일링을
              포함한 퍼블리싱의 중요도가 등한시 되는 느낌을 받곤 합니다.
              웹사이트나 앱을 구축함에 있어 기획자의 기획의도, 디자이너의 컨셉과
              상상력을 정확하게 구현 및 반영하고, 개발파트와의 원활한 소통으로
              이슈의 선제대응을 통해 프로젝트를 성공적으로 수행하여 퍼블리싱의
              중요성을 어필 할 수 있는 퍼블리셔가 되고자 합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

AboutProfile.displayName = "AboutProfile";

export default AboutProfile;
