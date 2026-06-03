import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GridBackground from "@/utils/GridBackground";

const codeSnippet = [
  {
    num: 1,
    parts: [
      { t: "keyword", v: "const " },
      { t: "var", v: "app" },
      { t: "op", v: " = " },
      { t: "fn", v: "createApp" },
      { t: "plain", v: "({" },
    ],
  },
  {
    num: 2,
    parts: [
      { t: "plain", v: "  stack: [" },
      { t: "str", v: "'Next.js'" },
      { t: "plain", v: ", " },
      { t: "str", v: "'TypeScript'" },
      { t: "plain", v: "]," },
    ],
  },
  {
    num: 3,
    parts: [
      { t: "plain", v: "  database: " },
      { t: "str", v: "'PostgreSQL'" },
      { t: "plain", v: "," },
    ],
  },
  {
    num: 4,
    parts: [
      { t: "plain", v: "  deploy: " },
      { t: "str", v: "'Vercel'" },
      { t: "plain", v: "," },
    ],
  },
  {
    num: 5,
    parts: [
      { t: "plain", v: "  client: " },
      { t: "str", v: "'votre-entreprise'" },
    ],
  },
  { num: 6, parts: [{ t: "plain", v: "});" }] },
];

const typeStyle: Record<string, string> = {
  keyword: "text-foreground/70",
  var: "text-foreground",
  op: "text-foreground/60",
  fn: "text-accent",
  str: "text-accent",
  plain: "text-foreground/60",
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-white pt-16 pb-0">
      <GridBackground />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div className="animate-fade-up w-full">
            <h1 className="mb-7 font-playfair text-5xl leading-[1.08] font-medium tracking-tight text-foreground sm:text-6xl lg:text-[4rem]">
              Votre activité mérite un site à la hauteur de vos ambitions
            </h1>

            <p className="mb-10 max-w-md font-inter text-base leading-relaxed text-muted-foreground">
              Nous concevons des solutions web sur mesure qui transforment vos
              visiteurs en clients. Sites vitrines, applications métier,
              systèmes de réservation — tout est pensé pour votre ROI.
            </p>
            <Link
              href="/contact"
              className="flex flex-row justify-center items-center gap-2 rounded-lg border bg-accent w-full py-3 font-inter text-sm font-medium text-white transition-colors hover:bg-white hover:border-accent hover:text-accent hover:gap-1.5"
            >
              Démarrer un projet
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="hidden animate-fade-left lg:block">
            <div className="rounded border border-[#E8E8E8] bg-white shadow-[0_2px_24px_0_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-1.5 border-b border-[#E8E8E8] px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-3 font-inter text-xs text-muted-foreground">
                  projet.config.ts
                </span>
              </div>

              <div className="p-5">
                <pre className="font-mono text-sm leading-7">
                  {codeSnippet.map((line) => (
                    <div key={line.num} className="flex">
                      <span className="mr-5 w-5 select-none text-right text-xs leading-7 text-[#C8C8C8]">
                        {line.num}
                      </span>

                      <span>
                        {line.parts.map((p, i) => (
                          <span key={i} className={typeStyle[p.t]}>
                            {p.v}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>

                <div className="mt-4 flex items-center gap-2 border-t border-[#E8E8E8] pt-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                  <span className="font-inter text-xs text-muted-foreground">
                    Build réussi — déploiement en cours...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid animate-fade-up-delayed grid-cols-3 gap-0 border-t border-[#E8E8E8] pt-8 lg:mt-24">
          {[
            { value: "50+", label: "Projets livrés" },
            { value: "98%", label: "Satisfaction" },
            { value: "< 4 sem.", label: "Délai moyen" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`py-4 text-center ${i < 2 ? "border-r border-[#E8E8E8]" : ""}`}
            >
              <div className="mb-1.5 font-playfair text-4xl leading-none font-medium text-accent sm:text-5xl">
                {stat.value}
              </div>
              <div className="font-inter text-xs text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
