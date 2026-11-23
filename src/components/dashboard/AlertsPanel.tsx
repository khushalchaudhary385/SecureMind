import { AlertTriangle, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { Alert, AlertSeverity } from '@/types/camera';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface AlertsPanelProps {
  alerts: Alert[];
  onAlertClick: (alert: Alert) => void;
}

const severityStyles: Record<AlertSeverity, string> = {
  low: 'border-safe/30 bg-safe/10',
  medium: 'border-warning/30 bg-warning/10',
  high: 'border-warning/50 bg-warning/20',
  critical: 'border-threat/30 bg-threat/10',
};

const severityIcons: Record<AlertSeverity, string> = {
  low: 'text-safe',
  medium: 'text-warning',
  high: 'text-warning',
  critical: 'text-threat',
};

export function AlertsPanel({ alerts, onAlertClick }: AlertsPanelProps) {
  const activeAlerts = alerts.filter((a) => !a.isResolved);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display font-semibold text-foreground">
          Recent Alerts
        </h2>
        {activeAlerts.length === 0 && (
          <span className="flex items-center gap-1.5 text-sm text-safe">
            <CheckCircle className="w-4 h-4" />
            All Clear
          </span>
        )}
      </div>

      {activeAlerts.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-safe/50 mx-auto mb-3" />
          <p className="text-muted-foreground">No active alerts</p>
          <p className="text-sm text-muted-foreground/70">Your system is secure</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activeAlerts.slice(0, 5).map((alert) => (
            <div
              key={alert.id}
              onClick={() => onAlertClick(alert)}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl border cursor-pointer',
                'transition-all duration-200 hover:scale-[1.01]',
                severityStyles[alert.severity]
              )}
            >
              <AlertTriangle className={cn('w-5 h-5', severityIcons[alert.severity])} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {alert.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{alert.cameraName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
