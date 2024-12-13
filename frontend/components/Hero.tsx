import Image from "next/image";

export default function Hero() {
  return (
    <main className="flex flex-col gap-8 items-center sm:items-start">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-mono">
        <li className="mb-2">
          Get started by editing{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            app/page.tsx
          </code>
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <a
          className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href="https://vercel.com/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
          Deploy now
        </a>
        <a
          className="rounded-full border border-gray-300 dark:border-gray-700 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read our docs
        </a>
      </div>
    </main>
  );
}
