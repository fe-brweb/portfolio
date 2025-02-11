"use client";

import { cn } from "@/lib/utils";
import { Project } from "@/types/project.type";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";
import { BiLink } from "react-icons/bi";
import { FiArrowRightCircle } from "react-icons/fi";
import { RiGithubFill } from "react-icons/ri";

const variants = cva(
  "relative flex flex-col overflow-hidden border border-white/10 text-white",
  {
    variants: {},
    defaultVariants: {},
  },
);

interface ProjectItemProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {
  item: Project;
}

const ProjectItem = forwardRef<HTMLDivElement, ProjectItemProps>(
  ({ className, item }, ref) => {
    return (
      <div className={cn(variants({ className }))} ref={ref}>
        <Link
          href={`/project/${item.id}`}
          className="relative aspect-[800/500]"
        >
          {item.thumbUrl && (
            <Image
              src={item.thumbUrl}
              width={1200}
              height={750}
              alt={item.title}
              priority
            />
          )}
        </Link>
        <div className="flex flex-1 flex-col justify-between gap-4 bg-primary">
          <div className="flex flex-1 flex-col gap-4 p-4 text-xs">
            <span className="absolute left-4 top-4 rounded-sm bg-primary px-2 py-1 text-xs leading-none">
              {item.category.name}
            </span>
            {item.period && (
              <p className="absolute right-4 top-4 rounded-sm bg-primary px-2 py-1 text-xs leading-none">
                {item.period.start} {item.period.end && `~ ${item.period.end}`}
              </p>
            )}
            {item.title && <h3 className="text-xl font-bold">{item.title}</h3>}
            {item.description && <p>{item.description}</p>}
            {item.tags && item.tags.length && (
              <p className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-block rounded-sm bg-white/10 px-2 py-1 leading-none text-white"
                  >
                    {tag.name}
                  </span>
                ))}
              </p>
            )}
          </div>
          <div className="flex flex-none flex-wrap items-center justify-between gap-2 p-4 text-2xl">
            <div className="flex flex-wrap items-center gap-2">
              {item.repository && (
                <a href={item.repository} target="_blank">
                  <RiGithubFill />
                  <span className="sr-only">깃헙 바로가기</span>
                </a>
              )}
              {item.website && (
                <a href={item.website} target="_blank">
                  <BiLink />
                  <span className="sr-only">사이트 바로가기</span>
                </a>
              )}
            </div>
            <div>
              <Link href={`/project/${item.id}`}>
                <FiArrowRightCircle />
                <span className="sr-only">상세 보기</span>
              </Link>
            </div>
          </div>
        </div>
        {/* </Link> */}
      </div>
    );
  },
);

ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
