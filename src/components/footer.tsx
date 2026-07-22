import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Hana-Romdhani', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

const navLinksKeys = [
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'skills', href: '#skills' },
  { key: 'contact', href: '#contact' },
];

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const copyEmail = () => {
    navigator.clipboard.writeText('hanaromdhani98@gmail.com');
    toast('Email copié !');
  };

  return (
    <footer className="relative py-10 border-t border-border/50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a
              href="#"
              className="text-xl font-bold gradient-text tracking-tight"
            >
              Hanar.
            </a>
            <p className="text-muted-foreground text-sm mt-1.5 flex items-center gap-1 justify-center md:justify-start">
              {t('footer.madeWith')}
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              &copy; {currentYear} {t('footer.rights')}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-1">
            {navLinksKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-all duration-300"
              >
                {t(`footer.${link.key}`)}
              </a>
            ))}
          </nav>

          {/* Social + Copy email */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={16} />
              </a>
            ))}
            <button
              onClick={copyEmail}
              className="w-9 h-9 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              aria-label="Copy email"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Back to top */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <span>{t('footer.backToTop')}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
