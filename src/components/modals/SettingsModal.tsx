import { useState } from 'react';
import {
  Settings,
  Bell,
  Shield,
  Volume2,
  Ear,
  Moon,
  Smartphone,
  Mail,
  Camera,
  Clock,
  Sliders,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

export interface AppSettings {
  notifications: {
    pushEnabled: boolean;
    emailEnabled: boolean;
    soundEnabled: boolean;
  };
  protocols: {
    whisperEnabled: boolean;
    warningEnabled: boolean;
    aiDetectionEnabled: boolean;
  };
  sensitivity: {
    motion: number;
    audio: number;
    whisper: number;
  };
  general: {
    darkMode: boolean;
    autoRecord: boolean;
    retentionDays: number;
  };
}

export const defaultSettings: AppSettings = {
  notifications: {
    pushEnabled: true,
    emailEnabled: false,
    soundEnabled: true,
  },
  protocols: {
    whisperEnabled: true,
    warningEnabled: true,
    aiDetectionEnabled: true,
  },
  sensitivity: {
    motion: 70,
    audio: 60,
    whisper: 80,
  },
  general: {
    darkMode: true,
    autoRecord: true,
    retentionDays: 30,
  },
};

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border/30 last:border-0">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function SensitivitySlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-3 py-4 border-b border-border/30 last:border-0">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-primary font-medium">{value}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        max={100}
        min={10}
        step={5}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Less sensitive</span>
        <span>More sensitive</span>
      </div>
    </div>
  );
}

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const updateSettings = (
    category: keyof AppSettings,
    key: string,
    value: boolean | number
  ) => {
    setLocalSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="notifications" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid grid-cols-4 bg-muted/30">
            <TabsTrigger value="notifications" className="text-xs">
              <Bell className="w-4 h-4 mr-1.5 hidden sm:block" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="protocols" className="text-xs">
              <Shield className="w-4 h-4 mr-1.5 hidden sm:block" />
              Protocols
            </TabsTrigger>
            <TabsTrigger value="sensitivity" className="text-xs">
              <Sliders className="w-4 h-4 mr-1.5 hidden sm:block" />
              Sensitivity
            </TabsTrigger>
            <TabsTrigger value="general" className="text-xs">
              <Settings className="w-4 h-4 mr-1.5 hidden sm:block" />
              General
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto mt-4">
            <TabsContent value="notifications" className="m-0">
              <SettingRow
                icon={Smartphone}
                title="Push Notifications"
                description="Receive alerts on your device"
              >
                <Switch
                  checked={localSettings.notifications.pushEnabled}
                  onCheckedChange={(v) =>
                    updateSettings('notifications', 'pushEnabled', v)
                  }
                />
              </SettingRow>
              <SettingRow
                icon={Mail}
                title="Email Alerts"
                description="Get alerts sent to your email"
              >
                <Switch
                  checked={localSettings.notifications.emailEnabled}
                  onCheckedChange={(v) =>
                    updateSettings('notifications', 'emailEnabled', v)
                  }
                />
              </SettingRow>
              <SettingRow
                icon={Volume2}
                title="Sound Alerts"
                description="Play sound for new alerts"
              >
                <Switch
                  checked={localSettings.notifications.soundEnabled}
                  onCheckedChange={(v) =>
                    updateSettings('notifications', 'soundEnabled', v)
                  }
                />
              </SettingRow>
            </TabsContent>

            <TabsContent value="protocols" className="m-0">
              <SettingRow
                icon={Ear}
                title="Whisper Protocol"
                description="Detect low-volume audio"
              >
                <Switch
                  checked={localSettings.protocols.whisperEnabled}
                  onCheckedChange={(v) =>
                    updateSettings('protocols', 'whisperEnabled', v)
                  }
                />
              </SettingRow>
              <SettingRow
                icon={Volume2}
                title="Warning Protocol"
                description="Audible deterrent on threats"
              >
                <Switch
                  checked={localSettings.protocols.warningEnabled}
                  onCheckedChange={(v) =>
                    updateSettings('protocols', 'warningEnabled', v)
                  }
                />
              </SettingRow>
              <SettingRow
                icon={Shield}
                title="AI Threat Detection"
                description="Real-time video & audio analysis"
              >
                <Switch
                  checked={localSettings.protocols.aiDetectionEnabled}
                  onCheckedChange={(v) =>
                    updateSettings('protocols', 'aiDetectionEnabled', v)
                  }
                />
              </SettingRow>
            </TabsContent>

            <TabsContent value="sensitivity" className="m-0 px-1">
              <SensitivitySlider
                label="Motion Detection"
                value={localSettings.sensitivity.motion}
                onChange={(v) => updateSettings('sensitivity', 'motion', v)}
              />
              <SensitivitySlider
                label="Audio Detection"
                value={localSettings.sensitivity.audio}
                onChange={(v) => updateSettings('sensitivity', 'audio', v)}
              />
              <SensitivitySlider
                label="Whisper Detection"
                value={localSettings.sensitivity.whisper}
                onChange={(v) => updateSettings('sensitivity', 'whisper', v)}
              />
            </TabsContent>

            <TabsContent value="general" className="m-0">
              <SettingRow
                icon={Camera}
                title="Auto-Record on Alert"
                description="Automatically record when alerts trigger"
              >
                <Switch
                  checked={localSettings.general.autoRecord}
                  onCheckedChange={(v) =>
                    updateSettings('general', 'autoRecord', v)
                  }
                />
              </SettingRow>
              <div className="py-4 border-b border-border/30">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Recording Retention</p>
                    <p className="text-sm text-muted-foreground">
                      How long to keep recorded footage
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ml-11">
                  {[7, 14, 30, 60].map((days) => (
                    <button
                      key={days}
                      onClick={() =>
                        updateSettings('general', 'retentionDays', days)
                      }
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        localSettings.general.retentionDays === days
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                      )}
                    >
                      {days}d
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex gap-3 pt-4 border-t border-border/50">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
