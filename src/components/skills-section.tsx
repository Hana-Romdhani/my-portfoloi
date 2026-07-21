import { useState } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import {
  Cpu,
  Code,
  Database,
  Zap,
  Palette,
  Building,
  Boxes,
  GitBranch,
  Server,
  Clock,
  Container,
  GitCommit,
  Workflow,
  MessageSquare,
  Mic,
  Users,
  ClipboardList,
  Lightbulb,
  PenTool,
  MousePointer,
  Cloud,
  ShieldCheck,
  Network,
  BarChart2,
  Settings,
  Archive,
  GitPullRequest,
  Triangle,
  Terminal,
} from 'lucide-react';

const skillsData = [
  {
    category: 'LANGUAGES',
    color: 'from-primary/10 to-primary/5',
    iconBg: 'bg-primary/10 text-primary',
    skills: [
      { name: 'JavaScript', icon: Code },
      { name: 'TypeScript', icon: Code },
      { name: 'Python', icon: Code },
      { name: 'Java', icon: Code },
      { name: 'C#', icon: Code },
      { name: 'SQL', icon: Database },
      { name: 'NoSQL', icon: Database },
      { name: 'Bash / Shell', icon: Terminal },
    ],
  },
  {
    category: 'FRONT END',
    color: 'from-secondary/10 to-secondary/5',
    iconBg: 'bg-secondary/10 text-secondary',
    skills: [
      { name: 'React.js', icon: Code },
      { name: 'Angular', icon: Building },
      { name: 'HTML/CSS', icon: Palette },
      { name: 'Bootstrap', icon: Boxes },
      { name: 'Tailwind CSS', icon: Zap },
      { name: 'Angular Material UI', icon: Boxes },
    ],
  },
  {
    category: 'BACK END',
    color: 'from-accent/10 to-accent/5',
    iconBg: 'bg-accent/10 text-accent-foreground',
    skills: [
      { name: 'Node.js', icon: Server },
      { name: 'Express.js', icon: Server },
      { name: 'NestJS', icon: Building },
      { name: 'Spring Boot', icon: Code },
      { name: 'Django', icon: Code },
      { name: 'Laravel', icon: Code },
      { name: 'ASP.NET Core', icon: Code },
      { name: 'GraphQL', icon: Zap },
      { name: 'REST APIs', icon: GitBranch },
      { name: 'MongoDB', icon: Database },
      { name: 'MySQL', icon: Database },
    ],
  },
  {
    category: 'A.I',
    color: 'from-primary/10 to-secondary/5',
    iconBg: 'bg-primary/10 text-primary',
    skills: [
      { name: 'LLM Integration', icon: Cpu },
      { name: 'Voice Recognition', icon: Mic },
      { name: 'Prompt Engineering', icon: Code },
      { name: 'Vector Databases', icon: Database },
      { name: 'AI Agents', icon: Zap },
      { name: 'Chatbot Integration', icon: MessageSquare },
      { name: 'ML Basics', icon: Cpu },
    ],
  },
  {
    category: 'UI/UX DESIGN',
    color: 'from-accent/10 to-primary/5',
    iconBg: 'bg-accent/10 text-accent-foreground',
    skills: [
      { name: 'Figma', icon: Palette },
      { name: 'Balsamiq', icon: PenTool },
      { name: 'Design Systems', icon: Boxes },
      { name: 'Prototyping', icon: MousePointer },
      { name: 'Wireframing', icon: PenTool },
      { name: 'Design Thinking', icon: Lightbulb },
      { name: 'Accessibility', icon: Zap },
      { name: 'User Research', icon: Users },
      { name: 'Tally (Forms & Surveys)', icon: ClipboardList },
    ],
  },
  {
    category: 'PROJECT MANAGEMENT',
    color: 'from-secondary/10 to-accent/5',
    iconBg: 'bg-secondary/10 text-secondary',
    skills: [
      { name: 'Jira', icon: GitBranch },
      { name: 'Trello', icon: Boxes },
      { name: 'Draw.io', icon: Palette },
      { name: 'Notion', icon: Building },
      { name: 'Slack', icon: GitCommit },
      { name: 'SCRUM', icon: Clock },
      { name: 'UML', icon: Clock },
      { name: 'Google Meets', icon: Workflow },
      { name: 'GitHub', icon: Workflow },
    ],
  },
  {
    category: 'DEVOPS PIPELINE',
    color: 'from-primary/10 to-secondary/5',
    iconBg: 'bg-primary/10 text-primary',
    skills: [
      { name: 'GitHub Actions', icon: GitCommit },
      { name: 'CI/CD', icon: Workflow },
      { name: 'Docker', icon: Container },
      { name: 'SonarQube', icon: ShieldCheck },
      { name: 'Nginx', icon: Server },
      { name: 'Kubernetes', icon: Network },
      { name: 'Grafana & Prometheus', icon: BarChart2 },
      { name: 'Jenkins', icon: Settings },
      { name: 'Nexus', icon: Archive },
      { name: 'Azure DevOps', icon: GitPullRequest },
      { name: 'Vercel', icon: Triangle },
      { name: 'Render', icon: Cloud },
    ],
  },
];

interface SkillItemProps {
  name: string;
  icon: React.ComponentType<{ className: string }>;
  iconBg: string;
  index: number;
  isInView: boolean;
}

function SkillItem({ name, icon: Icon, iconBg, index, isInView }: SkillItemProps) {
  return (
    <div
      className={cn(
        'group transition-all duration-500',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      )}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="glass-card rounded-xl p-4 h-full flex items-center gap-3 card-hover cursor-default">
        <div className={cn('flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center', iconBg)}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-foreground leading-tight">
          {name}
        </span>
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string>('FRONT END');

  const currentCategory = skillsData.find((s) => s.category === activeCategory);
  const currentSkills = currentCategory?.skills || [];
  const currentIconBg = currentCategory?.iconBg || 'bg-primary/10 text-primary';

  return (
    <section id="skills" className="py-28 sm:py-32 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative" ref={ref}>
        <div
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            A comprehensive overview of my technical proficiency across
            different domains.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {skillsData.map((category) => {
            const isActive = activeCategory === category.category;
            return (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={cn(
                  'px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-transparent hover:border-border',
                )}
              >
                {category.category}
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {currentSkills.map((skill, index) => (
            <SkillItem
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              iconBg={currentIconBg}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
