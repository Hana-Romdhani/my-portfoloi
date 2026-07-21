import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Globe,
  Building2,
} from 'lucide-react';
import { useState } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

const education = [
  {
    type: 'education',
    title:
      "National Engineering Degree in Computer Science (Dipl\u00f4me National d'Ing\u00e9nieur Informatique)",
    company: 'ESPRIT - Private Higher School of Engineering and Technology',
    companyUrl: 'https://www.esprit.tn/',
    companyLogo: '/src/assets/img/espritlogo.jpeg',
    location:
      'Z.I. Chotrana II, P\u00f4le Technologique El Ghazela, 2083, Ariana, Tunisia',
    period: '2022 \u2014 2025',
    description:
      'Graduated with honors. Specialized in full-stack development, AI integration, and DevOps. Led various technical projects and maintained strong academic performance.',
    technologies: [
      'web development',
      'AI integration',
      'Scalable Architectures [Microservices, Serverless,monolithic, Multi-Module ]',
      'Quality testing',
      'blockchain development',
      'Project management and teamwork',
    ],
    highlight: true,
  },
  {
    type: 'work',
    status: 'remote',
    title: 'Full Stack  Engineer Intern / End-of-Studies Project',
    company: 'TSE Consultant INT  ',
    companyUrl: 'https://www.linkedin.com/company/tse-consultant-int',
    companyLogo: '/src/assets/img/TSELOGO.png',
    location:
      '14 bis rue Manzel Bouzalfa, Mourouj 5 Ben Arous Tunisia Mourouj, 5 2074, Tunisie ',
    period: 'May 2025 \u2014 December 2025',
    description:
      'Developed XPLANB, an innovative full-stack platform for secure document sharing, real-time collaboration, productivity management  and wellbeing tools (pomodoro session ) . The application features user authentication, live document co-writing, AI-powered assistance (LLaMA 3.1), video conferencing, and advanced productivity tracking. Created a Bunch Market pitch to validate the business model and market viability.',
    technologies: [
      'MongoDB',
      'Scrum',
      'React, TypeScript, Vite, Tailwind CSS, Figma, EditorJS',
      'Nest.js, RESTful APIs, JWT',
      'WebSocket, Socket.io',
      'LLaMA 3.1 Integration',
      'Docker, GitHub Actions, CI/CD',
      'Video Conferencing Integration',
      'Git, GitHub, Draw.io, UML, Postman, Trello, Notion',
    ],
    highlight: true,
  },
  {
    type: 'work',
    status: 'remote',
    title: 'Engineering Intern /  Full Stack Development',
    company: 'IPACT Consult inc. ',
    companyUrl: 'https://www.linkedin.com/company/ipact-consult-inc',
    companyLogo: '/src/assets/img/ipact-logo.png',
    location: 'Montreal, Quebec, Canada',
    period: 'June 2024 \u2014 September 2024',
    description:
      'Developed TAWASLNA-PMS, an intelligent community management platform designed for smart cities. Worked on integrating features and building a sophisticated dashboard for parking and transportation management.',
    technologies: [
      'AngularJS/Angular Material',
      'Spring Framework',
      'MongoDB',
      'Jenkins',
      'Docker',
      'Modular Monolith Architecture',
      'trello, Notion, GitHub, Git, Postman , UML, Draw.io',
      'Unit Testing',
      'Integration Testing',
      ' Sonarqube',
      'SCRUM Agile Methodology',
    ],
    highlight: false,
  },
  {
    type: 'work',
    status: 'remote',
    title: 'Web Development Intern',
    company: 'ESPRIT - Private Higher School of Engineering and Technology ',
    companyLogo: '/src/assets/img/espritlogo.jpeg',
    location: 'El Ghazala, Tunis, Tunisia ',
    period: 'July 2023 \u2014 August 2023',
    description: [
      '- Developed a platform for managing professional job offers (internships and employment)',
      '- Demonstrated great rigor and enthusiasm',
      '- Worked on complex web development projects',
    ],
    technologies: ['Symfony Framework', 'MySQL', 'GitHub', 'Git', 'Docker'],
    highlight: false,
  },
  {
    type: 'education',
    title:
      'Bachelor of Technology (B.Tech) in Information Technology /  Information Systems Development',
    company: 'Higher Institute of Technological Studies of Beja',
    companyUrl: 'https://www.isetb.rnu.tn/',
    companyLogo: '/src/assets/img/iset-logo.png',
    location: 'Beja, Tunisia',
    period: 'September 2018 \u2014 June 2021',
    description:
      'Graduated with honors. National Applied Bachelor\u2019s Degree in Information Technology, specializing in Information Systems Development. Focused on designing, developing, and managing information systems to meet business needs.',
    technologies: [
      'web development',
      'Mobile application development',
      'Scalable Architectures [Microservices, Serverless,monolithic, Multi-Module ]',
    ],
    highlight: true,
  },
  {
    type: 'work',
    status: 'onsite',
    title: 'Final Year Project Intern / Software Developer Intern',
    company: 'Goodwill Consulting ',
    companyUrl: 'https://goodwill.tn/',
    companyLogo: '/src/assets/img/goodwilllogo.png',
    location: 'Cyber Parc , P6J4+J24, B\u00e9ja, Tunisie ',
    period: 'February 2021 \u2014 June 2021',
    description: [
      'Designed and developed a time management web application to help companies track and manage employee working hours efficiently : ',
      ' - Implemented secure user authentication and access control to protect system functionalities',
      ' - Built a real-time notification system enabling HR managers to monitor employee activity',
      '- Developed a comprehensive dashboard for tracking employee working hours and performance',
      '- Generated statistical reports to identify productivity trends',
      '- Followed Agile/Scrum methodology, contributing to iterative development, sprint planning, and timely delivery',
      '- reported progress to the project supervisor',
    ],
    technologies: [
      'ASP.NET MVC',
      'Microsoft SQL Server',
      'Scrum',
      'Git',
      'Microsoft Word',
    ],
    highlight: false,
  },
  {
    type: 'work',
    status: 'onsite',
    title: 'Web Development Intern',
    company: ' Boite de D\u00e9veloppement et Services Informatiques (BDSI) ',
    companyUrl: 'https://www.bdsi.tn/',
    companyLogo: '/src/assets/img/bdsilogo.jpeg',
    location: 'Bureau N\u00b012 Cyber Park . B\u00e9ja Tunisie, Beja 9000 ',
    period: 'January 2020 \u2014 February 2020',
    description: [
      'Gathered and analyzed business requirements to design a web-based solution for a driving school management system',
      'Designed and developed a full-stack web application from scratch',
      'Built a responsive frontend using Angular',
      'Developed RESTful APIs and backend services using Node.js',
      'Implemented core features such as user management, scheduling, and data handling',
      'Collaborated with team members to ensure application functionality and usability',
    ],
    technologies: [
      'Angular',
      'Node.js',
      'Scrum',
      'Git',
      'Mysql',
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
  const Icon = experience.type === 'work' ? Briefcase : GraduationCap;

  return (
    <div
      className={cn(
        'transition-all duration-600',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex gap-5">
        {/* Timeline line + dot */}
        <div className="flex flex-col items-center">
          <div
            className={cn(
              'w-11 h-11 rounded-xl flex items-center justify-center z-10 flex-shrink-0 border transition-all duration-300',
              experience.type === 'work'
                ? 'bg-primary/10 border-primary/20 text-primary'
                : 'bg-secondary/10 border-secondary/20 text-secondary',
            )}
          >
            <Icon size={18} />
          </div>
          {index < education.length - 1 && (
            <div className="w-px flex-1 min-h-[20px] bg-border mt-2" />
          )}
        </div>

        {/* Card */}
        <div className="flex-1 pb-6">
          <div
            className={cn(
              'rounded-xl border p-5 transition-all duration-300 card-hover',
              experience.highlight
                ? 'border-primary/20 bg-card shadow-sm'
                : 'border-border bg-card/60',
            )}
          >
            {/* Header */}
            <div className="flex flex-col gap-2.5 mb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-md px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider',
                      experience.type === 'work'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/10 text-secondary',
                    )}
                  >
                    {experience.type === 'work' ? 'Experience' : 'Education'}
                  </span>
                  {experience.type === 'work' && experience.status && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {experience.status === 'onsite' ? (
                        <Building2 size={12} />
                      ) : (
                        <Globe size={12} />
                      )}
                      <span className="capitalize">{experience.status}</span>
                    </span>
                  )}
                </div>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  {experience.period}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-1.5 leading-snug">
                  {experience.title}
                </h3>
                <div className="flex items-center gap-2">
                  {experience.companyLogo && (
                    <img
                      src={experience.companyLogo}
                      alt={experience.company}
                      loading="lazy"
                      className="h-6 w-6 object-contain rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  {experience.companyUrl ? (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline underline-offset-2 transition-colors"
                    >
                      {experience.company}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-muted-foreground">
                      {experience.company}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} />
                <span>{experience.period}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={13} />
                <span>{experience.location}</span>
              </div>
            </div>

            {/* Description */}
            {Array.isArray(experience.description) ? (
              <ul className="mb-3 space-y-1 text-sm text-foreground/80 leading-relaxed list-disc list-inside">
                {experience.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                {experience.description}
              </p>
            )}

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <span key={tech} className="tag">
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
    const element = document.getElementById('education');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="education" className="py-28 sm:py-32 relative">
      <div className="section-container" ref={ref}>
        <div
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Journey
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            My{' '}
            <span className="gradient-text">Experience &amp; Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Where I&apos;ve been, what I&apos;ve built
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
                          ? 'pointer-events-none opacity-50'
                          : ''
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
                          ? 'pointer-events-none opacity-50'
                          : ''
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          <div className="space-y-2">
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
      </div>
    </section>
  );
}
