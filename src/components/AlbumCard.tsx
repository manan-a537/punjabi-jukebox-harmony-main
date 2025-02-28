
import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Album } from "@/types";

interface AlbumCardProps {
  album: Album;
  isPlaying?: boolean;
  onPlay: (album: Album) => void;
}

const AlbumCard = ({ album, isPlaying = false, onPlay }: AlbumCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group bg-card hover:bg-accent/50 rounded-xl overflow-hidden transition-colors duration-300 border border-transparent hover:border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(album)}
    >
      <div className="p-4 flex flex-col">
        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-muted/50">
          <img 
            src={album.coverUrl} 
            alt={album.title} 
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
              onClick={() => onPlay(album)}
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
          <h3 className="font-medium text-sm truncate">{album.title}</h3>
          <p className="text-xs text-muted-foreground truncate mt-1">
            {album.artist} • {album.year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
