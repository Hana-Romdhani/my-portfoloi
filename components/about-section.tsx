import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const technologies = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 88 },
  { name: "Next.js", level: 92 },
  { name: "MongoDB", level: 85 },
  { name: "PostgreSQL", level: 82 },
  { name: "Flutter", level: 78 },
  { name: "AWS", level: 80 },
]

const techBadges = [
  "React", "TypeScript", "Node.js", "Next.js", "MongoDB",
  "PostgreSQL", "Flutter", "AWS", "Docker", "GraphQL",
  "Redis", "Tailwind CSS", "Prisma", "Firebase"
]

export function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <div className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <p className="text-primary font-medium mb-4">About Me</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance">
              Passionate about creating{" "}
              <span className="gradient-text">impactful</span> digital experiences
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a developer who thrives at the intersection of design and technology.
                With over 5 years of experience building web applications, I specialize in
                creating intuitive interfaces that users love.
              </p>
              <p>
                Currently, I&apos;m focused on building accessible, human-centered products
                at innovative startups. I believe great software comes from understanding
                both the technical challenges and the human needs behind them.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                contributing to open source, or sharing knowledge through technical writing.
              </p>
            </div>

            {/* Tech badges */}
            <div className="mt-10">
              <p className="text-sm text-muted-foreground mb-4">Technologies I work with</p>
              <div className="flex flex-wrap gap-2">
                {techBadges.map((tech, index) => (
                  <span
                    key={tech}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full glass border border-primary/20 text-foreground/80 transition-all duration-500 hover:border-primary/50 hover:text-primary",
                      isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Skills visualization */}
          <div className={cn(
            "transition-all duration-700 delay-300",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-8 text-foreground">Core Skills</h3>
              <div className="space-y-6">
                {technologies.map((tech, index) => (
                  <div key={tech.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground/90 font-medium">{tech.name}</span>
                      <span className="text-muted-foreground text-sm">{tech.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out",
                          isInView ? "opacity-100" : "opacity-0"
                        )}
                        style={{
                          width: isInView ? `${tech.level}%` : "0%",
                          transitionDelay: `${index * 100 + 500}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
