export type CameraStatus = 'online' | 'offline';
export type ThreatLevel = 'safe' | 'elevated' | 'critical';
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertType = 'motion' | 'whisper' | 'intrusion' | 'audio';

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: CameraStatus;
  isRecording: boolean;
  learningDaysLeft: number;
  hasVideo: boolean;
  hasAudio: boolean;
  isSafe: boolean;
  lastActivity?: Date;
}

export interface Alert {
  id: string;
  cameraId: string;
  cameraName: string;
  type: AlertType;
  severity: AlertSeverity;
  timestamp: Date;
  description: string;
  isResolved: boolean;
  footage?: string;
}

export interface SystemStatus {
  camerasOnline: number;
  totalCameras: number;
  systemActive: boolean;
  activeAlerts: number;
  threatLevel: ThreatLevel;
  whisperProtocol: boolean;
  warningProtocol: boolean;
  learningModeActive: boolean;
  learningProgress: number;
  observationDaysLeft: number;
}
