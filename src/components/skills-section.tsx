import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
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
} from "lucide-react";

const skillsData = [
  {
    category: "LANGUAGES",
    skills: [
      { name: "JavaScript", level: "EXPERT", progress: 92, icon: Code },
      { name: "TypeScript", level: "EXPERT", progress: 90, icon: Code },
      { name: "Python", level: "ADVANCED", progress: 84, icon: Code },
      { name: "Java", level: "ADVANCED", progress: 86, icon: Code },
      { name: "C#", level: "ADVANCED", progress: 80, icon: Code },
      { name: "SQL", level: "ADVANCED", progress: 85, icon: Database },
      { name: "NoSQL", level: "ADVANCED", progress: 85, icon: Database },
      { name: "Bash / Shell", level: "ADVANCED", progress: 80, icon: Terminal },
    ],
  },
  {
    category: "FRONT END",
    skills: [
      { name: "React.js", progress: 95, icon: Code },
      { name: "Angular", progress: 88, icon: Building },
      { name: "HTML/CSS", progress: 94, icon: Palette },
      { name: "Bootstrap", progress: 94, icon: Boxes },
      { name: "Tailwind CSS", progress: 94, icon: Zap },
      { name: "Angular Material UI", progress: 82, icon: Boxes },
    ],
  },
  {
    category: "BACK END",
    skills: [
      { name: "Node.js", progress: 88, icon: Server },
      { name: "Express.js", progress: 86, icon: Server },
      { name: "NestJS", progress: 85, icon: Building },
      { name: "Spring Boot", progress: 84, icon: Code },
      { name: "Django", progress: 80, icon: Code },
      { name: "Laravel", progress: 80, icon: Code },
      { name: "ASP.NET Core", progress: 78, icon: Code },
      { name: "GraphQL", progress: 85, icon: Zap },
      { name: "REST APIs", progress: 92, icon: GitBranch },
      { name: "MongoDB", progress: 88, icon: Database },
      { name: "MySQL", progress: 85, icon: Database },
    ],
  },
  {
    category: "A.I",
    skills: [
      { name: "LLM Integration", level: "ADVANCED", progress: 85, icon: Cpu },
      { name: "Voice Recognition", level: "ADVANCED", progress: 82, icon: Mic },
      { name: "Prompt Engineering", level: "EXPERT", progress: 88, icon: Code },
      {
        name: "Vector Databases",
        level: "ADVANCED",
        progress: 80,
        icon: Database,
      },
      { name: "AI Agents", level: "ADVANCED", progress: 78, icon: Zap },
      {
        name: "Chatbot Integration",
        level: "INTERMEDIATE",
        progress: 73,
        icon: MessageSquare,
      },
      { name: "ML Basics", level: "INTERMEDIATE", progress: 72, icon: Cpu },
    ],
  },
  {
    category: "UI/UX DESIGN",
    skills: [
      { name: "Figma", level: "EXPERT", progress: 92, icon: Palette },
      { name: "Balsamiq", level: "ADVANCED", progress: 85, icon: PenTool },
      { name: "Design Systems", level: "EXPERT", progress: 90, icon: Boxes },
      {
        name: "Prototyping",
        level: "ADVANCED",
        progress: 90,
        icon: MousePointer,
      },
      { name: "Wireframing", level: "ADVANCED", progress: 88, icon: PenTool },
      {
        name: "Design Thinking",
        level: "ADVANCED",
        progress: 85,
        icon: Lightbulb,
      },
      { name: "Accessibility", level: "ADVANCED", progress: 86, icon: Zap },
      { name: "User Research", level: "ADVANCED", progress: 82, icon: Users },
      {
        name: "Tally (Forms & Surveys)",
        level: "ADVANCED",
        progress: 80,
        icon: ClipboardList,
      },
    ],
  },
  {
    category:
      "PROJECT management & COMMUNICATION TOOLS & METHODOLOGIES & concepts",
    skills: [
      { name: "Jira", level: "ADVANCED", progress: 88, icon: GitBranch },
      { name: "Trello", level: "ADVANCED", progress: 84, icon: Boxes },
      { name: "Draw.io", level: "ADVANCED", progress: 86, icon: Palette },
      { name: "Notion", level: "ADVANCED", progress: 85, icon: Building },
      { name: "Slack", level: "ADVANCED", progress: 82, icon: GitCommit },
      { name: "SCRUM", level: "INTERMEDIATE", progress: 78, icon: Clock },
      { name: "UML", level: "INTERMEDIATE", progress: 78, icon: Clock },
      {
        name: "Google Meets ",
        level: "ADVANCED",
        progress: 88,
        icon: Workflow,
      },
      { name: "GitHub ", level: "ADVANCED", progress: 88, icon: Workflow },
    ],
  },
  {
    category: "DEVOPS PIPELINE",
    skills: [
      {
        name: "GitHub Actions",
        level: "EXPERT",
        progress: 90,
        icon: GitCommit,
      },
      { name: "CI/CD", level: "EXPERT", progress: 88, icon: Workflow },
      { name: "Docker", level: "ADVANCED", progress: 85, icon: Container },
      { name: "SonarQube", level: "ADVANCED", progress: 82, icon: ShieldCheck },
      { name: "Nginx", level: "ADVANCED", progress: 83, icon: Server },
      { name: "Kubernetes", level: "ADVANCED", progress: 80, icon: Network },
      {
        name: "Grafana & Prometheus",
        level: "ADVANCED",
        progress: 80,
        icon: BarChart2,
      },
      { name: "Jenkins", level: "ADVANCED", progress: 78, icon: Settings },
      { name: "Nexus", level: "ADVANCED", progress: 78, icon: Archive },
      {
        name: "Azure DevOps",
        level: "ADVANCED",
        progress: 80,
        icon: GitPullRequest,
      },
      { name: "Vercel", level: "ADVANCED", progress: 85, icon: Triangle },
      { name: "Render", level: "ADVANCED", progress: 82, icon: Cloud },
    ],
  },
];

interface SkillItemProps {
  name: string;
  level: string;
  progress: number;
  icon: React.ComponentType<{ className: string }>;
  index: number;
  isInView: boolean;
}

function SkillItem({
  name,
  level,
  progress,
  icon: Icon,
  index,
  isInView,
}: SkillItemProps) {
  return (
    <div
      className={cn(
        "group rounded-3xl border border-slate-700/50 bg-slate-950/80 p-6 transition-all duration-700 hover:border-slate-600/70 hover:bg-slate-900/90",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <Icon className="h-8 w-8 text-slate-400 group-hover:text-primary/60 transition-colors" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-3">{name}</h3>

      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
        {level}
      </p>

      <div className="h-1.5 w-full rounded-full overflow-hidden bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-purple-500 to-amber-500 transition-all duration-1000 ease-out"
          style={{
            width: isInView ? `${progress}%` : "0%",
            transitionDelay: `${index * 80 + 200}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string>("FRONT END");

  const currentSkills =
    skillsData.find((s) => s.category === activeCategory)?.skills || [];

  return (
    <section id="skills" className="py-32 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative" ref={ref}>
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            <span className="gradient-text">SKILLS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical proficiency across
            different domains.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {skillsData.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300",
                activeCategory === category.category
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50"
                  : "border border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-700 dark:border-slate-700/50 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-300",
              )}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSkills.map((skill, index) => (
            <SkillItem
              key={skill.name}
              {...skill}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

