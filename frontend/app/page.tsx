"use client";

import { Snippet } from "@nextui-org/snippet";
import { SignUpButton, useUser, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

import { title, subtitle } from "@/components/primitives";

export default function Home() {
  const { user } = useUser();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("auth.getToken:", await auth.getToken());
        const res = await fetch("http://localhost:3001/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await auth.getToken()}`,
          },
        });

        console.log(
          "Server message:",
          res.ok ? await res.text() : res.statusText
        );
      } catch (error) {
        console.error("Error fetching server message:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            <SignUpButton />
          </span>
        </Snippet>
      </div>
    </section>
  );
}
