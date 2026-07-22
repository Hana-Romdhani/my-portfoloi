import { useTranslation } from 'react-i18next';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import image_side from '../assets/img/photi22.png';
import { SectionHeader } from '@/components/ui/primitives/SectionHeader';

export function AboutSection() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-28 sm:py-32 relative">
      <div className="section-container" ref={ref}>
        <div
          className={cn(
            'transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-center">
            {/* Image column */}
            <div className="relative mx-auto w-full max-w-md order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden glass-card p-3">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={image_side}
                    alt="About Me"
                    className="w-full object-cover h-[420px] sm:h-[500px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-6 left-6 z-10">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                    {t('about.roleLabel')}
                  </p>
                  <h2 className="text-xl font-bold text-foreground">
                    Hana Romdhani
                  </h2>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary/10 rounded-2xl blur-xl" />
              <div className="absolute -top-3 -left-3 w-20 h-20 bg-secondary/10 rounded-2xl blur-xl" />
            </div>

            {/* Text column */}
            <div className="space-y-6 text-left order-1 lg:order-2">
              <SectionHeader
                title={t('about.title')}
                subtitle={t('about.subtitle')}
              />

              <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
                <p dangerouslySetInnerHTML={{ __html: paragraphs[0] }} />
                <p>{paragraphs[1]}</p>
                <p>{paragraphs[2]}</p>
                <p>{paragraphs[3]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
