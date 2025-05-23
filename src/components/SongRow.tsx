import { useState } from "react";
import { Play, Pause, Heart, MoreHorizontal, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Song } from "@/types";
import { PlaylistMenu } from "./PlaylistMenu";
import { usePlaylist } from "@/hooks/usePlaylist";
import { Button } from "@/components/ui/button";
import { useLikedSongs } from "@/hooks/useLikedSongs";

interface SongRowProps {
  song: Song;
  index: number;
  isCurrentSong?: boolean;
  isPlaying?: boolean;
  onPlay: (song: Song) => void;
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

const SongRow = ({ 
  song, 
  index, 
  isCurrentSong = false, 
  isPlaying = false, 
  onPlay,
  showRemoveButton,
  onRemove
}: SongRowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playlists, addSongToPlaylist } = usePlaylist();
  const { isLiked, toggleLike } = useLikedSongs();
  
  const formatTime = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  
  return (
    <div 
      className={cn(
        "group grid grid-cols-12 gap-4 px-4 py-2 rounded-md items-center transition-colors",
        "hover:bg-accent/50",
        isCurrentSong && "bg-accent text-primary"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(song)}
    >
      {/* Index/Play Column */}
      <div className="col-span-1 flex items-center justify-center">
        {(isHovered || isCurrentSong) ? (
          <button 
            className="w-8 h-8 flex items-center justify-center text-foreground"
            onClick={() => onPlay(song)}
          >
            {isCurrentSong && isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 ml-0.5" />
            )}
          </button>
        ) : (
          <span className={cn(
            "text-sm text-muted-foreground",
            isCurrentSong && "text-primary"
          )}>
            {index + 1}
          </span>
        )}
      </div>
      
      {/* Title and Artist */}
      <div className="col-span-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
          <img src={song.albumCover} alt={song.title} className="h-full w-full object-cover" />
        </div>
        <div className="truncate">
          <div className={cn(
            "text-sm font-medium truncate",
            isCurrentSong && "text-primary"
          )}>
            {song.title}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {song.artist}
          </div>
        </div>
      </div>
      
      {/* Album */}
      <div className="col-span-3 truncate">
        <span className="text-sm text-muted-foreground hover:text-foreground truncate">
          {song.album}
        </span>
      </div>
      
      {/* Date Added */}
      <div className="col-span-2 truncate">
        <span className="text-sm text-muted-foreground">
          {song.dateAdded}
        </span>
      </div>
      
      {/* Like Button */}
      <div className="col-span-1 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleLike(song)}
          className={isLiked(song.id) ? "text-primary" : ""}
        >
          <Heart className={`h-4 w-4 ${isLiked(song.id) ? "fill-current" : ""}`} />
        </Button>
      </div>
      
      {/* Playlist Menu */}
      <div className="col-span-1 flex items-center justify-end gap-2">
        <PlaylistMenu
          song={song}
          playlists={playlists}
          onAddToPlaylist={addSongToPlaylist}
        />
        {showRemoveButton && (
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Duration */}
      <div className="col-span-1 flex items-center justify-end gap-2">
        <span className="text-sm text-muted-foreground">
          {formatTime(song.duration)}
        </span>
        <button 
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SongRow;
