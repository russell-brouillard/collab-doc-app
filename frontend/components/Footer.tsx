import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex gap-6 flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://nextjs.org/learn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
        Learn
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://vercel.com/templates"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
        Examples 3
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://nextjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
        Go to nextjs.org →
      </a>
    </footer>
  );
}
