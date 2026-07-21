import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import microsoftIcon from '../assets/img/microsoft.png';
import hedera from '../assets/img/hedera.png';
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
    year: '2019',
    iconSrc: hedera,
    bgColor: 'bg-accent/20',
    url: 'https://hashscan.io/mainnet/token/0.0.3872504/681',
  },
];

const TOTAL = CERTIFICATIONS.length;
const CARD_WIDTH = 260;
const GAP = 12;
const STEP = CARD_WIDTH + GAP;
const CYCLE_MS = 18000;
const AUTO_DOT_MS = 3000;
const AUTO_RESUME_MS = 5000;

export function CertificationsSection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const dotTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!isAuto || isHovering || !trackRef.current) return;

    const totalScroll = TOTAL * STEP;
    const pxPerMs = totalScroll / CYCLE_MS;
    let lastTime = performance.now();

    const animate = (now: number) => {
      if (!trackRef.current) return;
      const delta = now - lastTime;
      lastTime = now;
      positionRef.current -= pxPerMs * delta;
      if (positionRef.current <= -totalScroll) {
        positionRef.current += totalScroll;
      }
      trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isAuto, isHovering]);

  useEffect(() => {
    if (!isAuto || isHovering) return;
    dotTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL);
    }, AUTO_DOT_MS);
    return () => clearInterval(dotTimerRef.current);
  }, [isAuto, isHovering]);

  const goToSlide = useCallback((index: number) => {
    if (!trackRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const targetOffset = -(index * STEP);
    trackRef.current.style.transition = 'none';
    trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
    trackRef.current.offsetHeight;
    trackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    trackRef.current.style.transform = `translateX(${targetOffset}px)`;

    const onEnd = () => {
      if (!trackRef.current) return;
      trackRef.current.style.transition = '';
      positionRef.current = targetOffset;
    };
    trackRef.current.addEventListener('transitionend', onEnd, { once: true });
  }, []);

  const handleNav = useCallback(
    (direction: 'left' | 'right') => {
      setIsAuto(false);
      const next =
        direction === 'left'
          ? (activeIndex - 1 + TOTAL) % TOTAL
          : (activeIndex + 1) % TOTAL;
      setActiveIndex(next);
      goToSlide(next);
      setTimeout(() => setIsAuto(true), AUTO_RESUME_MS);
    },
    [activeIndex, goToSlide],
  );

  const handleDotClick = useCallback(
    (index: number) => {
      setIsAuto(false);
      setActiveIndex(index);
      goToSlide(index);
      setTimeout(() => setIsAuto(true), AUTO_RESUME_MS);
    },
    [goToSlide],
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-28 relative"
      aria-labelledby="certifications-heading"
    >
      <div className="section-container">
        <div className="sr-only" aria-live="polite">
          Showing certification {activeIndex + 1} of {TOTAL}.
        </div>

        {/* Header */}
        <div
          className={cn(
            'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          )}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Credentials
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              <span className="gradient-text">Badges & Certifications</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl text-sm sm:text-base">
              Verified certifications, badges, and training highlights that support my software and AI expertise.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleNav('left')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Previous certification"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNav('right')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Next certification"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="overflow-hidden">
              <div ref={trackRef} className="flex gap-3">
                {CERTIFICATIONS.map((cert) => (
                  <a
                    key={cert.id}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-shrink-0 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md card-hover block"
                    style={{ width: CARD_WIDTH }}
                    onClick={() => setIsAuto(false)}
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
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: TOTAL }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                'rounded-full transition-all duration-300',
                activeIndex === index
                  ? 'w-6 h-1.5 bg-primary'
                  : 'w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60',
              )}
              aria-label={`Go to certification ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
