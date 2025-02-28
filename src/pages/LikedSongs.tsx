import { useState, useEffect } from "react";
import { popularSongs } from "@/data/mockData";
import { Song } from "@/types";
import SongRow from "@/components/SongRow";
import { Heart } from "lucide-react";

interface LikedSongsProps {
  currentSong?: Song | null;
  isPlaying?: boolean;
  onPlaySong: (song: Song) => void;
}

export default function LikedSongs({ currentSong, isPlaying, onPlaySong }: LikedSongsProps) {
  const [likedSongs, setLikedSongs] = useState<Song[]>(() => {
    const saved = localStorage.getItem('liked-songs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('liked-songs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex items-end gap-6 mb-8">
        <div className="w-48 h-48 bg-gradient-to-br from-pink-600 to-purple-700 rounded-lg flex items-center justify-center">
          <Heart className="h-24 w-24 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Liked Songs</h1>
          <p className="text-muted-foreground mt-2">
            {likedSongs.length} liked songs
          </p>
        </div>
      </div>

      <div className="bg-card/50 rounded-xl p-4 border border-border/50">
        {likedSongs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No liked songs yet. Start liking songs to see them here!
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs uppercase text-muted-foreground font-medium">
              <div className="col-span-1 flex justify-center">#</div>
              <div className="col-span-4">Title</div>
              <div className="col-span-3">Album</div>
              <div className="col-span-2">Date Added</div>
              <div className="col-span-1"></div>
              <div className="col-span-1 flex justify-end">Duration</div>
            </div>

            {/* Songs */}
            <div className="mt-2">
              {likedSongs.map((song, index) => (
                <SongRow
                  key={song.id}
                  song={song}
                  index={index}
                  isCurrentSong={currentSong?.id === song.id}
                  isPlaying={isPlaying && currentSong?.id === song.id}
                  onPlay={onPlaySong}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 