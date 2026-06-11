import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { Sparkles, Heart } from "lucide-react";

// const techBadges = [
//   "React",
//   "TypeScript",
//   "Node.js",
//   "NestJS",
//   "MongoDB",
//   "MySQL",
//   "jenkins",
//   "AWS",
//   "Docker",
//   "GraphQL",
//   "REST APIs",
//   "Redis",
//   "Tailwind CSS",
//   "Git",
//   "GitHub Actions",
//   "SonarQube",
//   "Nginx",
//   "LLaMA 3.1",
//   "OpenAI API",
//   "WebSockets",
//   "OAuth",
//   "Firebase",
//   "IA assistant development",
// ];

export function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div
          className={cn(
            "max-w-3xl mx-auto text-center transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <p className="text-primary font-medium mb-4">About Me</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance gradient-text">
            Full-stack engineer | AI Integrator  | DevOps Enthusiast
          </h2>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              I'm{" "}
              <span className="text-foreground font-medium">Hana Romdhani</span>
              , a software engineer specialized in web and internet
              technologies, graduated with honors from  <a href="https://www.esprit.tn" target="_blank" rel="noopener noreferrer"  className="text-primary underline">ESPRIT</a> in January 2026.
            </p>
            <p>
              Through my academic journey and internships, I developed an
              engineering mindset that drives me to build scalable
              architectures, solve problems efficiently, and stay focused on
              quality — while collaborating closely with teams to reach shared
              goals.
            </p>
            <p>
              My standout project is XPlanB — a collaborative document-sharing
              and well-being platform I took from zero to production during my
              internship at TSE Consulting. It features real-time collaboration,
              an AI assistant powered by LLaMA 3.1, productivity analytics, and
              focus-session tooling, all deployed with a complete DevOps
              pipeline using React, NestJS, MongoDB, Docker, GitHub Actions,
              Nginx, and SonarQube.
            </p>
            <p>
              Currently open to full-time full-stack or software engineering
              roles where the bar is high and the work is real.
            </p>
          </div>

          {/* <div className="mt-10">
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Technologies I work with
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {techBadges.map((tech, index) => (
                <span
                  key={tech}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-full glass border border-primary/20 text-foreground/80 transition-all duration-500 hover:border-primary/50 hover:text-primary",
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4",
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

