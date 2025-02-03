import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Dialog, DialogContent,DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  Download,
  Fullscreen,
  X,
  Volume2,
  VolumeX,
  PlayCircle,
  PauseCircle,
  RotateCw,
  Minimize2,
  Rewind,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPreview {
  videoUrl: string;
  onClose: () => void;
  isOpen: boolean;
}

const VideoPreview = ({ isOpen, onClose, videoUrl }: VideoPreview) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 0.5 : 0);
  };

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played * 100);
  };

  const handleSeek = (value: number[]) => {
    if (playerRef.current) {
      playerRef.current.seekTo(value[0] / 100, "fraction");
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    return hh ? `${hh}:${mm.toString().padStart(2, "0")}:${ss}` : `${mm}:${ss}`;
  };

  const VolumeControl = () => (
    <div className="group relative flex items-center">
      <button
        onClick={handleMuteToggle}
        className="mr-2 rounded-sm opacity-70 hover:opacity-100"
      >
        {isMuted ? (
          <VolumeX className="h-6 w-6 text-white" />
        ) : (
          <Volume2 className="h-6 w-6 text-white" />
        )}
      </button>
      <div className="hidden w-24 group-hover:block">
        <Slider
          value={[volume * 100]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );

  const controls = [
    {
      icon: isPlaying ? PauseCircle : PlayCircle,
      onClick: handlePlayPause,
      title: isPlaying ? "Pause" : "Play",
    },
    {
      icon: Rewind,
      onClick: () =>
        playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10),
      title: "Rewind 10s",
    },
    {
      icon: Rewind,
      onClick: () =>
        playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10),
      title: "Forward 10s",
    },
    {
      Component: VolumeControl,
    },
    {
      icon: RotateCw,
      onClick: () => {
        const speeds = [0.5, 1, 1.5, 2];
        const currentIndex = speeds.indexOf(playbackRate);
        setPlaybackRate(speeds[(currentIndex + 1) % speeds.length]);
      },
      title: `${playbackRate}x`,
    },
    {
      icon: isFullscreen ? Minimize2 : Fullscreen,
      onClick: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        } else {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      },
      title: isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen",
    },
    {
      icon: Download,
      onClick: async () => {
        try {
          const response = await fetch(videoUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = videoUrl.split("/").pop() || "video";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Error downloading video:", error);
        }
      },
      title: "Download",
    },
    {
      icon: X,
      onClick: onClose,
      title: "Close",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle />
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-hidden border-none bg-black/80 p-4 md:p-6 lg:p-10">
        <div className="z-50 flex w-full items-center justify-end gap-4 bg-black/80 md:gap-6">
          {controls.map((control, index) => (
            <div key={index}>
              {control.Component ? (
                <control.Component />
              ) : (
                <button
                  onClick={control.onClick}
                  title={control.title}
                  className={cn(
                    control.title === "Forward 10s" && "rotate-180",
                    "rounded-sm opacity-70 transition-opacity hover:opacity-100"
                  )}
                >
                  <control.icon className="h-6 w-6 text-white" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden">
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            playing={isPlaying}
            volume={volume}
            muted={isMuted}
            playbackRate={playbackRate}
            width="100%"
            height="100%"
            style={{ backgroundColor: "black" }}
            onProgress={handleProgress}
            onDuration={handleDuration}
            progressInterval={1000}
          />
        </div>

        <div className="mt-4 space-y-2">
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-white">
            <span>{formatTime((progress / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPreview;
