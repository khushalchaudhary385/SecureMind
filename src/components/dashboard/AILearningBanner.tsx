import { Brain, Camera, Clock, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AILearningBannerProps {
  camerasInObservation: number;
  daysRemaining: number;
  learningProgress: number;
}

export function AILearningBanner({
  camerasInObservation,
  daysRemaining,
  learningProgress,
}: AILearningBannerProps) {
  return (
    <div className="glass-card p-6 border-warning/30 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-warning/5 via-warning/10 to-warning/5 animate-pulse" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-warning/20 border border-warning/30">
            <Brain className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-warning">
              AI Learning Mode Active
            </h2>
            <p className="text-sm text-muted-foreground">
              Building intelligent threat detection patterns
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-warning/70" />
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {camerasInObservation}
              </p>
              <p className="text-xs text-muted-foreground">Cameras Learning</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-warning/70" />
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {daysRemaining}d
              </p>
              <p className="text-xs text-muted-foreground">Days Remaining</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-warning/70" />
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {learningProgress}%
              </p>
              <p className="text-xs text-muted-foreground">Progress</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={learningProgress} className="h-2 bg-muted" />
          <p className="text-xs text-muted-foreground">
            The AI is learning normal patterns to reduce false alarms and improve threat detection accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}
