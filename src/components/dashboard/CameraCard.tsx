import { Video, Mic, Clock, Shield, ShieldAlert, Wifi, WifiOff } from 'lucide-react';
import { Camera } from '@/types/camera';
import { cn } from '@/lib/utils';

interface CameraCardProps {
  camera: Camera;
  onClick: () => void;
}

export function CameraCard({ camera, onClick }: CameraCardProps) {
  const isOnline = camera.status === 'online';
  const isLearning = camera.learningDaysLeft > 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-card p-4 cursor-pointer transition-all duration-300',
        'hover:scale-[1.02] hover:border-primary/50',
        !isOnline && 'opacity-60'
      )}
    >
      {/* Camera Preview */}
      <div className="relative aspect-video rounded-xl bg-muted/50 mb-4 overflow-hidden">
        {/* Simulated camera feed */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/60 flex items-center justify-center">
          <Video className="w-12 h-12 text-muted-foreground/50" />
        </div>

        {/* Status indicators overlay */}
        <div className="absolute top-2 left-2 flex items-center gap-2">
          {/* Online/Offline indicator */}
          <div
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
              isOnline
                ? 'bg-safe/20 text-safe border border-safe/30'
                : 'bg-muted text-muted-foreground border border-muted'
            )}
          >
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isOnline ? 'Online' : 'Offline'}
          </div>

          {/* Recording indicator */}
          {camera.isRecording && (
            <div className="rec-indicator">
              REC
            </div>
          )}
        </div>

        {/* Learning indicator */}
        {isLearning && isOnline && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-warning/20 text-warning border border-warning/30 text-xs font-medium">
            <Clock className="w-3 h-3" />
            Learning: {camera.learningDaysLeft}d
          </div>
        )}

        {/* Safety badge */}
        <div className="absolute bottom-2 right-2">
          {camera.isSafe ? (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-safe/20 text-safe border border-safe/30 text-xs font-medium">
              <Shield className="w-3 h-3" />
              Safe
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-threat/20 text-threat border border-threat/30 text-xs font-medium pulse-threat">
              <ShieldAlert className="w-3 h-3" />
              Alert
            </div>
          )}
        </div>
      </div>

      {/* Camera info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">
            {camera.name}
          </h3>
          <div className="flex items-center gap-1.5">
            {camera.hasVideo && (
              <Video className="w-4 h-4 text-primary" />
            )}
            {camera.hasAudio && (
              <Mic className="w-4 h-4 text-primary" />
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{camera.location}</p>
      </div>
    </div>
  );
}
