import { useToasts } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

export function ToastContainer() {
  const toasts = useToasts();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium shadow-xl animate-fade-in-up"
        >
          <Check size={16} className="text-green-400" />
          {t.message}
        </div>
      ))}
    </div>
  );
}
