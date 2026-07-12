import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Globe,
  Building2,
} from "lucide-react";
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
    title:
      "National Engineering Degree in Computer Science (Diplôme National d'Ingénieur Informatique)",
    company: "ESPRIT - Private Higher School of Engineering and Technology",
    companyUrl: "https://www.esprit.tn/",
    companyLogo: "/src/assets/img/espritlogo.jpeg",
    location:
      "Z.I. Chotrana II, Pôle Technologique El Ghazela, 2083, Ariana, Tunisia",
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
    status: "remote",
    title: "Full Stack  Engineer Intern / End-of-Studies Project",
    company: "TSE Consultant INT  ",
    companyUrl: "https://www.linkedin.com/company/tse-consultant-int",
    companyLogo: "/src/assets/img/TSELOGO.png",
    location:
      "14 bis rue Manzel Bouzalfa, Mourouj 5 Ben Arous Tunisia Mourouj, 5 2074, Tunisie ",
    period: "May 2025 — December 2025",
    description:
      "Developed XPLANB, an innovative full-stack platform for secure document sharing, real-time collaboration, productivity management  and wellbeing tools (pomodoro session ) . The application features user authentication, live document co-writing, AI-powered assistance (LLaMA 3.1), video conferencing, and advanced productivity tracking. Created a Bunch Market pitch to validate the business model and market viability.",
    technologies: [
      "MongoDB",
      "Scrum",
      "React, TypeScript, Vite, Tailwind CSS, Figma, EditorJS",
      "Nest.js, RESTful APIs, JWT",
      "WebSocket, Socket.io",
      "LLaMA 3.1 Integration",
      "Docker, GitHub Actions, CI/CD",
      "Video Conferencing Integration",
      "Git, GitHub, Draw.io, UML, Postman, Trello, Notion",
    ],
    highlight: true,
  },
  {
    type: "work",
    status: "remote",
    title: "Engineering Intern /  Full Stack Development",
    company: "IPACT Consult inc. ",
    companyUrl: "https://www.linkedin.com/company/ipact-consult-inc",
    companyLogo: "/src/assets/img/ipact-logo.png",
    location: "Montreal, Quebec, Canada",
    period: "June 2024 — September 2024",
    description:
      "Developed TAWASLNA-PMS, an intelligent community management platform designed for smart cities. Worked on integrating features and building a sophisticated dashboard for parking and transportation management.",
    technologies: [
      "AngularJS/Angular Material",
      "Spring Framework",
      "MongoDB",
      "Jenkins",
      "Docker",
      "Modular Monolith Architecture",
      "trello, Notion, GitHub, Git, Postman , UML, Draw.io",
      "Unit Testing",
      "Integration Testing",
      " Sonarqube",
      "SCRUM Agile Methodology",
    ],
    highlight: false,
  },
  {
    type: "work",
    status: "remote",
    title: "Web Development Intern",
    company: "ESPRIT - Private Higher School of Engineering and Technology ",
    companyLogo: "/src/assets/img/espritlogo.jpeg",
    location: "El Ghazala, Tunis, Tunisia ",
    period: "July 2023 — August 2023",
    description: [
      "- Developed a platform for managing professional job offers (internships and employment)",
      "- Demonstrated great rigor and enthusiasm",
      "- Worked on complex web development projects",
    ],
    technologies: ["Symfony Framework", "MySQL", "GitHub", "Git", "Docker"],
    highlight: false,
  },
  {
    type: "education",
    title:
      "Bachelor of Technology (B.Tech) in Information Technology /  Information Systems Development",
    company: "Higher Institute of Technological Studies of Beja",
    companyUrl: "https://www.isetb.rnu.tn/",
    companyLogo: "/src/assets/img/iset-logo.png",
    location: "Beja, Tunisia",
    period: "September 2018 — June 2021",
    description:
      "Graduated with honors. National Applied Bachelor’s Degree in Information Technology, specializing in Information Systems Development. Focused on designing, developing, and managing information systems to meet business needs.",
    technologies: [
      "web development",
      "Mobile application development",
      "Scalable Architectures [Microservices, Serverless,monolithic, Multi-Module ]",
    ],
    highlight: true,
  },
  {
    type: "work",
    status: "onsite",
    title: "Final Year Project Intern / Software Developer Intern",
    company: "Goodwill Consulting ",
    companyUrl: "https://goodwill.tn/",
    companyLogo: "/src/assets/img/goodwilllogo.png",
    location: "Cyber Parc , P6J4+J24, Béja, Tunisie ",
    period: "February 2021 — June 2021",
    description: [
      "Designed and developed a time management web application to help companies track and manage employee working hours efficiently : ",
      " - Implemented secure user authentication and access control to protect system functionalities",
      " - Built a real-time notification system enabling HR managers to monitor employee activity",
      "- Developed a comprehensive dashboard for tracking employee working hours and performance",
      "- Generated statistical reports to identify productivity trends",
      "- Followed Agile/Scrum methodology, contributing to iterative development, sprint planning, and timely delivery",
      "- reported progress to the project supervisor",
    ],
    technologies: [
      "ASP.NET MVC",
      "Microsoft SQL Server",
      "Scrum",
      "Git",
      "Microsoft Word",
    ],
    highlight: false,
  },
  {
    type: "work",
    status: "onsite",
    title: "Web Development Intern",
    company: " Boite de Développement et Services Informatiques (BDSI) ",
    companyUrl: "https://www.bdsi.tn/",
    companyLogo: "/src/assets/img/bdsilogo.jpeg",
    location: "Bureau N°12 Cyber Park . Béja Tunisie, Beja 9000 ",
    period: "January 2020 — February 2020",
    description: [
     "Gathered and analyzed business requirements to design a web-based solution for a driving school management system",
"Designed and developed a full-stack web application from scratch",
"Built a responsive frontend using Angular",
"Developed RESTful APIs and backend services using Node.js",
"Implemented core features such as user management, scheduling, and data handling",
"Collaborated with team members to ensure application functionality and usability"
    ],
    technologies: [
      "Angular",
      "Node.js",
      "Scrum",
      "Git",
      "Mysql",
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
              "rounded-3xl border p-6 transition-all duration-300 hover:border-slate-600 hover:shadow-lg hover:-translate-y-0.5",
              experience.highlight
                ? "border-slate-600/80 bg-slate-950/90 shadow-lg shadow-primary/20"
                : "border-slate-700/50 bg-slate-950/50",
            )}
          >
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]",
                      experience.type === "work"
                        ? "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                        : "bg-purple-500/10 text-purple-300 border border-purple-500/20",
                    )}
                  >
                    {experience.type === "work" ? "Experience" : "Education"}
                  </span>
                  {experience.type === "work" && experience.status && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/50 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-200">
                      {experience.status === "onsite" ? (
                        <Building2 size={14} className="flex-shrink-0" />
                      ) : (
                        <Globe size={14} className="flex-shrink-0" />
                      )}
                      <span className="capitalize">{experience.status}</span>
                    </span>
                  )}
                </div>
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {experience.period}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-amber-50 mb-3">
                  {experience.title}
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  {experience.companyLogo && (
                    <img
                      src={experience.companyLogo}
                      alt={experience.company}
                      className="h-8 w-8 object-contain rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  {experience.companyUrl ? (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors underline"
                    >
                      {experience.company}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-slate-300">
                      {experience.company}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 mb-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="flex-shrink-0" />
                <span>{experience.period}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="flex-shrink-0" />
                <span>{experience.location}</span>
              </div>
            </div>

            {Array.isArray(experience.description) ? (
              <ul className="mb-4 space-y-2 text-slate-300 text-sm leading-relaxed list-disc list-inside">
                {experience.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {experience.description}
              </p>
            )}

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
    currentPage * itemsPerPage,
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            My <span className="gradient-text">Path</span>
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
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
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
                    ),
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) goToPage(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {paginatedEducation.map((exp, index) => (
            <div key={`${exp.title}-${index}`} className="group">
              <TimelineCard
                experience={exp}
                index={index}
                isInView={isInView}
              />
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}
