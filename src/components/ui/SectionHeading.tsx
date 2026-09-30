import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold-600">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base text-muted">{description}</p>}
    </div>
  );
}
