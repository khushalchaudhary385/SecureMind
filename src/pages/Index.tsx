import { useState } from 'react';
import { Camera, Activity, AlertTriangle, Shield } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { AILearningBanner } from '@/components/dashboard/AILearningBanner';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { CameraCard } from '@/components/dashboard/CameraCard';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { ProtocolStatus } from '@/components/dashboard/ProtocolStatus';
import { AddCameraModal } from '@/components/modals/AddCameraModal';
import { CameraViewModal } from '@/components/modals/CameraViewModal';
import { AlertDetailModal } from '@/components/modals/AlertDetailModal';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { useSecuritySystem } from '@/hooks/useSecuritySystem';
import { ThreatLevel } from '@/types/camera';
import { useToast } from '@/hooks/use-toast';

const threatLevelConfig: Record<ThreatLevel, { label: string; variant: 'safe' | 'warning' | 'threat' }> = {
  safe: { label: 'Safe', variant: 'safe' },
  elevated: { label: 'Elevated', variant: 'warning' },
  critical: { label: 'Critical', variant: 'threat' },
};

export default function Index() {
  const {
    cameras,
    alerts,
    systemStatus,
    selectedCamera,
    selectedAlert,
    settings,
    setSelectedCamera,
    setSelectedAlert,
    addCamera,
    markAsFalseAlarm,
    confirmThreat,
    clearAllAlerts,
    markAllAlertsRead,
    updateSettings,
  } = useSecuritySystem();

  const { toast } = useToast();
  const [isAddCameraOpen, setIsAddCameraOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleAddCamera = (name: string, location: string) => {
    addCamera({
      name,
      location,
      status: 'online',
      isRecording: false,
      learningDaysLeft: 7,
      hasVideo: true,
      hasAudio: true,
      isSafe: true,
    });
    toast({
      title: "Camera Added",
      description: `${name} at ${location} is now connected and monitoring.`,
    });
  };

  const handleClearAllAlerts = () => {
    clearAllAlerts();
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been removed.",
    });
  };

  const handleMarkAllRead = () => {
    markAllAlertsRead();
    toast({
      title: "Marked as Read",
      description: "All notifications marked as read.",
    });
  };

  const handleSettingsSave = (newSettings: typeof settings) => {
    updateSettings(newSettings);
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  const threatConfig = threatLevelConfig[systemStatus.threatLevel];
  const camerasInObservation = cameras.filter((c) => c.learningDaysLeft > 0).length;

  return (
    <div className="min-h-screen">
      <Header
        onAddCamera={() => setIsAddCameraOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        alerts={alerts}
        onAlertClick={setSelectedAlert}
        onClearAllAlerts={handleClearAllAlerts}
        onMarkAllRead={handleMarkAllRead}
      />

      <main className="container mx-auto px-6 py-8 space-y-8 animate-fade-in">
        {/* AI Learning Banner */}
        {systemStatus.learningModeActive && (
          <AILearningBanner
            camerasInObservation={camerasInObservation}
            daysRemaining={systemStatus.observationDaysLeft}
            learningProgress={systemStatus.learningProgress}
          />
        )}

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard
            title="Cameras Online"
            value={`${systemStatus.camerasOnline}/${systemStatus.totalCameras}`}
            icon={Camera}
            variant="default"
          />
          <StatusCard
            title="System Status"
            value={systemStatus.systemActive ? 'Active' : 'Inactive'}
            subtitle="AI monitoring enabled"
            icon={Activity}
            variant="safe"
            pulse
          />
          <StatusCard
            title="Active Alerts"
            value={systemStatus.activeAlerts}
            icon={AlertTriangle}
            variant={systemStatus.activeAlerts > 0 ? 'warning' : 'default'}
          />
          <StatusCard
            title="Threat Level"
            value={threatConfig.label}
            icon={Shield}
            variant={threatConfig.variant}
            pulse={systemStatus.threatLevel !== 'safe'}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cameras Grid */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Your Cameras
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cameras.map((camera) => (
                <CameraCard
                  key={camera.id}
                  camera={camera}
                  onClick={() => setSelectedCamera(camera)}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <AlertsPanel
              alerts={alerts}
              onAlertClick={setSelectedAlert}
            />
            <ProtocolStatus
              whisperActive={systemStatus.whisperProtocol}
              warningActive={systemStatus.warningProtocol}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddCameraModal
        isOpen={isAddCameraOpen}
        onClose={() => setIsAddCameraOpen(false)}
        onAddCamera={handleAddCamera}
      />

      <CameraViewModal
        camera={selectedCamera}
        cameras={cameras}
        isOpen={!!selectedCamera}
        onClose={() => setSelectedCamera(null)}
        onSwitchCamera={setSelectedCamera}
      />

      <AlertDetailModal
        alert={selectedAlert}
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
        onMarkFalseAlarm={markAsFalseAlarm}
        onConfirmThreat={confirmThreat}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsSave}
      />
    </div>
  );
}
