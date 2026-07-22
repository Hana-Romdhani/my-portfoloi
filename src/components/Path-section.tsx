import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Globe,
  Building2,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

const educationKeys = [
  'esprit-eng',
  'tse',
  'ipact',
  'esprit-intern',
  'iset',
  'goodwill',
  'bdsi',
];

const educationMeta: Record<string, {
  type: 'education' | 'work';
  status?: 'remote' | 'onsite';
  companyUrl?: string;
  companyLogo: string;
  technologies: string[];
  highlight: boolean;
}> = {
  'esprit-eng': {
    type: 'education',
    companyUrl: 'https://www.esprit.tn/',
    companyLogo: '/src/assets/img/espritlogo.jpeg',
    technologies: [
      'web development',
      'AI integration',
      'Scalable Architectures',
      'Quality testing',
      'blockchain development',
      'Project management and teamwork',
    ],
    highlight: true,
  },
  'tse': {
    type: 'work',
    status: 'remote',
    companyUrl: 'https://www.linkedin.com/company/tse-consultant-int',
    companyLogo: '/src/assets/img/TSELOGO.png',
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
  'ipact': {
    type: 'work',
    status: 'remote',
    companyUrl: 'https://www.linkedin.com/company/ipact-consult-inc',
    companyLogo: '/src/assets/img/ipact-logo.png',
    technologies: [
      'AngularJS/Angular Material',
      'Spring Framework',
      'MongoDB',
      'Jenkins',
      'Docker',
      'Modular Monolith Architecture',
      'trello, Notion, GitHub, Git, Postman, UML, Draw.io',
      'Unit Testing',
      'Integration Testing',
      'Sonarqube',
      'SCRUM Agile Methodology',
    ],
    highlight: false,
  },
  'esprit-intern': {
    type: 'work',
    companyLogo: '/src/assets/img/espritlogo.jpeg',
    technologies: ['Symfony Framework', 'MySQL', 'GitHub', 'Git', 'Docker'],
    highlight: false,
  },
  'iset': {
    type: 'education',
    companyUrl: 'https://www.isetb.rnu.tn/',
    companyLogo: '/src/assets/img/iset-logo.png',
    technologies: [
      'web development',
      'Mobile application development',
      'Scalable Architectures',
    ],
    highlight: true,
  },
  'goodwill': {
    type: 'work',
    status: 'onsite',
    companyUrl: 'https://goodwill.tn/',
    companyLogo: '/src/assets/img/goodwilllogo.png',
    technologies: [
      'ASP.NET MVC',
      'Microsoft SQL Server',
      'Scrum',
      'Git',
      'Microsoft Word',
    ],
    highlight: false,
  },
  'bdsi': {
    type: 'work',
    status: 'onsite',
    companyUrl: 'https://www.bdsi.tn/',
    companyLogo: '/src/assets/img/bdsilogo.jpeg',
    technologies: [
      'Angular',
      'Node.js',
      'Scrum',
      'Git',
      'Mysql',
    ],
    highlight: false,
  },
};

function TimelineCard({
  entryKey,
  meta,
  index,
  isInView,
}: {
  entryKey: string;
  meta: (typeof educationMeta)[string];
  index: number;
  isInView: boolean;
}) {
  const { t } = useTranslation();
  const Icon = meta.type === 'work' ? Briefcase : GraduationCap;
  const title = t(`education.entries.${entryKey}.title`);
  const titleExtra = t(`education.entries.${entryKey}.titleExtra`);
  const company = t(`education.entries.${entryKey}.company`);
  const companyUrl = meta.companyUrl;
  const location = t(`education.entries.${entryKey}.location`);
  const period = t(`education.entries.${entryKey}.period`);
  const descriptionRaw = t(`education.entries.${entryKey}.description`, { returnObjects: true }) as string | string[];

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
              meta.type === 'work'
                ? 'bg-primary/10 border-primary/20 text-primary'
                : 'bg-secondary/10 border-secondary/20 text-secondary',
            )}
          >
            <Icon size={18} />
          </div>
        </div>

        {/* Card */}
        <div className="flex-1 pb-6">
          <div
            className={cn(
              'rounded-xl border p-5 transition-all duration-300 card-hover',
              meta.highlight
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
                      meta.type === 'work'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/10 text-secondary',
                    )}
                  >
                    {meta.type === 'work' ? t('education.typeExperience') : t('education.typeEducation')}
                  </span>
                  {meta.type === 'work' && meta.status && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {meta.status === 'onsite' ? (
                        <Building2 size={12} />
                      ) : (
                        <Globe size={12} />
                      )}
                      <span className="capitalize">{meta.status}</span>
                    </span>
                  )}
                </div>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  {period}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-1.5 leading-snug">
                  {title}
                  {titleExtra && (
                    <span className="text-sm font-normal text-muted-foreground ml-1">{titleExtra}</span>
                  )}
                </h3>
                <div className="flex items-center gap-2">
                  {meta.companyLogo && (
                    <img
                      src={meta.companyLogo}
                      alt={company}
                      loading="lazy"
                      className="h-6 w-6 object-contain rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  {companyUrl ? (
                    <a
                      href={companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline underline-offset-2 transition-colors"
                    >
                      {company}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-muted-foreground">
                      {company}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} />
                <span>{period}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={13} />
                <span>{location}</span>
              </div>
            </div>

            {/* Description */}
            {Array.isArray(descriptionRaw) ? (
              <ul className="mb-3 space-y-1 text-sm text-foreground/80 leading-relaxed list-disc list-inside">
                {descriptionRaw.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                {descriptionRaw}
              </p>
            )}

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {meta.technologies.map((tech) => (
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
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(educationKeys.length / itemsPerPage);
  const paginatedKeys = educationKeys.slice(
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
            {t('education.label')}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {t('education.title')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            {t('education.subtitle')}
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
            {paginatedKeys.map((key, index) => (
              <TimelineCard
                key={`${key}-${index}`}
                entryKey={key}
                meta={educationMeta[key]}
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
