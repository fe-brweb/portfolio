"use client";

import ProjectList from "@/components/project/ProjectList";
import useSectionTheme from "@/hooks/useSectionTheme";
import { cn } from "@/lib/utils";
import { Project, Tag } from "@/types/project.type";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface ProjectContainerProps {
  items: Project[];
  tags: Tag[];
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ items, tags }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sectionRefs = Array.from({ length: 1 }, () =>
    useRef<HTMLDivElement>(null),
  );
  useSectionTheme({ sectionRefs });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentTags = params.getAll("tags");
    if (currentTags.join(",") !== selectedTags.join(",")) {
      setSelectedTags(currentTags);
    }
  }, [searchParams]);

  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const existingTags = params.getAll("tags");

    // 태그가 이미 있으면 제거, 없으면 추가
    const updatedTags = existingTags.includes(tag)
      ? existingTags.filter((t) => t !== tag)
      : [...existingTags, tag];

    if (updatedTags.length === 0) {
      params.delete("tags");
    } else {
      params.delete("tags");
      updatedTags.forEach((t) => params.append("tags", t));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const updateCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <article className="min-h-dvh bg-primary py-10">
      <section
        data-color="white"
        data-bgcolor={`var(--primary)`}
        ref={sectionRefs[0]}
      >
        <div className="container">
          <div className="flex flex-col gap-4">
            {/* Category 필터 */}
            <div className="flex flex-wrap gap-2 rounded-sm text-white">
              <button
                onClick={() => updateCategory("All")}
                className={cn("min-w-20 rounded-full bg-black/10 px-2 py-1", {
                  "text-purple-600": !searchParams.get("category"),
                })}
              >
                All
              </button>
              {["Work", "Toy"].map((category) => (
                <button
                  onClick={() => updateCategory(category)}
                  className={cn("min-w-20 rounded-full bg-black/10 px-2 py-1", {
                    "text-purple-600":
                      searchParams.get("category") === category,
                  })}
                  key={category}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* Tag 필터 */}
            {/* <div className="flex flex-wrap gap-4 rounded-sm bg-black/30 p-4 uppercase text-white">
              {tags.map((tag) => (
                <button
                  onClick={() => toggleTag(tag?.name)}
                  className={cn({
                    "text-purple-600": selectedTags.includes(tag?.name),
                  })}
                  key={tag?.name}
                >
                  {tag?.name}
                </button>
              ))}
            </div> */}
          </div>

          <div className="mt-5">{items && <ProjectList items={items} />}</div>
        </div>
      </section>
    </article>
  );
};

export default ProjectContainer;
