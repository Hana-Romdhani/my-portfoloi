import { useTranslation } from 'react-i18next';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import { CardGrid, ProjectCard } from '@/components/ui/primitives';

const projectKeys = ['cloudsync', 'aistudio', 'fintrack', 'ecolife', 'devconnect', 'smarthome'];
const projectImages: Record<string, { image: string; tags: string[]; github: string; demo: string; caseStudy: string; featured: boolean }> = {
  cloudsync: {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebSocket'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: true,
  },
  aistudio: {
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    tags: ['React', 'Python', 'TensorFlow', 'AWS'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: true,
  },
  fintrack: {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: false,
  },
  ecolife: {
    image: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=800&h=600&fit=crop',
    tags: ['Flutter', 'Firebase', 'Dart', 'Google Maps'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: false,
  },
  devconnect: {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    tags: ['Next.js', 'GraphQL', 'Prisma', 'Redis'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: false,
  },
  smarthome: {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'MQTT', 'Raspberry Pi'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: false,
  },
};

export function ProjectsSection() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const projects = projectKeys.map((key) => ({
    title: t(`projects.items.${key}.title`),
    description: t(`projects.items.${key}.description`),
    ...projectImages[key],
  }));

  return (
    <section id="projects" className="py-28 sm:py-32 relative">
      <div className="section-container" ref={ref}>
        <div
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            {t('projects.label')}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            <span className="gradient-text">{t('projects.title')}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            {t('projects.subtitle')}
          </p>
        </div>

        <CardGrid className="max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </CardGrid>
      </div>
    </section>
  );
}
