import { Shield, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationsDropdown } from '@/components/modals/NotificationsDropdown';
import { Alert } from '@/types/camera';

interface HeaderProps {
  onAddCamera: () => void;
  onOpenSettings: () => void;
  alerts: Alert[];
  onAlertClick: (alert: Alert) => void;
  onClearAllAlerts: () => void;
  onMarkAllRead: () => void;
}

export function Header({
  onAddCamera,
  onOpenSettings,
  alerts,
  onAlertClick,
  onClearAllAlerts,
  onMarkAllRead,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border/50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={"/SECUREMIND.png"} className={"w-12 h-12 rounded-full"}alt="logo" />
         { /*<div className="absolute -top-1 -right-1 w-3 h-3 bg-safe rounded-full pulse-safe" />*/}
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold gradient-text">SecureMind</h1>
          <p className="text-xs text-muted-foreground">Real-time AI Security</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onAddCamera}
          className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Camera
        </Button>
        
        <NotificationsDropdown
          alerts={alerts}
          onAlertClick={onAlertClick}
          onClearAll={onClearAllAlerts}
          onMarkAllRead={onMarkAllRead}
        />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSettings}
          className="text-muted-foreground hover:text-foreground"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
