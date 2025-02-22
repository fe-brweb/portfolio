"use client";

import AboutStrength from "@/components/about/AboutStrength";
import HomeAbout from "@/components/home/HomeAbout";
import HomeIntro from "@/components/home/HomeIntro";
import HomePortfolio from "@/components/home/HomePortfolio";
import HomeSkil from "@/components/home/HomeSkil";
import { Project } from "@/types/project.type";
import React from "react";
import ContactContainer from "./ContactContainer";
import SkillContainer from "./SkillContainer";

interface HomeContainerProps {
  projects: Project[];
}

const HomeContainer: React.FC<HomeContainerProps> = ({ projects }) => {
  return (
    <article className="overflow-x-hidden bg-primary">
      <HomeIntro />
      <HomeAbout />
      <AboutStrength />
      {projects && <HomePortfolio projects={projects} />}
      <HomeSkil />
      <SkillContainer />
      <ContactContainer />
    </article>
  );
};

export default HomeContainer;
