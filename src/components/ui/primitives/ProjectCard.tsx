import { Book, ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  caseStudy?: string;
  featured?: boolean;
}

export function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) {
  return (
    <div
      className={cn(
        'group relative glass-card rounded-xl overflow-hidden transition-all duration-500 h-full',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Hover overlay actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-card/90 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
              aria-label="View GitHub repository"
            >
              <Github size={18} />
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-card/90 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
              aria-label="View live demo"
            >
              <ExternalLink size={18} />
            </a>
          ) : null}
          {project.caseStudy ? (
            <a
              href={project.caseStudy}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-card/90 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
              aria-label="Case Study"
            >
              <Book size={18} />
            </a>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold mb-1.5 text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
