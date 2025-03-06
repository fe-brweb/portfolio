"use client";

import AboutStrength from "@/components/about/AboutStrength";
import ContactForm from "@/components/contact/ContactForm";
import HomeAbout from "@/components/home/HomeAbout";
import HomeIntro from "@/components/home/HomeIntro";
import HomePortfolio from "@/components/home/HomePortfolio";
import HomeSkil from "@/components/home/HomeSkil";
import useDevice from "@/hooks/useDevice";
import { Project } from "@/types/project.type";
import { motion, useAnimation, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import SkillContainer from "./SkillContainer";

interface HomeContainerProps {
  projects: Project[];
}

const EarthGlb = dynamic(() => import("@/components/contact/EarthGlb"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const HomeContainer: React.FC<HomeContainerProps> = ({ projects }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useDevice();
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <article className="overflow-hidden bg-primary">
      <HomeIntro id="intro" />
      <HomeAbout id="about" />
      {!isMobile && <AboutStrength />}

      {projects && <HomePortfolio projects={projects} id="project" />}
      <HomeSkil id="skill" />
      <SkillContainer />
      <motion.section
        className="relative"
        id="contact"
        ref={ref}
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <EarthGlb className="absolute left-0 top-0 size-full h-lvh bg-gradient-to-bl from-[#140b18] to-[#040c19]" />
        <ContactForm />
      </motion.section>
    </article>
  );
};

export default HomeContainer;
