export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full max-w-6xl mx-auto gap-6 py-8 md:py-10">
      {children}
    </section>
  );
}
