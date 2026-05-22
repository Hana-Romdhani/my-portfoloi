import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 92 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 94 },
      { name: 'Vue.js', level: 75 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 82 },
      { name: 'GraphQL', level: 85 },
      { name: 'REST APIs', level: 92 },
      { name: 'Express', level: 88 },
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 88 },
      { name: 'Redis', level: 78 },
      { name: 'Prisma', level: 86 },
      { name: 'Firebase', level: 80 },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Git', level: 92 },
      { name: 'Docker', level: 82 },
      { name: 'AWS', level: 78 },
      { name: 'CI/CD', level: 85 },
      { name: 'Vercel', level: 90 },
    ],
  },
]

function RadialProgress({ value, size = 120, strokeWidth = 8 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-muted/30"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-1000 ease-out"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function SkillCard({
  category,
  index,
  isInView,
}: {
  category: typeof skillCategories[0]
  index: number
  isInView: boolean
}) {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl p-6 transition-all duration-700 hover:border-primary/30',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="text-xl font-semibold mb-6 text-foreground gradient-text">{category.title}</h3>
      <div className="space-y-4">
        {category.skills.map((skill, skillIndex) => (
          <div key={skill.name} className="flex items-center justify-between gap-4">
            <span className="text-foreground/80 text-sm font-medium min-w-[100px]">{skill.name}</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-1000 ease-out"
                style={{
                  width: isInView ? `${skill.level}%` : '0%',
                  transitionDelay: `${index * 100 + skillIndex * 100 + 300}ms`,
                }}
              />
            </div>
            <span className="text-muted-foreground text-xs w-10 text-right">{skill.level}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)
  const avgLevel = Math.round(
    skillCategories.reduce(
      (acc, cat) => acc + cat.skills.reduce((sum, skill) => sum + skill.level, 0),
      0
    ) / totalSkills
  )

  return (
    <section id="skills" className="py-32 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative" ref={ref}>
        <div className={cn(
          'text-center mb-16 transition-all duration-700',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <p className="text-primary font-medium mb-4">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical proficiency across different domains.
          </p>
        </div>

        <div className={cn(
          'flex flex-wrap justify-center gap-12 mb-16 transition-all duration-700 delay-200',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <RadialProgress value={isInView ? avgLevel : 0} />
              <span className="absolute text-2xl font-bold text-foreground">{avgLevel}%</span>
            </div>
            <p className="mt-4 text-muted-foreground">Average Proficiency</p>
          </div>
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <RadialProgress value={isInView ? 85 : 0} />
              <span className="absolute text-2xl font-bold text-foreground">{totalSkills}</span>
            </div>
            <p className="mt-4 text-muted-foreground">Technologies</p>
          </div>
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <RadialProgress value={isInView ? 95 : 0} />
              <span className="absolute text-2xl font-bold text-foreground">5+</span>
            </div>
            <p className="mt-4 text-muted-foreground">Years Experience</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}