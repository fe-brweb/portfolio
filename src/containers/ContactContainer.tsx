"use client";

import AppPageTitle from "@/components/AppPageTitle";
import ContactForm from "@/components/contact/ContactForm";
import EarthGlb from "@/components/contact/EarthGlb";

const ContactContainer = () => {
  return (
    <article>
      <EarthGlb className="fixed left-0 top-0 size-full h-lvh bg-gradient-to-bl from-[#1c0527] to-[#040c19]" />
      <ContactForm />
    </article>
  );
};

export default ContactContainer;
