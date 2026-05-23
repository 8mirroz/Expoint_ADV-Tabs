import { type LucideIcon } from 'lucide-react';
import type { CapabilityState } from '@/store/useSalesEngineStore';

interface CapabilityCardProps {
  id: string;
  title: string;
  status: CapabilityState['status'];
  description: string;
  icon: LucideIcon;
  compact?: boolean;
}

const statusTones: Record<CapabilityState['status'], { border: string; bg: string; text: string }> = {
  'coming-next': { border: 'border-white/8', bg: 'bg-white/[0.03]', text: 'text-white/45' },
  'active': { border: 'border-[#00ffa3]/25', bg: 'bg-[#00ffa3]/10', text: 'text-[#00ffa3]' },
  'operator-reviewed': { border: 'border-emerald-300/20', bg: 'bg-emerald-300/10', text: 'text-emerald-200' },
  'queued-manual-assist': { border: 'border-cyan-400/20', bg: 'bg-cyan-400/10', text: 'text-cyan-200' },
};

export function CapabilityCard({ id: _id, title, status, description, icon: Icon, compact = false }: CapabilityCardProps) {
  const tone = statusTones[status];

  if (compact) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-2">
        <div className={`flex h-6 w-6 items-center justify-center rounded-lg border ${tone.border} ${tone.bg}`}>
          <Icon className="h-3 w-3" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/78">{title}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-white/45">{status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3">
      <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl border ${tone.border} ${tone.bg}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/78">{title}</p>
          <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] ${tone.border} ${tone.bg} ${tone.text}`}>
            {status}
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-white/48">{description}</p>
      </div>
    </div>
  );
}