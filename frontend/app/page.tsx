"use client";

import { Snippet } from "@nextui-org/snippet";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";

import Documents from "./documents/page";

import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <>
      <SignedIn>
        <Documents />
      </SignedIn>

      <SignedOut>
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
      </SignedOut>
    </>
  );
}
