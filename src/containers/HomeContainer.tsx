"use client";

import HomeAbout from "@/components/home/HomeAbout";
import HomeIntro from "@/components/home/HomeIntro";
import HomePortfolio from "@/components/home/HomePortfolio";
import HomeSkil from "@/components/home/HomeSkil";
import { Project } from "@/types/project.type";
import React from "react";

interface HomeContainerProps {
  projects?: Project[];
}

const HomeContainer: React.FC<HomeContainerProps> = ({ projects }) => {
  return (
    <article>
      <HomeIntro />
      <HomeAbout />
      {projects && <HomePortfolio projects={projects} />}
      <HomeSkil />
    </article>
  );
};

export default HomeContainer;
