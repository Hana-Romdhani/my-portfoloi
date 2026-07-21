import { cn } from '@/lib/utils';

interface DataTableProps {
  className?: string;
  children: React.ReactNode;
}

export function DataTable({ className, children }: DataTableProps) {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-xl border border-border shadow-sm',
        className,
      )}
    >
      <table className="min-w-full divide-y divide-border text-left text-sm">
        {children}
      </table>
    </div>
  );
}

export default DataTable;
