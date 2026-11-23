import { Bell, CheckCircle, Clock, Trash2, X } from 'lucide-react';
import { Alert, AlertSeverity } from '@/types/camera';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationsDropdownProps {
  alerts: Alert[];
  onAlertClick: (alert: Alert) => void;
  onClearAll: () => void;
  onMarkAllRead: () => void;
}

const severityColors: Record<AlertSeverity, string> = {
  low: 'bg-safe/20 border-safe/30',
  medium: 'bg-warning/20 border-warning/30',
  high: 'bg-warning/30 border-warning/40',
  critical: 'bg-threat/20 border-threat/30',
};

const severityDot: Record<AlertSeverity, string> = {
  low: 'bg-safe',
  medium: 'bg-warning',
  high: 'bg-warning',
  critical: 'bg-threat',
};

export function NotificationsDropdown({
  alerts,
  onAlertClick,
  onClearAll,
  onMarkAllRead,
}: NotificationsDropdownProps) {
  const unreadCount = alerts.filter((a) => !a.isResolved).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-threat text-threat-foreground text-xs rounded-full flex items-center justify-center font-medium pulse-threat">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 glass-card border-border/50"
        align="end"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <h3 className="font-display font-semibold text-foreground">
            Notifications
          </h3>
          {alerts.length > 0 && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllRead}
                className="text-xs text-muted-foreground hover:text-foreground h-7 px-2"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Mark all read
              </Button>
            </div>
          )}
        </div>

        {/* Notifications list */}
        <ScrollArea className="max-h-80">
          {alerts.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No notifications</p>
              <p className="text-xs text-muted-foreground/70">
                You're all caught up!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {alerts.map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => onAlertClick(alert)}
                  className={cn(
                    'w-full p-4 text-left transition-colors hover:bg-muted/30',
                    !alert.isResolved && 'bg-muted/10'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                        severityDot[alert.severity],
                        !alert.isResolved && 'animate-pulse'
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          'text-sm truncate',
                          alert.isResolved
                            ? 'text-muted-foreground'
                            : 'text-foreground font-medium'
                        )}
                      >
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{alert.cameraName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(alert.timestamp, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {alerts.length > 0 && (
          <div className="p-3 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="w-full text-xs text-muted-foreground hover:text-threat gap-2"
            >
              <Trash2 className="w-3 h-3" />
              Clear all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
