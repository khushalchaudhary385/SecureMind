import { useState, useCallback } from 'react';
import { Camera, Alert, SystemStatus } from '@/types/camera';
import { AppSettings, defaultSettings } from '@/components/modals/SettingsModal';

const initialCameras: Camera[] = [
  {
    id: '1',
    name: 'SecureMind Pro',
    location: 'Front Entrance',
    status: 'online',
    isRecording: true,
    learningDaysLeft: 5,
    hasVideo: true,
    hasAudio: true,
    isSafe: true,
  },
  {
    id: '2',
    name: 'SecureMind Pro',
    location: 'Back Yard',
    status: 'online',
    isRecording: false,
    learningDaysLeft: 5,
    hasVideo: true,
    hasAudio: true,
    isSafe: true,
  },
  {
    id: '3',
    name: 'SecureMind Mini',
    location: 'Garage',
    status: 'online',
    isRecording: false,
    learningDaysLeft: 7,
    hasVideo: true,
    hasAudio: false,
    isSafe: true,
  },
  {
    id: '4',
    name: 'SecureMind Pro',
    location: 'Living Room',
    status: 'offline',
    isRecording: false,
    learningDaysLeft: 0,
    hasVideo: true,
    hasAudio: true,
    isSafe: true,
  },
];

const initialAlerts: Alert[] = [
  {
    id: '1',
    cameraId: '1',
    cameraName: 'Front Entrance',
    type: 'motion',
    severity: 'low',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    description: 'Motion detected near front door',
    isResolved: false,
  },
  {
    id: '2',
    cameraId: '2',
    cameraName: 'Back Yard',
    type: 'audio',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    description: 'Unusual sound pattern detected',
    isResolved: false,
  },
  {
    id: '3',
    cameraId: '3',
    cameraName: 'Garage',
    type: 'motion',
    severity: 'low',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    description: 'Movement detected in garage area',
    isResolved: true,
  },
];

const initialStatus: SystemStatus = {
  camerasOnline: 3,
  totalCameras: 4,
  systemActive: true,
  activeAlerts: 2,
  threatLevel: 'safe',
  whisperProtocol: true,
  warningProtocol: true,
  learningModeActive: true,
  learningProgress: 28,
  observationDaysLeft: 5,
};

export function useSecuritySystem() {
  const [cameras, setCameras] = useState<Camera[]>(initialCameras);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(initialStatus);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const addCamera = useCallback((camera: Omit<Camera, 'id'>) => {
    const newCamera: Camera = {
      ...camera,
      id: Date.now().toString(),
    };
    setCameras((prev) => [...prev, newCamera]);
    setSystemStatus((prev) => ({
      ...prev,
      totalCameras: prev.totalCameras + 1,
      camerasOnline: camera.status === 'online' ? prev.camerasOnline + 1 : prev.camerasOnline,
    }));
  }, []);

  const resolveAlert = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isResolved: true } : alert
      )
    );
    setSystemStatus((prev) => ({
      ...prev,
      activeAlerts: Math.max(0, prev.activeAlerts - 1),
    }));
  }, []);

  const markAsFalseAlarm = useCallback((alertId: string) => {
    resolveAlert(alertId);
  }, [resolveAlert]);

  const confirmThreat = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, severity: 'critical' } : alert
      )
    );
    setSystemStatus((prev) => ({
      ...prev,
      threatLevel: 'critical',
    }));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
    setSystemStatus((prev) => ({
      ...prev,
      activeAlerts: 0,
    }));
  }, []);

  const markAllAlertsRead = useCallback(() => {
    setAlerts((prev) =>
      prev.map((alert) => ({ ...alert, isResolved: true }))
    );
    setSystemStatus((prev) => ({
      ...prev,
      activeAlerts: 0,
    }));
  }, []);

  const updateSettings = useCallback((newSettings: AppSettings) => {
    setSettings(newSettings);
    // Update system status based on protocol settings
    setSystemStatus((prev) => ({
      ...prev,
      whisperProtocol: newSettings.protocols.whisperEnabled,
      warningProtocol: newSettings.protocols.warningEnabled,
    }));
  }, []);

  return {
    cameras,
    alerts,
    systemStatus,
    selectedCamera,
    selectedAlert,
    settings,
    setSelectedCamera,
    setSelectedAlert,
    addCamera,
    resolveAlert,
    markAsFalseAlarm,
    confirmThreat,
    clearAllAlerts,
    markAllAlertsRead,
    updateSettings,
  };
}
