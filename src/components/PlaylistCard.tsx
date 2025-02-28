
import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Playlist } from "@/types";

interface PlaylistCardProps {
  playlist: Playlist;
  isPlaying?: boolean;
  onPlay: (playlist: Playlist) => void;
  orientation?: "vertical" | "horizontal";
}

const PlaylistCard = ({ 
  playlist, 
  isPlaying = false, 
  onPlay,
  orientation = "vertical" 
}: PlaylistCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (orientation === "horizontal") {
    return (
      <div 
        className="group relative flex items-center gap-4 p-3 rounded-xl overflow-hidden transition-colors duration-300 bg-card hover:bg-accent/50 border border-transparent hover:border-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onPlay(playlist)}
      >
        <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
          <img 
            src={playlist.coverUrl} 
            alt={playlist.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-sm">{playlist.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {playlist.songCount} songs • {playlist.createdBy}
          </p>
        </div>
        <div 
          className={cn(
            "absolute right-3 opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100"
          )}
        >
          <button 
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-105"
            onClick={() => onPlay(playlist)}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="group bg-card hover:bg-accent/50 rounded-xl overflow-hidden transition-colors duration-300 border border-transparent hover:border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(playlist)}
    >
      <div className="p-4 flex flex-col">
        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-muted/50">
          <img 
            src={playlist.coverUrl} 
            alt={playlist.name} 
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              isHovered && "scale-105"
            )}
          />
          <div 
            className={cn(
              "absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 flex items-center justify-center",
              isHovered && "opacity-100"
            )}
          >
            <button 
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-105"
              onClick={() => onPlay(playlist)}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-sm truncate">{playlist.name}</h3>
          <p className="text-xs text-muted-foreground truncate mt-1">
            By {playlist.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
