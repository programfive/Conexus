import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Download,
  Fullscreen,
  RotateCcwSquare,
  RotateCwSquare,
  X,
  ZoomIn,
  ZoomOut,
  Minimize2,
} from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ImagePreview {
  imageUrl: string;
  onClose: () => void;
  isOpen: boolean;
}

export const ImagePreview = ({ isOpen, onClose, imageUrl }: ImagePreview) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotateClockwise = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleRotateCounterClockwise = () => {
    setRotation(prev => (prev - 90) % 360);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageUrl.split('/').pop() || 'image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }, [imageUrl]);

  const controls = [
    { icon: ZoomIn, onClick: handleZoomIn },
    { icon: ZoomOut, onClick: handleZoomOut },
    { 
      icon: isFullscreen ? Minimize2 : Fullscreen, 
      onClick: handleFullscreen,
      title: isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
    },
    { icon: RotateCwSquare, onClick: handleRotateClockwise },
    { icon: RotateCcwSquare, onClick: handleRotateCounterClockwise },
    { icon: Download, onClick: handleDownload },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle />
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-hidden border-none bg-black/80 p-4 md:p-6 lg:p-10">
        <div className="bg-black/80 w-full justify-center z-50 flex items-center gap-4 md:gap-6">
          {controls.map((control, index) => (
            <button
              key={index}
              onClick={control.onClick}
              title={control.title}
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100"
            >
              <control.icon className="h-6 w-6 text-white" />
            </button>
          ))}
        </div>

        <div className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden">
          <div 
            className="relative h-full w-full transition-transform duration-200 ease-in-out"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
            }}
          >
            <img
              src={imageUrl}
              alt="Preview"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-contain"
              
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};