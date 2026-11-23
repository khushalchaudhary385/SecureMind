import { useState } from 'react';
import { QrCode, Bluetooth, Wifi, X, Camera, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type PairingMethod = 'qr' | 'bluetooth' | 'wifi';

interface AddCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCamera: (name: string, location: string) => void;
}

const pairingMethods = [
  {
    id: 'qr' as PairingMethod,
    icon: QrCode,
    title: 'QR / Code Scan',
    description: 'Scan the QR code on your camera',
  },
  {
    id: 'bluetooth' as PairingMethod,
    icon: Bluetooth,
    title: 'Bluetooth Pairing',
    description: 'Connect via Bluetooth',
  },
  {
    id: 'wifi' as PairingMethod,
    icon: Wifi,
    title: 'Wi-Fi Discovery',
    description: 'Find cameras on your network',
  },
];

export function AddCameraModal({ isOpen, onClose, onAddCamera }: AddCameraModalProps) {
  const [step, setStep] = useState<'method' | 'details' | 'connecting'>('method');
  const [selectedMethod, setSelectedMethod] = useState<PairingMethod | null>(null);
  const [cameraName, setCameraName] = useState('SecureMind Pro');
  const [location, setLocation] = useState('');

  const handleMethodSelect = (method: PairingMethod) => {
    setSelectedMethod(method);
    setStep('connecting');
    
    // Simulate connection
    setTimeout(() => {
      setStep('details');
    }, 2000);
  };

  const handleSubmit = () => {
    if (cameraName && location) {
      onAddCamera(cameraName, location);
      handleClose();
    }
  };

  const handleClose = () => {
    setStep('method');
    setSelectedMethod(null);
    setCameraName('SecureMind Pro');
    setLocation('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Add Camera
          </DialogTitle>
        </DialogHeader>

        {step === 'method' && (
          <div className="space-y-3 pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Select a pairing method to connect your camera
            </p>
            {pairingMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handleMethodSelect(method.id)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl border',
                  'transition-all duration-200 hover:scale-[1.01]',
                  'border-border/50 hover:border-primary/50 bg-muted/30 hover:bg-muted/50'
                )}
              >
                <div className="p-3 rounded-xl bg-primary/20 text-primary border border-primary/30">
                  <method.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{method.title}</p>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}

        {step === 'connecting' && (
          <div className="py-12 text-center">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <Camera className="absolute inset-0 m-auto w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-display font-semibold mb-2">
              Connecting...
            </h3>
            <p className="text-sm text-muted-foreground">
              Searching for cameras via{' '}
              {selectedMethod === 'qr'
                ? 'QR scan'
                : selectedMethod === 'bluetooth'
                ? 'Bluetooth'
                : 'Wi-Fi'}
            </p>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-4 pt-4">
            <div className="p-4 rounded-xl bg-safe/10 border border-safe/30">
              <div className="flex items-center gap-2 text-safe mb-2">
                <Camera className="w-4 h-4" />
                <span className="font-medium">Camera Found!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Configure your camera details to complete setup
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Camera Name
                </label>
                <Input
                  value={cameraName}
                  onChange={(e) => setCameraName(e.target.value)}
                  className="bg-muted/50 border-border/50"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Location
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Front Door, Backyard"
                  className="bg-muted/50 border-border/50"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setStep('method')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!cameraName || !location}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Add Camera
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
