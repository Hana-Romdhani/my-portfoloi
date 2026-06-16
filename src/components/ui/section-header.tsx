import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number?: string;
  label?: string;
  status?: string;
  className?: string;
}

export function SectionHeader({
  number = "00",
  label = "INTRODUCTION",
  status = "AVAILABLE FOR FREELANCE & CONTRACT",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-max flex-col items-center gap-4 rounded-3xl border border-slate-200/80 bg-[#EEF0F8] px-6 py-5 text-slate-900 shadow-sm dark:border-slate-500/80 dark:bg-[#1A1F2E] dark:text-slate-100",
        className,
      )}
    >
      <div className="inline-flex items-center gap-3">
        <span className="font-bold text-2xl leading-none text-violet-500 dark:text-violet-400">
          {number}
        </span>
        <div className="w-[60px] h-[1.5px] rounded-full bg-amber-500" />
        <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>

      <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-300/70 bg-white/90 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-slate-900 shadow-sm dark:border-slate-500/80 dark:bg-slate-900/90 dark:text-slate-100">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
        {status}
      </div>
    </div>
  );
}

