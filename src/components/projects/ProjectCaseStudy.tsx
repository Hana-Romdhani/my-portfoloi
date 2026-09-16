import { useEffect, type ComponentType } from "react";
import { useTranslation } from "react-i18next";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  FileText,
  Github,
  Play,
  Presentation,
  User,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/primitives";
import type { Project, ProjectResources } from "@/components/ui/primitives";

interface MetaCardProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  value?: string;
}

function MetaCard({ icon: Icon, label, value }: MetaCardProps) {
  if (!value) return null;

  return (
    <div className="rounded-xl border border-border bg-background/60 p-3 text-center">
      <Icon size={16} className="mx-auto mb-1.5 text-primary" />
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
        {label}
      </p>
      <p className="text-sm font-semibold text-foreground leading-snug">
        {value}
      </p>
    </div>
  );
}

interface ResourceCardProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  action: string;
  href: string;
}

function ResourceCard({
  icon: Icon,
  title,
  description,
  action,
  href,
}: ResourceCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-xl border border-border bg-background/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon size={20} />
      </div>
      <div>
        <h5 className="text-sm font-semibold text-foreground">{title}</h5>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary">
        {action}
        <ExternalLink size={13} />
      </span>
    </a>
  );
}

export function ProjectCaseStudy({
  project,
  open,
  onClose,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const content = project?.caseStudyContent;
  const resources: ProjectResources | undefined = project?.resources;
  const dialogLabel = project?.title ?? t("projects.caseStudy.label");

  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const hasResources = Boolean(
    resources?.report || resources?.presentation || resources?.video,
  );

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fade-in motion-reduce:animate-none" />
        <Dialog.Content
          aria-describedby={undefined}
          aria-label={dialogLabel}
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[1400px] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden rounded-2xl border border-border bg-background/95 text-foreground shadow-2xl shadow-black/40 backdrop-blur-2xl animate-scale-in motion-reduce:animate-none focus:outline-none"
        >
          {project ? (
            <div className="relative">
              {/* Close button */}
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label={t("projects.caseStudy.closeLabel")}
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/70 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>

              <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] lg:gap-10">
                {/* ============ LEFT COLUMN ============ */}
                <div className="space-y-6">
                  <div className="relative overflow-hidden rounded-xl border border-border group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    {project.tagline ? (
                      <p className="mt-1.5 text-sm font-medium text-primary italic">
                        &ldquo;{project.tagline}&rdquo;
                      </p>
                    ) : null}
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    <MetaCard
                      icon={Clock}
                      label={t("projects.caseStudy.duration")}
                      value={project.duration}
                    />
                    <MetaCard
                      icon={User}
                      label={t("projects.caseStudy.role")}
                      value={project.role}
                    />
                    <MetaCard
                      icon={Users}
                      label={t("projects.caseStudy.MetodoloSize")}
                      value={project.MetodoloSize}
                    />
                  </div>

                  <div>
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("projects.caseStudy.technologiesUsed")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ============ RIGHT COLUMN ============ */}
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {t("projects.caseStudy.label")}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold tracking-tight">
                      <span className="gradient-text">{project.title}</span>
                    </h3>
                    {content?.subtitle ? (
                      <p className="mt-2 text-base text-muted-foreground">
                        {content.subtitle}
                      </p>
                    ) : null}
                    <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary to-transparent" />
                  </div>

                  {content?.description?.length ? (
                    <div className="space-y-4">
                      {content.description.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-foreground/90"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {hasResources ? (
                    <div>
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("projects.caseStudy.resources")}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {resources?.report ? (
                          <ResourceCard
                            icon={FileText}
                            title={t("projects.caseStudy.report.title")}
                            description={t(
                              "projects.caseStudy.report.description",
                            )}
                            action={t("projects.caseStudy.report.action")}
                            href={resources.report}
                          />
                        ) : null}
                        {resources?.presentation ? (
                          <ResourceCard
                            icon={Presentation}
                            title={t(
                              "projects.caseStudy.presentation.title",
                            )}
                            description={t(
                              "projects.caseStudy.presentation.description",
                            )}
                            action={t(
                              "projects.caseStudy.presentation.action",
                            )}
                            href={resources.presentation}
                          />
                        ) : null}
                        {resources?.video ? (
                          <ResourceCard
                            icon={Play}
                            title={t("projects.caseStudy.video.title")}
                            description={t(
                              "projects.caseStudy.video.description",
                            )}
                            action={t("projects.caseStudy.video.action")}
                            href={resources.video}
                          />
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* ============ BOTTOM ACTIONS ============ */}
              <div className="flex flex-wrap items-center gap-3 border-t border-border px-5 py-5 sm:px-7">
                {project.demo ? (
                  <Button asChild>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink />
                      {t("projects.caseStudy.liveDemo")}
                    </a>
                  </Button>
                ) : null}
                {project.github ? (
                  <Button asChild variant="outline">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github />
                      {t("projects.caseStudy.github")}
                    </a>
                  </Button>
                ) : null}
                <Dialog.Close asChild>
                  <Button variant="ghost" className={cn("ms-auto")}>
                    <ArrowLeft className="rtl:rotate-180" />
                    {t("projects.caseStudy.back")}
                  </Button>
                </Dialog.Close>
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ProjectCaseStudy;
