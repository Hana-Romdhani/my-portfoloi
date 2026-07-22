import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Send, Github, Linkedin, Mail, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/primitives";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import type { ContactFormData, ContactFormErrors } from "@/types/contact";
import {
  hasErrors,
  isLikelySpamBot,
  validateContactForm,
} from "@/lib/contact-validation";

export function ContactSection() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [formState, setFormState] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFormErrors>({
    name: "",
    email: "",
    message: "",
  });
  const formLoadTime = useRef(Date.now());

  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  const validateForm = () => {
    const nextErrors = validateContactForm(formState);
    setFieldErrors(nextErrors);
    return !hasErrors(nextErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLikelySpamBot(formState, formLoadTime.current)) {
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "", honeypot: "" });
      setFieldErrors({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formState.name,
          email: formState.email,
          message: formState.message,
          time: new Date().toLocaleString("fr-FR", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "", honeypot: "" });
      setFieldErrors({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi, réessaie ou écris-moi directement.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const socialLinks = [
    { icon: Github, href: "https://github.com/Hana-Romdhani", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hanaromdhani98@gmail.com", label: "Email" },
  ];

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
            "text-center mb-12 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            {t("contact.label")}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            <span dangerouslySetInnerHTML={{ __html: t("contact.title") }} />
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div
            className={cn(
              "transition-all duration-700",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8",
            )}
          >
            <div className="glass-card rounded-xl p-7 h-full">
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                {t("contact.infoHeading")}
              </h3>

              <div className="space-y-4 mb-8">
                <DataTable className="bg-card border-border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {t("contact.contactCol")}
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {t("contact.detailsCol")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-t border-border/50">
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-medium text-foreground"
                      >
                        {t("contact.emailRow")}
                      </th>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              "hanaromdhani98@gmail.com",
                            );
                            toast("Email copié !");
                          }}
                          className="flex items-center gap-2 text-primary hover:underline underline-offset-2 transition-colors"
                        >
                          hanaromdhani98@gmail.com
                          <Copy size={13} className="opacity-50" />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-t border-border/50">
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-medium text-foreground"
                      >
                        {t("contact.locationRow")}
                      </th>
                      <td className="px-4 py-3">
                        <a
                          href="https://www.google.com/maps/place/Tunisia"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline underline-offset-2 transition-colors"
                        >
                          {t("contact.locationValue")}
                        </a>
                      </td>
                    </tr>
                    <tr className="border-t border-border/50">
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-medium text-foreground"
                      >
                        {t("contact.githubRow")}
                      </th>
                      <td className="px-4 py-3">
                        <a
                          href="https://github.com/Hana-Romdhani"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline underline-offset-2 transition-colors"
                        >
                          {t("contact.githubValue")}
                        </a>
                      </td>
                    </tr>
                    <tr className="border-t border-border/50">
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-medium text-foreground"
                      >
                        {t("contact.linkedinRow")}
                      </th>
                      <td className="px-4 py-3">
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline underline-offset-2 transition-colors"
                        >
                          {t("contact.linkedinValue")}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </DataTable>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  {t("contact.connectWithMe")}
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const isMailto = social.href.startsWith("mailto:");
                    const email = isMailto
                      ? social.href.replace("mailto:", "")
                      : "";

                    if (isMailto) {
                      return (
                        <button
                          key={social.label}
                          onClick={() => {
                            navigator.clipboard.writeText(email);
                            toast("Email copié !");
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

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-muted-foreground text-sm italic leading-relaxed">
                  &ldquo;{t("contact.quote")}&rdquo;
                </p>
                <p className="text-primary text-sm mt-1.5 font-medium">
                  — {t("contact.quoteAuthor")}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={cn(
              "transition-all duration-700 delay-150",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8",
            )}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-7">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    {t("contact.form.nameLabel")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => {
                      setFormState({ ...formState, name: e.target.value });
                      setFieldErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-foreground text-sm placeholder:text-muted-foreground outline-none",
                      fieldErrors.name &&
                        "border-destructive focus:border-destructive focus:ring-destructive/30",
                    )}
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                  {fieldErrors.name && (
                    <p className="mt-2 text-sm text-destructive">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    {t("contact.form.emailLabel")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => {
                      setFormState({ ...formState, email: e.target.value });
                      setFieldErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-foreground text-sm placeholder:text-muted-foreground outline-none",
                      fieldErrors.email &&
                        "border-destructive focus:border-destructive focus:ring-destructive/30",
                    )}
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                  {fieldErrors.email && (
                    <p className="mt-2 text-sm text-destructive">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    {t("contact.form.messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({ ...formState, message: e.target.value });
                      setFieldErrors((prev) => ({ ...prev, message: "" }));
                    }}
                    rows={5}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-foreground text-sm placeholder:text-muted-foreground resize-none outline-none",
                      fieldErrors.message &&
                        "border-destructive focus:border-destructive focus:ring-destructive/30",
                    )}
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                  {fieldErrors.message && (
                    <p className="mt-2 text-sm text-destructive">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <input
                  type="text"
                  name="honeypot"
                  value={formState.honeypot}
                  onChange={(e) =>
                    setFormState({ ...formState, honeypot: e.target.value })
                  }
                  autoComplete="off"
                  tabIndex={-1}
                  className="absolute opacity-0 h-0 w-0 -z-10"
                  aria-hidden="true"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full py-5 btn-gradient text-sm font-semibold"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("contact.form.sending")}
                    </span>
                  ) : isSubmitted ? (
                    t("contact.form.sent")
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={16} />
                      {t("contact.form.send")}
                    </span>
                  )}
                </Button>
                <div className="space-y-2">
                  {isSubmitted && (
                    <p
                      role="status"
                      aria-live="polite"
                      className="text-sm text-primary font-medium"
                    >
                      {t("contact.form.success")}
                    </p>
                  )}
                  {error && (
                    <p
                      role="alert"
                      className="text-sm text-destructive font-medium"
                    >
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

