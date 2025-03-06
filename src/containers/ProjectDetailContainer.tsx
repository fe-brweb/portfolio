"use client";

import AppPageTitle from "@/components/AppPageTitle";
import NotionPage from "@/components/ui/NotionPage";
import { Project } from "@/types/project.type";
import Image from "next/image";
import { type ExtendedRecordMap } from "notion-types";
import React from "react";
import { BiLink } from "react-icons/bi";
import { RiCalendar2Line, RiGithubFill } from "react-icons/ri";

interface ProjectDetailContainerProps {
  item: Project;
  recordMap?: ExtendedRecordMap;
}

const ProjectDetailContainer: React.FC<ProjectDetailContainerProps> = ({
  item,
  recordMap,
}) => {
  return (
    <article className="bg-white pt-[60px]">
      <AppPageTitle>{item.title}</AppPageTitle>
      <section className="relative min-h-[300px] bg-primary py-10">
        <div className="container max-w-[1000px]">
          {item.coverUrl && (
            <Image
              src={item.coverUrl}
              fill
              priority
              alt=""
              className="pointer-events-none object-cover opacity-20 bg-blend-multiply contrast-150"
            />
          )}
          <div className="relative flex flex-col gap-4 leading-none text-white">
            <span className="block leading-none">{item.category.name}</span>
            <h3 className="text-3xl leading-none">{item.title}</h3>
            {item.period && (
              <p className="flex items-center gap-x-2 text-sm leading-none">
                <RiCalendar2Line />
                {item.period?.start} ~ {item.period.end}
              </p>
            )}
            {item.description && <p>{item.description}</p>}
            {item.tags && item.tags.length && (
              <p className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-block rounded-sm bg-white/10 px-2 py-1 text-sm leading-none text-white"
                  >
                    {tag.name}
                  </span>
                ))}
              </p>
            )}
            {item.contents && (
              <ul className="list-disc pl-5">
                {item.contents
                  ?.split("-")
                  .map((content, index) => (
                    <li key={index} className="leading-6">
                      {content}
                    </li>
                  ))
                  .filter((_, index) => index !== 0)}
              </ul>
            )}
            <div className="flex flex-wrap gap-2 text-2xl">
              {item.repository && (
                <a href={item.repository} target="_blank" className="block">
                  <RiGithubFill />
                  <span className="sr-only">깃헙 바로가기</span>
                </a>
              )}
              {item.website && (
                <a href={item.website} target="_blank" className="block">
                  <BiLink />
                  <span className="sr-only">사이트 바로가기</span>
                </a>
              )}
              {/* {item.url && (
              <Link href={`/project/${item.id}`} className="block">
                <RiNotionFill />
                <span className="sr-only">노션 바로가기</span>
              </Link>
            )} */}
            </div>
          </div>
        </div>
      </section>
      {/* {item.images.length > 0 && (
      <section className="bg-purple-950 py-10">
        <div className="container max-w-[1000px]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {item.images?.map((imageUrl, index) => (
              <div className="relative aspect-video w-full" key={index}>
                <Image src={imageUrl} fill priority alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )} */}
      {recordMap && (
        <section className="py-10">
          <div className="container max-w-[1000px]">
            <NotionPage recordMap={recordMap} />
          </div>
        </section>
      )}
    </article>
  );
};

export default ProjectDetailContainer;
