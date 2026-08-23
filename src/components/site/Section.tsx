import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  children,
  dark = false,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <section className={`${dark ? "bg-dark text-dark-foreground" : "bg-background text-foreground"} py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title) && (
          <div className="mb-10 md:mb-14 max-w-3xl">
            {eyebrow && (
              <span className={`inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full ${dark ? "bg-white/5 text-primary" : "bg-muted text-primary"}`}>
                {eyebrow}
              </span>
            )}
            {title && <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
