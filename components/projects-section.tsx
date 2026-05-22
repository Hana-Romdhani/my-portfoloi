"use client"

import { ExternalLink, Github } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "CloudSync Pro",
    description: "A real-time collaborative workspace platform with advanced file syncing, version control, and team management features.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSocket"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    title: "AI Content Studio",
    description: "An intelligent content creation platform powered by machine learning for generating, editing, and optimizing digital content.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    tags: ["React", "Python", "TensorFlow", "AWS"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    title: "FinTrack Dashboard",
    description: "A comprehensive financial tracking dashboard with real-time analytics, budget planning, and investment insights.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Chart.js"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: false,
  },
  {
    title: "EcoLife Mobile",
    description: "A sustainability-focused mobile app helping users track and reduce their carbon footprint through gamification.",
    image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=800&h=600&fit=crop",
    tags: ["Flutter", "Firebase", "Dart", "Google Maps"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: false,
  },
  {
    title: "DevConnect Hub",
    description: "A professional networking platform designed specifically for developers with code collaboration and mentorship features.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    tags: ["Next.js", "GraphQL", "Prisma", "Redis"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: false,
  },
  {
    title: "SmartHome Control",
    description: "An IoT dashboard for managing smart home devices with automation rules, energy monitoring, and voice control.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "MQTT", "Raspberry Pi"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: false,
  },
]

function ProjectCard({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) {
  return (
    <div
      className={cn(
        "group relative glass-card rounded-2xl overflow-hidden transition-all duration-700",
        project.featured ? "md:col-span-2 md:row-span-2" : "",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Hover overlay with links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="View GitHub repository"
          >
            <Github size={20} />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="View live demo"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl" />
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <p className="text-primary font-medium mb-4">My Work</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills in full-stack development,
            from concept to deployment.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
