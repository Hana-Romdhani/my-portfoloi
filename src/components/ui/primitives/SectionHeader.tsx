import { cn } from '@/lib/utils';

interface Props {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, badge, className }: Props) {
  return (
    <div className={cn('flex flex-col items-start gap-3', className)}>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-sm sm:text-base text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>

      {badge ? (
        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
          {badge}
        </div>
      ) : null}
    </div>
  );
}

export default SectionHeader;
