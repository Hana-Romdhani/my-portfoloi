import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import microsoftIcon from "../assets/img/microsoft.png";
import hedera from "../assets/img/hedera.png";


interface Certification {
  id: number;
  title: string;
  issuer: string;
  year: string;
  icon?: string;
  iconSrc?: string;
  bgColor: string;
  url?: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    title: "AI Skills Fest 2026",
    issuer: "Microsoft",
    year: "Jun 2026",
    iconSrc: microsoftIcon,
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    url: "https://www.credly.com/badges/2d0c4624-1cf8-4e0a-8d1f-dbcf2b26c372/linked_in_profile",
  },
  {
    id: 2,
    title: "Hashgraph Developer Course",
    issuer: "The Hashgraph Association",
    year: "Nov 2025",
    iconSrc: hedera,
    bgColor: "bg-green-100 dark:bg-green-900/30",
    url: "https://hashscan.io/mainnet/token/0.0.3872504/681",
  },
  {
    id: 3,
    title: "EVOLVE student participant",
    issuer: "Erasmus+ Virtual Exchange",
    year: "2019",
    iconSrc: hedera,
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    url: "https://hashscan.io/mainnet/token/0.0.3872504/681",
  },
];

const TOTAL = CERTIFICATIONS.length;
const CARD_WIDTH = 180;
const GAP = 1;
const STEP = CARD_WIDTH + GAP;
const CYCLE_MS = 18000;
const AUTO_DOT_MS = 3000;
const AUTO_RESUME_MS = 5000;

export function CertificationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const dotTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Auto-scroll via requestAnimationFrame for smooth continuous animation
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

  // Dot indicator auto-cycle
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

    trackRef.current.style.transition = "none";
    trackRef.current.style.transform = `translateX(${positionRef.current}px)`;

    trackRef.current.offsetHeight;

    trackRef.current.style.transition =
      "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    trackRef.current.style.transform = `translateX(${targetOffset}px)`;

    const onEnd = () => {
      if (!trackRef.current) return;
      trackRef.current.style.transition = "";
      positionRef.current = targetOffset;
    };

    trackRef.current.addEventListener("transitionend", onEnd, { once: true });
  }, []);

  const handleNav = useCallback(
    (direction: "left" | "right") => {
      setIsAuto(false);
      const next =
        direction === "left"
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

  const displayCards = [...CERTIFICATIONS, ...CERTIFICATIONS];

  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8">
      <style>{`
        .cert-card {
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .cert-card:hover {
          transform: translateY(-3px);
          background-color: hsl(var(--muted));
        }
        .card-icon {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: center center;
        }
        .cert-card:hover .card-icon {
          transform: scale(1.18) rotate(-4deg);
        }
        .year-badge {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .cert-card:hover .year-badge {
          background-color: #86efac;
          color: #166534;
        }
        .dark .cert-card:hover .year-badge {
          background-color: #166534;
          color: #86efac;
        }
        .carousel-track {
          will-change: transform;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            <span className="gradient-text"> My Certifications & Badges</span>
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => handleNav("left")}
              className="p-2 border border-border hover:bg-secondary rounded-lg transition-colors duration-200"
              aria-label="Previous certification"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleNav("right")}
              className="p-2 border border-border hover:bg-secondary rounded-lg transition-colors duration-200"
              aria-label="Next certification"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel with gradient fade masks */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          }}
        >
          <div
            className="border-t border-b border-border"
            style={{ borderTopWidth: "0.5px", borderBottomWidth: "0.5px" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div ref={trackRef} className="carousel-track flex gap-[1px] py-6">
              {displayCards.map((cert, idx) => {
                const cardContent = (
                  <div className="cert-card flex-shrink-0 w-[180px] p-4 rounded-lg border border-border cursor-pointer">
                    <div
                      className={`${cert.bgColor} rounded-xl p-4 mb-3 w-fit mx-auto flex items-center justify-center`}
                    >
                      {cert.iconSrc ? (
                        <img
                          src={cert.iconSrc}
                          alt={`${cert.issuer} badge`}
                          className="card-icon h-14 w-14 object-contain"
                        />
                      ) : (
                        <div className="card-icon text-5xl leading-none text-center select-none">
                          {cert.icon}
                        </div>
                      )}
                    </div>

                    <h3 className="text-center font-bold text-xs mb-1 leading-tight text-foreground">
                      {cert.title}
                    </h3>

                    <p className="text-center text-[11px] text-muted-foreground mb-3">
                      {cert.issuer}
                    </p>

                    <div className="flex justify-center">
                      <span className="year-badge inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                );

                return cert.url ? (
                  <a
                    key={`${cert.id}-${idx}`}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    onClick={() => setIsAuto(false)}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div key={`${cert.id}-${idx}`}>{cardContent}</div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: TOTAL }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-3 h-3 bg-foreground"
                  : "w-2 h-2 bg-muted-foreground/40 hover:bg-foreground/70"
              }`}
              aria-label={`Go to certification ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

