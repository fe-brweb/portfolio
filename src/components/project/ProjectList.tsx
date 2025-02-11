"use client";

import { cn } from "@/lib/utils";
import { Project } from "@/types/project.type";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import ProjectItem from "./ProjectItem";

const variants = cva("grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", {
  variants: {},
  defaultVariants: {},
});

interface ProjectListProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {
  items: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ items, className }) => {
  return (
    <div className={cn(variants({ className }))}>
      {items?.map((item: Project) => (
        <ProjectItem
          item={item}
          key={item.id}
          className="transform-3d origin-[center_top]"
        />
      ))}
    </div>
  );
};

export default ProjectList;
