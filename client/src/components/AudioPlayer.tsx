import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  transcript?: string;
}

export function AudioPlayer({ audioUrl, title, transcript }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="p-8" data-testid="audio-player">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-6 mb-6">
        <Button
          size="icon"
          variant="default"
          className="h-16 w-16 rounded-full"
          onClick={togglePlayPause}
          data-testid="button-play-pause"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>

        <div className="flex-1">
          <h4 className="font-serif text-lg font-semibold mb-2">{title}</h4>
          <div className="flex items-center gap-4">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSliderChange}
              className="flex-1"
              data-testid="slider-audio-progress"
            />
            <span className="text-sm text-muted-foreground min-w-[80px] text-right" data-testid="text-audio-time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        <Volume2 className="h-5 w-5 text-muted-foreground" />
      </div>

      {transcript && (
        <div className="border-t pt-6">
          <Button
            variant="ghost"
            onClick={() => setShowTranscript(!showTranscript)}
            className="gap-2"
            data-testid="button-toggle-transcript"
          >
            <FileText className="h-4 w-4" />
            {showTranscript ? "Hide" : "Show"} Transcript
          </Button>

          {showTranscript && (
            <div className="mt-4 p-4 bg-muted rounded-md" data-testid="text-transcript">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{transcript}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
