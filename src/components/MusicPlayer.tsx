import { useState, useRef, useEffect } from "react";
import { 
  Play, Pause, SkipForward, SkipBack, 
  Volume2, Volume1, VolumeX, Repeat, Shuffle, 
  Heart, ListMusic, MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Song } from "@/types";

interface MusicPlayerProps {
  song?: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const MusicPlayer = ({ 
  song, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious 
}: MusicPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      // Add event listeners for debugging
      const audio = audioRef.current;
      
      const handleError = (e: ErrorEvent) => {
        console.error("Audio error:", {
          error: e.error,
          message: e.message,
          filename: e.filename,
          lineno: e.lineno,
          colno: e.colno
        });
      };

      const handleLoadError = () => {
        const error = audio.error;
        console.error("Audio load error:", {
          code: error?.code,
          message: error?.message,
          networkState: audio.networkState,
          readyState: audio.readyState
        });
      };

      audio.addEventListener('error', handleLoadError);
      window.addEventListener('error', handleError);

      if (isPlaying) {
        console.log("Attempting to play audio:", {
          src: audio.src,
          currentTime: audio.currentTime,
          readyState: audio.readyState
        });
        
        audio.play().catch(error => {
          console.error("Playback failed:", {
            error,
            src: audio.src,
            readyState: audio.readyState,
            networkState: audio.networkState
          });
        });
      } else {
        audio.pause();
      }

      return () => {
        audio.removeEventListener('error', handleLoadError);
        window.removeEventListener('error', handleError);
      };
    }
  }, [isPlaying, song]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const VolumeIcon = isMuted || volume === 0 
    ? VolumeX 
    : volume < 0.5 
      ? Volume1 
      : Volume2;

  if (!song) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t z-50 transition-all duration-300 animate-slide-up">
      <div className="container max-w-screen-xl mx-auto px-4 py-3">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Song Info */}
          <div className="col-span-3 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-md overflow-hidden">
              <img 
                src={song.albumCover} 
                alt={song.title} 
                className={cn("w-full h-full object-cover", isPlaying && "album-rotation playing")}
              />
            </div>
            <div className="truncate">
              <h4 className="text-sm font-medium truncate">{song.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
            </div>
            <button 
              onClick={() => setIsLiked(!isLiked)} 
              className="ml-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-primary text-primary")} />
            </button>
          </div>

          {/* Player Controls */}
          <div className="col-span-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4 mb-2">
                <button 
                  onClick={() => setIsShuffleOn(!isShuffleOn)} 
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    isShuffleOn && "text-primary"
                  )}
                >
                  <Shuffle className="h-4 w-4" />
                </button>
                <button 
                  onClick={onPrevious}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <SkipBack className="h-5 w-5" />
                </button>
                <button 
                  onClick={onPlayPause}
                  className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                </button>
                <button 
                  onClick={onNext}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setIsRepeatOn(!isRepeatOn)}
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    isRepeatOn && "text-primary"
                  )}
                >
                  <Repeat className="h-4 w-4" />
                </button>
              </div>
              
              <div className="w-full flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {formatTime(currentTime)}
                </span>
                <div 
                  ref={progressBarRef}
                  onClick={handleProgressClick}
                  className="music-progress-bar flex-1 cursor-pointer"
                >
                  <div 
                    className="progress"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>

          {/* Extra Controls */}
          <div className="col-span-3 flex items-center justify-end gap-3">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <ListMusic className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <VolumeIcon className="h-4 w-4" />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-20 h-1 appearance-none bg-muted rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={song.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
        loop={isRepeatOn}
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default MusicPlayer;
