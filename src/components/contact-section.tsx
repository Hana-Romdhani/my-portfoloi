import { useState } from 'react';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/primitives';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Hana-Romdhani', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hanaromdhani98@gmail.com', label: 'Email' },
];

export function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-28 sm:py-32 relative">
      {/* Subtle gradient accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-secondary/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative" ref={ref}>
        <div
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            Let&apos;s{' '}
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Have a project in mind or just want to chat? I&apos;d love to hear
            from you. Drop me a message and I&apos;ll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div
            className={cn(
              'transition-all duration-700',
              isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8',
            )}
          >
            <div className="glass-card rounded-xl p-7 h-full">
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Contact Information
              </h3>

              <div className="space-y-4 mb-8">
                <DataTable className="bg-card border-border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-t border-border/50">
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-medium text-foreground"
                      >
                        Email
                      </th>
                      <td className="px-4 py-3">
                        <a
                          href="mailto:hanaromdhani98@gmail.com"
                          className="text-primary hover:underline underline-offset-2 transition-colors"
                        >
                          hanaromdhani98@gmail.com
                        </a>
                      </td>
                    </tr>
                    <tr className="border-t border-border/50">
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-medium text-foreground"
                      >
                        Location
                      </th>
                      <td className="px-4 py-3">
                        <a
                          href="https://www.google.com/maps/place/Tunisia"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline underline-offset-2 transition-colors"
                        >
                          Tunisia
                        </a>
                      </td>
                    </tr>
                    <tr className="border-t border-border/50">
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-medium text-foreground"
                      >
                        GitHub
                      </th>
                      <td className="px-4 py-3">
                        <a
                          href="https://github.com/Hana-Romdhani"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline underline-offset-2 transition-colors"
                        >
                          github.com/Hana-Romdhani
                        </a>
                      </td>
                    </tr>
                    <tr className="border-t border-border/50">
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-medium text-foreground"
                      >
                        LinkedIn
                      </th>
                      <td className="px-4 py-3">
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline underline-offset-2 transition-colors"
                        >
                          linkedin.com
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </DataTable>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Connect with me
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
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
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-muted-foreground text-sm italic leading-relaxed">
                  &ldquo;The best way to predict the future is to create
                  it.&rdquo;
                </p>
                <p className="text-primary text-sm mt-1.5 font-medium">
                  — Peter Drucker
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={cn(
              'transition-all duration-700 delay-150',
              isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8',
            )}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-xl p-7"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-foreground text-sm placeholder:text-muted-foreground outline-none"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-foreground text-sm placeholder:text-muted-foreground outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-foreground text-sm placeholder:text-muted-foreground resize-none outline-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full py-5 btn-gradient text-sm font-semibold"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : isSubmitted ? (
                    'Message Sent!'
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={16} />
                      Send Message
                    </span>
                  )}
                </Button>
                {isSubmitted && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="text-sm text-primary font-medium"
                  >
                    Thanks! Your message has been sent and I&apos;ll reply soon.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
