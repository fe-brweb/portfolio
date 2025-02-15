"use client";

import Earth from "@/components/contact/Earth";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/stores";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ContactContainer = () => {
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
        content: <>전송이 완료되었습니다</>,
      });
      createContaact.reset();

      return response;
    } catch (error) {
      console.error("전송 실패:", error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <Earth className="fixed left-0 top-0 size-full" />
      <article className="relative z-[1]">
        <section className="flex h-lvh items-center">
          <div className="container">
            <div className="grid grid-cols-1 gap-10 rounded-2xl bg-white/0 p-10 md:grid-cols-2">
              <div className="flex flex-col gap-4 text-white">
                <h4 className="mb-10 text-4xl uppercase">Contact</h4>
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
                className="relative flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-10"
              >
                <>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="name">Name</label>
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
                    <label htmlFor="email">Email</label>
                    <div>
                      <input
                        id="email"
                        className="h-10 w-full rounded-sm bg-gray-100 p-2"
                        {...createContaact.register("email")}
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label htmlFor="message">Message</label>
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
                  <div className="bg-primary/50 absolute flex size-full items-center justify-center">
                    loading...
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default ContactContainer;
