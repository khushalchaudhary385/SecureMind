import { Ear, Volume2, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProtocolStatusProps {
  whisperActive: boolean;
  warningActive: boolean;
}

export function ProtocolStatus({ whisperActive, warningActive }: ProtocolStatusProps) {
  return (
    <div className="glass-card p-5">
      <h2 className="text-lg font-display font-semibold text-foreground mb-4">
        Active Protocols
      </h2>

      <div className="space-y-3">
        {/* Whisper Protocol */}
        <div
          className={cn(
            'flex items-center gap-3 p-3 rounded-xl border transition-all',
            whisperActive
              ? 'border-primary/30 bg-primary/10'
              : 'border-border/50 bg-muted/30'
          )}
        >
          <div
            className={cn(
              'p-2 rounded-lg',
              whisperActive
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            )}
          >
            <Ear className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Whisper Protocol</p>
            <p className="text-xs text-muted-foreground">
              Low-volume audio detection
            </p>
          </div>
          <div
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              whisperActive
                ? 'bg-safe/20 text-safe border border-safe/30'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {whisperActive ? 'Active' : 'Inactive'}
          </div>
        </div>

        {/* Warning Protocol */}
        <div
          className={cn(
            'flex items-center gap-3 p-3 rounded-xl border transition-all',
            warningActive
              ? 'border-primary/30 bg-primary/10'
              : 'border-border/50 bg-muted/30'
          )}
        >
          <div
            className={cn(
              'p-2 rounded-lg',
              warningActive
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            )}
          >
            <Volume2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Warning Protocol</p>
            <p className="text-xs text-muted-foreground">
              Audible threat deterrent
            </p>
          </div>
          <div
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              warningActive
                ? 'bg-safe/20 text-safe border border-safe/30'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {warningActive ? 'Active' : 'Inactive'}
          </div>
        </div>

        {/* AI Threat Detection */}
        <div className="flex items-center gap-3 p-3 rounded-xl border border-primary/30 bg-primary/10">
          <div className="p-2 rounded-lg bg-primary/20 text-primary">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">AI Threat Detection</p>
            <p className="text-xs text-muted-foreground">
              Real-time video & audio analysis
            </p>
          </div>
          <div className="px-2 py-1 rounded-full text-xs font-medium bg-safe/20 text-safe border border-safe/30 pulse-safe">
            Active
          </div>
        </div>
      </div>
    </div>
  );
}
