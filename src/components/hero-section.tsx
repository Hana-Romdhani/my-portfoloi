import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/primitives';
import { toast } from '@/hooks/use-toast';
import image_software from '../assets/img/image.png';

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const textRef = useRef<HTMLSpanElement>(null);
  const roles = t('hero.roles', { returnObjects: true }) as string[];

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentRole = roles[roleIndex];
      if (textRef.current) {
        if (isDeleting) {
          textRef.current.textContent = currentRole.substring(0, charIndex - 1);
          charIndex--;
        } else {
          textRef.current.textContent = currentRole.substring(0, charIndex + 1);
          charIndex++;
        }
        if (!isDeleting && charIndex === currentRole.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
          }, 2000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      const speed = isDeleting ? 40 : 80;
      timeoutId = setTimeout(type, speed);
    };
    type();
    return () => clearTimeout(timeoutId);
  }, [i18n.language]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Hana-Romdhani', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hanaromdhani98@gmail.com', label: 'Email' },
    { icon: Phone, href: 'tel:+21692340405', label: 'Phone' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container py-24 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left content */}
          <div className="text-center lg:text-left flex-1">
            <p
              className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em] mb-5 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              {t('hero.greeting')}
            </p>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.35s' }}
            >
              <span className="gradient-text">Hana Romdhani</span>
            </h1>

            <div
              className="h-10 lg:h-14 mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground/70">
                <span ref={textRef} className="border-r-2 border-primary/60 pr-1" />
              </p>
            </div>

            <p
              className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '0.65s' }}
            >
              {t('hero.subtitle')}
            </p>

            <p
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-10 animate-fade-in-up"
              style={{ animationDelay: '0.75s' }}
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
              {t('hero.available')}
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10 animate-fade-in-up"
              style={{ animationDelay: '0.85s' }}
            >
              <Button
                asChild
                size="lg"
                className="btn-gradient px-8 py-6 text-base font-semibold glow-primary"
              >
                <a href="#projects">{t('hero.viewProjects')}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:bg-muted/50 px-8 py-6 text-base font-medium"
              >
                <a href="#contact">{t('hero.contactMe')}</a>
              </Button>
            </div>

            <div
              className="flex items-center justify-center lg:justify-start gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.95s' }}
            >
              {socialLinks.map((social) => {
                const isMailto = social.href.startsWith('mailto:');
                const email = isMailto ? social.href.replace('mailto:', '') : '';

                if (isMailto) {
                  return (
                    <button
                      key={social.label}
                      onClick={() => {
                        navigator.clipboard.writeText(email);
                        toast('Email copié !');
                      }}
                      className="w-10 h-10 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </button>
                  );
                }

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right - Image */}
          <div
            className="relative flex-1 max-w-lg animate-fade-in-up flex items-center justify-center"
            style={{ animationDelay: '1s' }}
          >
            <div className="relative w-full">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border glass-card">
                <img
                  src={image_software}
                  alt="Hana Romdhani - Software Engineer"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <a
            href="#about"
            aria-label={t('hero.scrollAria')}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
          >
            <ArrowDown className="text-muted-foreground" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
