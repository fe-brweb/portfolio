"use client";

import AboutProfile from "@/components/about/AboutProfile";
import AboutStrength from "@/components/about/AboutStrength";
import useSectionTheme from "@/hooks/useSectionTheme";
import { useRef } from "react";

const AboutContainer = () => {
  const sectionRefs = Array.from({ length: 2 }, () =>
    useRef<HTMLDivElement>(null),
  );
  useSectionTheme({ sectionRefs });

  return (
    <article>
      <section data-color="black" data-bgcolor="white" ref={sectionRefs[0]}>
        <AboutProfile />
      </section>
      <section
        data-color="white"
        data-bgcolor={`var(--primary)`}
        className="bg-primary"
        ref={sectionRefs[1]}
      >
        <AboutStrength />
      </section>
    </article>
  );
};

export default AboutContainer;
