
import { useState } from "react";
import { Play, Pause, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Song } from "@/types";

interface SongCardProps {
  song: Song;
  isCurrentSong?: boolean;
  isPlaying?: boolean;
  onPlay: (song: Song) => void;
}

const SongCard = ({ 
  song, 
  isCurrentSong = false, 
  isPlaying = false, 
  onPlay 
}: SongCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(song.isLiked || false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  return (
    <div 
      className={cn(
        "group bg-card hover:bg-accent/50 rounded-xl overflow-hidden transition-colors duration-300",
        "border border-transparent hover:border-border",
        isCurrentSong && "border-primary/30 bg-accent/80"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(song)}
    >
      <div className="p-4 flex flex-col">
        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-muted/50">
          <img 
            src={song.albumCover} 
            alt={song.title} 
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              (isHovered || isCurrentSong) && "scale-105"
            )}
          />
          <div 
            className={cn(
              "absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 flex items-center justify-center",
              (isHovered || isCurrentSong) && "opacity-100"
            )}
          >
            <button 
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-105"
              onClick={() => onPlay(song)}
            >
              {isCurrentSong && isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">{song.title}</h3>
            <p className="text-xs text-muted-foreground truncate mt-1">{song.artist}</p>
          </div>
          <button 
            onClick={handleLike}
            className={cn(
              "opacity-0 group-hover:opacity-100 transition-opacity",
              isLiked && "opacity-100",
              "text-muted-foreground hover:text-primary transition-colors",
              isLiked && "text-primary"
            )}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-primary")} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
