import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import { CardGrid, ProjectCard } from '@/components/ui/primitives';

const projects = [
  {
    title: 'CloudSync Pro',
    description:
      'A real-time collaborative workspace platform with advanced file syncing, version control, and team management features.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebSocket'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: true,
  },
  {
    title: 'AI Content Studio',
    description:
      'An intelligent content creation platform powered by machine learning for generating, editing, and optimizing digital content.',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    tags: ['React', 'Python', 'TensorFlow', 'AWS'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: true,
  },
  {
    title: 'FinTrack Dashboard',
    description:
      'A comprehensive financial tracking dashboard with real-time analytics, budget planning, and investment insights.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: false,
  },
  {
    title: 'EcoLife Mobile',
    description:
      'A sustainability-focused mobile app helping users track and reduce their carbon footprint through gamification.',
    image:
      'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=800&h=600&fit=crop',
    tags: ['Flutter', 'Firebase', 'Dart', 'Google Maps'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: false,
  },
  {
    title: 'DevConnect Hub',
    description:
      'A professional networking platform designed specifically for developers with code collaboration and mentorship features.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    tags: ['Next.js', 'GraphQL', 'Prisma', 'Redis'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: false,
  },
  {
    title: 'SmartHome Control',
    description:
      'An IoT dashboard for managing smart home devices with automation rules, energy monitoring, and voice control.',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'MQTT', 'Raspberry Pi'],
    github: 'https://github.com',
    demo: 'https://example.com',
    caseStudy: 'https://example.com/case-study',
    featured: false,
  },
];

export function ProjectsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

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
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Things I&apos;ve built
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
