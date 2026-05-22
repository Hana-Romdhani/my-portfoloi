import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { Sparkles, Heart } from "lucide-react";

const techBadges = [
  "React",
  "TypeScript",
  "Node.js",
  "NestJS",
  "MongoDB",
  "MySQL",
  "jenkins",
  "AWS",
  "Docker",
  "GraphQL",
  "REST APIs",
  "Redis",
  "Tailwind CSS",
  "Git",
  "GitHub Actions",
  "SonarQube",
  "Nginx",
  "LLaMA 3.1",
  "OpenAI API",
  "WebSockets",
  "OAuth",
  "Firebase",
  "IA assistant development",
];

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
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance">
            Passionate about turning{" "}
            <span className="gradient-text">ideas into impact</span> from
            concept to deployment
          </h2>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              I'm{" "}
              <span className="text-foreground font-medium">Hana Romdhani</span>
              , a full-stack engineer with a genuine love for building things
              that work and work well. I started with a Bachelor's degree in
              Information Systems Development from ISET in 2021, then pushed
              further with an Engineering degree in IT, specialized in Software
              Engineering, from ESPRIT, graduating in January 2026 with honors
              and a grade of{" "}
              <span className="text-foreground font-medium">16/20</span>.
            </p>
            <p>
              Along the way, I didn't just study software{" "}
              <Sparkles className="inline-block w-4 h-4 mb-1 text-foreground" />{" "}
              I built it. Through internships and hands-on projects, I got to
              touch every part of the process: designing interfaces people
              actually enjoy using, architecting backends that hold up, and
              shipping with CI/CD pipelines that make deployment feel
              effortless.
            </p>
            <p>
              My final-year project is the one I'm most proud of{" "}
              <Heart className="inline-block w-4 h-4 mb-1 text-foreground" />{" "}
              <span className="text-foreground font-medium">XPlanB</span>, a
              collaborative document-sharing and personal well-being platform
              built during my internship at TSE Consulting. I took it from a
              blank page to a fully deployed product: real-time collaboration,
              an AI assistant powered by LLaMA 3.1, productivity tracking, focus
              sessions, all tied together with a complete CI/CD pipeline using
              GitHub Actions, Docker, SonarQube, and Nginx.
            </p>
            <p>
              My go-to stack is{" "}
              <span className="text-foreground font-medium">
                React, NestJS, MongoDB, and Docker
              </span>
              , but what I care about most is the thinking behind the code{" "}
              <Sparkles className="inline-block w-4 h-4 mb-1 text-foreground" />{" "}
              building software that solves real problems, not just software
              that runs.
            </p>
            <p>
              I'm currently looking for a full-time role where I can keep
              growing, keep building, and be part of a team that genuinely cares
              about what they ship.
            </p>
          </div>

          <div className="mt-10">
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
          </div>
        </div>
      </div>
    </section>
  );
}

