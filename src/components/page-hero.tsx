import Reveal from "@/components/reveal";

export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-plum-gradient pb-16 pt-36 sm:pt-40">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-premium relative flex flex-col items-center text-center">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-2xl text-balance font-serif text-4xl leading-[1.1] text-cream sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-balance leading-relaxed text-cream/60">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
