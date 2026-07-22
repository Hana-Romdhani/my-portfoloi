import { useTranslation } from 'react-i18next';
import microsoftIcon from '../assets/img/microsoft.png';
import hedera from '../assets/img/hedera.png';
import evolve from '../assets/img/evolve-student-participant.png';
import parti from '../assets/img/da5ddde46fc787b7e822642a06f9509f716369ddf41e06e7df3ad2ec0ad02532.png';
import parti1 from '../assets/img/2026-06-25_iooc-assignments-n-n-2019.png';
import parti2 from '../assets/img/2026-06-25_iooc-videologue-n-n-2019.png';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  year: string;
  iconSrc?: string;
  bgColor: string;
  url?: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    title: 'AI Skills Fest 2026',
    issuer: 'Microsoft',
    year: 'Jun 2026',
    iconSrc: microsoftIcon,
    bgColor: 'bg-primary/10',
    url: 'https://www.credly.com/badges/2d0c4624-1cf8-4e0a-8d1f-dbcf2b26c372/linked_in_profile',
  },
  {
    id: 2,
    title: 'Hashgraph Developer Course',
    issuer: 'The Hashgraph Association',
    year: 'Nov 2025',
    iconSrc: hedera,
    bgColor: 'bg-secondary/10',
    url: 'https://hashscan.io/mainnet/token/0.0.3872504/681',
  },
  {
    id: 3,
    title: 'EVOLVE student participant',
    issuer: 'Erasmus+ Virtual Exchange',
    year: '20.4.2020',
    iconSrc: evolve,
    bgColor: 'bg-accent/20',
    url: 'https://openbadgepassport.com/app/badge/info/213258',
  },
  {
    id: 4,
    title: 'IOOC Participant: N&N 2019',
    issuer: 'Erasmus+ Virtual Exchange / Sharing Perspectives',
    year: '18.6.2019',
    iconSrc: parti,
    bgColor: 'bg-accent/20',
    url: 'https://openbadgepassport.com/app/badge/info/144717',
  },
  {
    id: 5,
    title: 'IOOC Assignments: N&N 2019',
    issuer: 'Erasmus+ Virtual Exchange / Sharing Perspectives',
    year: '18.6.2019',
    iconSrc: parti1,
    bgColor: 'bg-accent/20',
    url: 'https://openbadgepassport.com/app/badge/info/144771',
  },
  {
    id: 6,
    title: 'IOOC Videologue: N&N 2019',
    issuer: 'Erasmus+ Virtual Exchange / Sharing Perspectives',
    year: '19.6.2019',
    iconSrc: parti2,
    bgColor: 'bg-accent/20',
    url: 'https://openbadgepassport.com/app/badge/info/144763',
  },
];

export function CertificationsSection() {
  const { t } = useTranslation();
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-28 relative"
      aria-labelledby="certifications-heading"
    >
      <div className="section-container">
        {/* Header */}
        <div
          className={cn(
            'text-center mb-10 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            {t('certifications.label')}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            <span className="gradient-text">{t('certifications.title')}</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            {t('certifications.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {CERTIFICATIONS.map((cert, index) => (
            <a
              key={cert.id}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md card-hover block',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="flex flex-col items-center gap-4">
                <div className={cn('rounded-xl p-3', cert.bgColor)}>
                  {cert.iconSrc ? (
                    <img
                      src={cert.iconSrc}
                      alt={`${cert.issuer} badge`}
                      loading="lazy"
                      className="h-10 w-10 object-contain"
                    />
                  ) : null}
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-foreground mb-1 leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                </div>
                <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {cert.year}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
