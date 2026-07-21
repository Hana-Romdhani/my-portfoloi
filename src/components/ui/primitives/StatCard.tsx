import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value?: string | number;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  children,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-xl p-5 card-hover',
        className,
      )}
    >
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {title}
      </div>
      {value !== undefined ? (
        <div className="mt-2 text-2xl font-bold text-foreground">{value}</div>
      ) : null}
      {children ? <div className="mt-3">{children}</div> : null}
      {description ? (
        <div className="mt-2 text-sm text-muted-foreground">{description}</div>
      ) : null}
    </div>
  );
}

export default StatCard;
