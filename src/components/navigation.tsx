import { useState, useEffect, useCallback } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import Software_Engine_svg from '../assets/icon/Software_Engine_svg.svg';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Path', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [...navItems].reverse();
      for (const item of sections) {
        const id = item.href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const section = document.getElementById(href.slice(1));
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    },
    [],
  );

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log('Resume selected:', file.name);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        isScrolled
          ? 'glass py-3 shadow-sm'
          : 'py-5 bg-transparent',
      )}
    >
      <nav className="section-container flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight group"
        >
          <img
            src={Software_Engine_svg}
            alt="icon"
            className="w-5 h-5 dark:invert opacity-70 group-hover:opacity-100 transition-opacity"
          />
          <span className="gradient-text">Hanar.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="w-px h-5 bg-border mx-2" />

          <div className="relative inline-flex">
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={handleResumeUpload}
            />
            <label
              htmlFor="resume-upload"
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-primary/10 px-3.5 py-2 text-sm font-medium text-primary hover:bg-primary/15 transition-all duration-300"
            >
              <Download size={14} />
              Resume
            </label>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass border-b border-border shadow-lg md:hidden animate-fade-in-down">
            <ul className="flex flex-col p-6 gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'block px-4 py-3 text-base font-medium rounded-lg transition-all',
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
