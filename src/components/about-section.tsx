import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import image_side from "../assets/img/sideimage.jpg";

export function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div
          className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-0 lg:gap-2 items-start">
            {" "}
          <div className="relative mx-auto w-full max-w-[480px]">
  
  {/* Bordure extérieure décorative - vide avec gradient */}
  <div className="absolute inset-0 rounded-[32px] border border-transparent"
    style={{
      background: "linear-gradient(#0f172a, #0f172a) padding-box, linear-gradient(135deg, #7C3AED, #3b82f6, #7C3AED) border-box",
      borderWidth: "1px",
    }}
  />

  {/* Carte principale */}
  <div className="relative rounded-[32px] border border-slate-700/40 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl md:p-8">
    

    {/* Image */}
    <div className="overflow-hidden rounded-3xl border border-slate-700/70 shadow-lg">
      <img
        src={image_side}
        alt="About Me"
        className="w-full object-cover md:h-[520px]"
      />
    </div>

    {/* Overlay texte bas */}
    <div className="absolute bottom-10 left-10 z-10">
      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-400">
        Full-stack engineer
      </p>
      <h2 className="text-2xl font-bold text-white">Hana Romdhani</h2>
    </div>

  </div>
</div>
            <div className="space-y-8 text-left">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-foreground sm:text-5xl gradient-text">
                  About Me
                </h1>
                <p className="text-xl md:text-xl font-semibold text-foreground/90 gradient-text">
                  Full-stack engineer | AI Integrator | DevOps Enthusiast
                </p>
              </div>

              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  I'm{" "}
                  <span className="text-foreground font-medium">
                    Hana Romdhani
                  </span>
                  , a software engineer specialized in web and internet
                  technologies, graduated with honors from{" "}
                  <a
                    href="https://www.esprit.tn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    ESPRIT
                  </a>{" "}
                  in January 2026.
                </p>
                <p>
                  Through my academic journey and internships, I developed an
                  engineering mindset that drives me to build scalable
                  architectures, solve problems efficiently, and stay focused on
                  quality — while collaborating closely with teams to reach
                  shared goals.
                </p>
                <p>
                  My standout project is XPlanB — a collaborative
                  document-sharing and well-being platform I took from zero to
                  production during my internship at TSE Consulting. It features
                  real-time collaboration, an AI assistant powered by LLaMA 3.1,
                  productivity analytics, and focus-session tooling, all
                  deployed with a complete DevOps pipeline using React, NestJS,
                  MongoDB, Docker, GitHub Actions, Nginx, and SonarQube.
                </p>
                <p>
                  Currently open to full-time full-stack or software engineering
                  roles where the bar is high and the work is real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

