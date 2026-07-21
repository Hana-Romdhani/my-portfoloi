import { cn } from '@/lib/utils';

interface CardGridProps {
  children: React.ReactNode;
  className?: string;
}

export function CardGrid({ children, className }: CardGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default CardGrid;
