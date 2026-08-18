import { cn } from "@/lib/format";
import Reveal from "@/components/reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "max-w-2xl text-balance font-serif text-4xl leading-[1.1] sm:text-5xl",
            dark ? "text-cream" : "text-ink"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "max-w-xl text-balance text-base leading-relaxed",
              dark ? "text-cream/65" : "text-ink/60"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
