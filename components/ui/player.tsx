import { useState, useRef } from "react";
import type { PlayerProps } from "next-video";
import ReactPlayer from "react-player";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Play, Pause, Maximize } from "lucide-react";

export default function Player(props: PlayerProps) {
  const { src, poster, ...rest } = props;
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setMuted(value[0] === 0);
  };

  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
  };

  const handleSeekChange = (value: number[]) => {
    setPlayed(value[0]);
    playerRef.current?.seekTo(value[0]);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleFullscreen = () => {
    const element = document.querySelector(".player-wrapper");
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen();
      }
    }
  };

  const format = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <div className="player-wrapper relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      <ReactPlayer
        ref={playerRef}
        className="absolute left-0 top-0"
        width="100%"
        height="100%"
        url={src}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        config={{ file: { attributes: { poster } } }}
        {...rest}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <Slider
          className="mb-4"
          value={[played]}
          max={1}
          step={0.001}
          onValueChange={handleSeekChange}
          onPointerDown={handleSeekMouseDown}
          onPointerUp={handleSeekMouseUp}
        />

        <div className="flex items-center gap-4">
          <button
            className="text-white hover:text-white/80"
            onClick={handlePlayPause}
          >
            {playing ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>

          <div className="flex w-32 items-center gap-2">
            <button
              className="text-white hover:text-white/80"
              onClick={toggleMute}
            >
              {muted || volume === 0 ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </button>
            <Slider
              className="w-24"
              value={[muted ? 0 : volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
            />
          </div>

          <div className="text-sm text-white">
            {format(played * (playerRef.current?.getDuration() || 0))}
          </div>

          <div className="ml-auto">
            <button
              className="text-white hover:text-white/80"
          
  
              onClick={handleFullscreen}
            >
              <Maximize className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
