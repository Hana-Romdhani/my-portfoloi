import { Briefcase, GraduationCap } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

const experiences = [
  {
    type: 'work',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Innovation',
    period: '2023 — Present',
    description: 'Leading the development of cloud-native applications, mentoring junior developers, and architecting scalable solutions for enterprise clients.',
    technologies: ['Next.js', 'TypeScript', 'AWS', 'PostgreSQL'],
  },
  {
    type: 'work',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    period: '2021 — 2023',
    description: 'Built and maintained multiple web applications, implemented CI/CD pipelines, and collaborated with cross-functional teams to deliver products on time.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Docker'],
  },
  {
    type: 'work',
    title: 'Frontend Developer',
    company: 'DigitalAgency Co.',
    period: '2019 — 2021',
    description: 'Developed responsive web interfaces for diverse clients, optimized performance, and ensured accessibility compliance across all projects.',
    technologies: ['React', 'Vue.js', 'SCSS', 'JavaScript'],
  },
  {
    type: 'education',
    title: 'B.S. in Computer Science',
    company: 'State University',
    period: '2015 — 2019',
    description: 'Graduated with honors. Focused on software engineering, algorithms, and human-computer interaction. Led the coding club.',
    technologies: ['Java', 'Python', 'C++', 'Data Structures'],
  },
]

function TimelineItem({
  experience,
  index,
  isInView,
}: {
  experience: typeof experiences[0]
  index: number
  isInView: boolean
}) {
  const isLeft = index % 2 === 0

  return (
    <div
      className={cn(
        'relative flex items-center justify-center md:justify-between transition-all duration-700',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={cn(
        'hidden md:block w-5/12',
        isLeft ? 'text-right pr-8' : 'order-3 text-left pl-8'
      )}>
        {isLeft && (
          <TimelineContent experience={experience} align="right" />
        )}
        {!isLeft && (
          <TimelineContent experience={experience} align="left" />
        )}
      </div>

      <div className="relative flex flex-col items-center">
        <div className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500',
          'bg-gradient-to-br from-primary to-secondary glow-primary'
        )}>
          {experience.type === 'work' ? (
            <Briefcase size={20} className="text-primary-foreground" />
          ) : (
            <GraduationCap size={20} className="text-primary-foreground" />
          )}
        </div>
      </div>

      <div className={cn(
        'hidden md:block w-5/12',
        isLeft ? 'order-3 text-left pl-8' : 'text-right pr-8'
      )}>
        {isLeft && (
          <div className="opacity-0">placeholder</div>
        )}
        {!isLeft && (
          <div className="opacity-0">placeholder</div>
        )}
      </div>

      <div className="md:hidden absolute left-16 right-4 top-0">
        <TimelineContent experience={experience} align="left" />
      </div>
    </div>
  )
}

function TimelineContent({
  experience,
  align,
}: {
  experience: typeof experiences[0]
  align: 'left' | 'right'
}) {
  return (
    <div className={cn(
      'glass-card p-6 rounded-xl transition-all duration-300 hover:border-primary/30',
      align === 'right' ? 'text-right' : 'text-left'
    )}>
      <span className="text-sm text-primary font-medium">{experience.period}</span>
      <h3 className="text-xl font-semibold text-foreground mt-1">{experience.title}</h3>
      <p className="text-secondary font-medium mt-1">{experience.company}</p>
      <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
        {experience.description}
      </p>
      <div className={cn(
        'flex flex-wrap gap-2 mt-4',
        align === 'right' ? 'justify-end' : 'justify-start'
      )}>
        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ExperienceSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={cn(
          'text-center mb-20 transition-all duration-700',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <p className="text-primary font-medium mb-4">Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            My <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional journey and the milestones that shaped my career.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24 pl-16 md:pl-0">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={`${experience.title}-${index}`}
                experience={experience}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}