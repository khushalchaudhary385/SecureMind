import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusVariant = 'default' | 'safe' | 'warning' | 'threat';

interface StatusCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: StatusVariant;
  pulse?: boolean;
}

const variantStyles: Record<StatusVariant, string> = {
  default: 'border-border/50',
  safe: 'border-safe/30 shadow-glow-safe',
  warning: 'border-warning/30 shadow-glow-warning',
  threat: 'border-threat/30 shadow-glow-threat',
};

const iconStyles: Record<StatusVariant, string> = {
  default: 'bg-primary/20 text-primary border-primary/30',
  safe: 'bg-safe/20 text-safe border-safe/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
  threat: 'bg-threat/20 text-threat border-threat/30',
};

const valueStyles: Record<StatusVariant, string> = {
  default: 'text-foreground',
  safe: 'text-safe',
  warning: 'text-warning',
  threat: 'text-threat',
};

export function StatusCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  pulse = false,
}: StatusCardProps) {
  return (
    <div className={cn('glass-card p-5 transition-all duration-300 hover:scale-[1.02]', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className={cn('text-3xl font-display font-bold', valueStyles[variant])}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            'p-3 rounded-xl border',
            iconStyles[variant],
            pulse && variant === 'safe' && 'pulse-safe',
            pulse && variant === 'warning' && 'pulse-warning',
            pulse && variant === 'threat' && 'pulse-threat'
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
