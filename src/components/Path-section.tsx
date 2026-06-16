import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const education = [
  {
    type: "education",
    title: "Bachelor of Software Engineering",
    company: "ESPRIT - Private Higher School of Engineering and Technology",
    location: "Z.I. Chotrana II, Pôle Technologique El Ghazela, 2083, Ariana, Tunisia",
    period: "2022 — 2025",
    description:
      "Graduated with honors. Specialized in full-stack development, AI integration, and DevOps. Led various technical projects and maintained strong academic performance.",
    technologies: [
      "web development",
      "AI integration",
      "Scalable Architectures [Microservices, Serverless,monolithic, Multi-Module ]",
      "Quality testing",
      "blockchain development",
      "Project management and teamwork",
    ],
    highlight: true,
  },
  {
    type: "work",
    title: "Project Manager & Full Stack Developer",
    company: "Ever Technologies",
    location: "Tunisia",
    period: "2024 — Present",
    description:
      "Leading development of business management platforms using modern tech stack. Managing team of developers and overseeing project delivery with focus on scalability and user experience.",
    technologies: ["Next.js", "React", "NestJS", "PostgreSQL", "AWS"],
    highlight: true,
  },
  {
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },{
    type: "work",
    title: "Full Stack Developer Intern",
    company: "TSE Consulting",
    location: "Tunisia",
    period: "2024 — 2025",
    description:
      "Developed XPlanB, a collaborative document-sharing and well-being platform from zero to production. Implemented real-time features, AI assistant with LLaMA 3.1, and complete DevOps pipeline.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "LLaMA 3.1",
    ],
    highlight: false,
  },
];

function TimelineCard({
  experience,
  index,
  isInView,
}: {
  experience: (typeof education)[0];
  index: number;
  isInView: boolean;
}) {
 const Icon = experience.type === "work" ? Briefcase : GraduationCap;

  return (
    <div
      className={cn(
        "relative transition-all duration-700",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center z-10 transition-all duration-500 border-2 flex-shrink-0",
              experience.type === "work"
                ? "bg-blue-500/20 border-blue-500/50 text-blue-500"
                : "bg-purple-500/20 border-purple-500/50 text-purple-500",
            )}
          >
            <Icon size={24} />
          </div>
          {index < education.length - 1 && (
            <div className="w-1 h-20 bg-gradient-to-b from-slate-500 to-slate-700 mt-2" />
          )}
        </div>

        <div className="flex-1 pb-8">
          <div
            className={cn(
              "rounded-3xl border p-6 transition-all duration-300 hover:border-slate-600 hover:shadow-lg",
              experience.highlight
                ? "border-slate-600/80 bg-slate-950/90 shadow-lg shadow-primary/20"
                : "border-slate-700/50 bg-slate-950/50",
            )}
          >
            <div className="flex flex-col gap-1 mb-3">
              <span
                className={cn(
                  "text-xs font-bold uppercase tracking-[0.2em]",
                  experience.type === "work"
                    ? "text-blue-400"
                    : "text-purple-400",
                )}
              >
                {experience.type === "work" ? "Experience" : "Education"}
              </span>
              <h3 className="text-2xl font-bold text-foreground">
                {experience.title}
              </h3>
              <p className="text-sm font-semibold text-slate-300">
                {experience.company}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="flex-shrink-0" />
                <span>{experience.period}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="flex-shrink-0" />
                <span>{experience.location}</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {experience.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-600/50 bg-slate-900/50 text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EducationSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(education.length / itemsPerPage);
  const paginatedEducation = education.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById("education");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="education" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
           My  <span className="gradient-text">Path</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my educational achievements and professional
            experience that shaped my career in software development.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {totalPages > 1 && (
            <div className="mb-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) goToPage(currentPage - 1);
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) goToPage(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {paginatedEducation.map((exp, index) => (
            <TimelineCard
              key={`${exp.title}-${index}`}
              experience={exp}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
