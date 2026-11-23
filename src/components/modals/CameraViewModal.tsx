import { useState } from 'react';
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize2, 
  ChevronLeft, ChevronRight, Shield, Clock, Video, Mic,
  Activity
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera } from '@/types/camera';
import { cn } from '@/lib/utils';

interface CameraViewModalProps {
  camera: Camera | null;
  cameras: Camera[];
  isOpen: boolean;
  onClose: () => void;
  onSwitchCamera: (camera: Camera) => void;
}

export function CameraViewModal({
  camera,
  cameras,
  isOpen,
  onClose,
  onSwitchCamera,
}: CameraViewModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!camera) return null;

  const currentIndex = cameras.findIndex((c) => c.id === camera.id);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < cameras.length - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      onSwitchCamera(cameras[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onSwitchCamera(cameras[currentIndex + 1]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 max-w-4xl p-0 overflow-hidden">
        {/* Video container */}
        <div className="relative aspect-video bg-black">
          {/* Simulated live feed */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted/10 to-muted/30 flex items-center justify-center">
            <div className="text-center">
              <Video className="w-16 h-16 text-primary/50 mx-auto mb-4" />
              <p className="text-muted-foreground">Live feed from {camera.name}</p>
              <p className="text-sm text-muted-foreground/70">{camera.location}</p>
            </div>
          </div>

          {/* Motion detection overlay simulation */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-safe/20 text-safe border border-safe/30 text-sm">
            <Activity className="w-4 h-4" />
            Motion: Normal
          </div>

          {/* Top right indicators */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {camera.isRecording && (
              <div className="rec-indicator">
                REC
              </div>
            )}
            {camera.learningDaysLeft > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-warning/20 text-warning border border-warning/30 text-xs font-medium">
                <Clock className="w-3 h-3" />
                Learning: {camera.learningDaysLeft}d
              </div>
            )}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full',
              'bg-background/50 backdrop-blur-sm border border-border/50',
              'transition-all hover:bg-background/70',
              !canGoPrev && 'opacity-30 cursor-not-allowed'
            )}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full',
              'bg-background/50 backdrop-blur-sm border border-border/50',
              'transition-all hover:bg-background/70',
              !canGoNext && 'opacity-30 cursor-not-allowed'
            )}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom controls */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-foreground hover:bg-white/10"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                
                {camera.hasAudio && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-foreground hover:bg-white/10"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                )}

                <div className="flex items-center gap-2 ml-4 text-sm text-foreground/70">
                  {camera.hasVideo && <Video className="w-4 h-4 text-primary" />}
                  {camera.hasAudio && <Mic className="w-4 h-4 text-primary" />}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-safe/20 text-safe border border-safe/30 text-sm">
                  <Shield className="w-4 h-4" />
                  {camera.isSafe ? 'Safe' : 'Alert'}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-white/10"
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Camera info bar */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-foreground">
                {camera.name}
              </h3>
              <p className="text-sm text-muted-foreground">{camera.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(
                'px-2 py-1 rounded-full text-xs font-medium',
                camera.status === 'online'
                  ? 'bg-safe/20 text-safe border border-safe/30'
                  : 'bg-muted text-muted-foreground'
              )}>
                {camera.status === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
