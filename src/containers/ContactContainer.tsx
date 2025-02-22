"use client";

import ContactForm from "@/components/contact/ContactForm";
import EarthGlb from "@/components/contact/EarthGlb";

const ContactContainer = () => {
  return (
    <article className="relative">
      <EarthGlb className="absolute left-0 top-0 size-full h-lvh bg-gradient-to-bl from-[#140b18] to-[#040c19]" />
      <ContactForm />
    </article>
  );
};

export default ContactContainer;
