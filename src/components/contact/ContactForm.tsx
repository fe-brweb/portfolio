"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores";
import { cva, type VariantProps } from "class-variance-authority";
import Lottie from "lottie-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import animationData from "../../../public/assets/json/success_check.json";
import LoadingSpinner from "../ui/LoadingSpinner";

const variants = cva("relative z-[1] flex min-h-lvh landscape:items-center", {
  variants: {},
  defaultVariants: {},
});

interface ContactFormProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {}

const ContactForm: React.FC<ContactFormProps> = ({ className, children }) => {
  const [loading, setLoading] = useState(false);
  const modal = useAppStore((s) => s.modal);
  const createContaact = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmitForm = createContaact.handleSubmit(async (formData) => {
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: { title: [{ text: { content: formData.name } }] },
          Email: { email: formData.email },
          Message: { rich_text: [{ text: { content: formData.message } }] },
          Date: { date: { start: new Date().toISOString() } },
        }),
      });

      modal.onOpen({
        content: (
          <>
            <div className="py-5">
              <Lottie
                animationData={animationData}
                className="mx-auto block w-40"
              />
              <p className="text-center text-lg">전송이 완료되었습니다</p>
            </div>
          </>
        ),
        cancelText: null,
      });
      createContaact.reset();

      //   return response;
    } catch (error) {
      console.error("전송 실패:", error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <section className={cn(variants({ className }))}>
      <div className="container">
        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-white/0 py-[60px] md:grid-cols-2">
          <div className="flex flex-col gap-4 text-white">
            <h4 className="mb-10 hidden text-4xl uppercase landscape:block">
              Contact
            </h4>
            <div>
              <h4>Name</h4>
              <p>김보라</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>rockbell89@naver.com</p>
            </div>
            <div>
              <h4>Github</h4>
              <p>
                <a href="//github.com/rockbell89" target="_blank">
                  github.com/rockbell89
                </a>
              </p>
            </div>
            <div>
              <h4>Web</h4>
              <p>
                <a href="//portfolio-brweb.vercel.app" target="_blank">
                  portfolio-brweb.vercel.app
                </a>
              </p>
            </div>
          </div>
          <form
            onSubmit={onSubmitForm}
            className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-black/20 p-6 md:px-6 md:py-10"
          >
            <>
              <div className="flex w-full flex-col gap-2">
                <label className="text-white" htmlFor="name">
                  Name
                </label>
                <div>
                  <input
                    id="name"
                    className="h-10 w-full rounded-sm bg-gray-100 p-2"
                    {...createContaact.register("name")}
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <label className="text-white" htmlFor="email">
                  Email
                </label>
                <div>
                  <input
                    id="email"
                    className="h-10 w-full rounded-sm bg-gray-100 p-2"
                    {...createContaact.register("email")}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <label className="text-white" htmlFor="message">
                  Message
                </label>
                <div>
                  <textarea
                    id="message"
                    className="h-40 w-full rounded-sm bg-gray-100 p-2"
                    {...createContaact.register("message")}
                  ></textarea>
                </div>
              </div>
              <div className="w-full">
                <Button
                  variant="secondary"
                  size="lg"
                  type="submit"
                  className="w-full"
                  disabled={
                    !createContaact.formState.isDirty ||
                    !createContaact.formState.isValid
                  }
                >
                  SEND
                </Button>
              </div>
            </>
            {loading && (
              <div className="absolute flex size-full items-center justify-center bg-black/80 text-white">
                <LoadingSpinner />
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
