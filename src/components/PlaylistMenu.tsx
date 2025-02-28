import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";
import { Playlist, Song } from "@/types";

interface PlaylistMenuProps {
  song: Song;
  playlists: Playlist[];
  onAddToPlaylist: (playlistId: string, song: Song) => void;
}

export function PlaylistMenu({ song, playlists, onAddToPlaylist }: PlaylistMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {playlists.length === 0 ? (
          <DropdownMenuItem disabled>No playlists created</DropdownMenuItem>
        ) : (
          playlists.map((playlist) => (
            <DropdownMenuItem
              key={playlist.id}
              onClick={() => onAddToPlaylist(playlist.id, song)}
            >
              Add to {playlist.name}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 