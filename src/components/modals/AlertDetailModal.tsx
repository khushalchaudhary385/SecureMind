import { useState } from 'react';
import { 
  X, Play, Pause, Volume2, VolumeX, AlertTriangle,
  Clock, MapPin, Shield, ShieldAlert, CheckCircle,
  Camera
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertSeverity } from '@/types/camera';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AlertDetailModalProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkFalseAlarm: (alertId: string) => void;
  onConfirmThreat: (alertId: string) => void;
}

const severityColors: Record<AlertSeverity, string> = {
  low: 'text-safe',
  medium: 'text-warning',
  high: 'text-warning',
  critical: 'text-threat',
};

const severityBg: Record<AlertSeverity, string> = {
  low: 'bg-safe/20 border-safe/30',
  medium: 'bg-warning/20 border-warning/30',
  high: 'bg-warning/20 border-warning/30',
  critical: 'bg-threat/20 border-threat/30',
};

export function AlertDetailModal({
  alert,
  isOpen,
  onClose,
  onMarkFalseAlarm,
  onConfirmThreat,
}: AlertDetailModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!alert) return null;

  const handleFalseAlarm = () => {
    onMarkFalseAlarm(alert.id);
    onClose();
  };

  const handleConfirmThreat = () => {
    onConfirmThreat(alert.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <AlertTriangle className={cn('w-5 h-5', severityColors[alert.severity])} />
            Alert Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-4 space-y-6">
          {/* Alert info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Alert Type</p>
              <p className="font-medium text-foreground capitalize">{alert.type}</p>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground mb-1">Severity</p>
              </div>
              <div className={cn(
                'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-sm font-medium border',
                severityBg[alert.severity],
                severityColors[alert.severity]
              )}>
                {alert.severity === 'critical' ? (
                  <ShieldAlert className="w-3.5 h-3.5" />
                ) : (
                  <Shield className="w-3.5 h-3.5" />
                )}
                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
              </div>
            </div>
            <div className="glass-card p-4">
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Camera Location
              </p>
              <p className="font-medium text-foreground">{alert.cameraName}</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Timestamp
              </p>
              <p className="font-medium text-foreground">
                {format(alert.timestamp, 'MMM d, yyyy HH:mm:ss')}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground mb-2">Description</p>
            <p className="text-foreground">{alert.description}</p>
          </div>

          {/* Footage playback */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-foreground">
              Recorded Footage
            </h3>
            <div className="relative aspect-video rounded-xl bg-muted/50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-12 h-12 text-muted-foreground/50" />
              </div>
              
              {/* Playback controls */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                {/* Timeline */}
                <div className="h-1 bg-white/20 rounded-full mb-3 cursor-pointer">
                  <div className="h-full w-1/3 bg-primary rounded-full" />
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-foreground hover:bg-white/10 h-8 w-8"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-foreground hover:bg-white/10 h-8 w-8"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <span className="text-xs text-foreground/70 ml-auto">0:08 / 0:24</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {!alert.isResolved && (
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleFalseAlarm}
                variant="outline"
                className="flex-1 gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                False Alarm
              </Button>
              <Button
                onClick={handleConfirmThreat}
                className="flex-1 gap-2 bg-threat hover:bg-threat/90 text-threat-foreground"
              >
                <ShieldAlert className="w-4 h-4" />
                Confirm Threat
              </Button>
            </div>
          )}

          {alert.isResolved && (
            <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-safe/10 border border-safe/30 text-safe">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Alert Resolved</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
