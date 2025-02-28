import { useState, useEffect } from "react";
import { popularSongs } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import SongRow from "@/components/SongRow";
import { Song } from "@/types";

interface SearchProps {
  currentSong?: Song | null;
  isPlaying?: boolean;
  onPlaySong: (song: Song) => void;
}

export default function Search({ currentSong, isPlaying, onPlaySong }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const performSearch = () => {
      setIsSearching(true);
      const query = searchQuery.toLowerCase();
      
      const results = popularSongs.filter(song => 
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
      );

      setSearchResults(results);
      setIsSearching(false);
    };

    // Add debounce to avoid too many searches while typing
    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Search</h1>
        <div className="relative w-full max-w-2xl mx-auto">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for songs, artists, or albums..."
            className="pl-10 w-full h-12 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8">
        {isSearching ? (
          <div className="text-center py-8">Searching...</div>
        ) : searchQuery ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">
              {searchResults.length 
                ? `Found ${searchResults.length} results` 
                : "No results found"}
            </h2>
            <div className="bg-card/50 rounded-xl p-4 border border-border/50">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs uppercase text-muted-foreground font-medium">
                <div className="col-span-1 flex justify-center">#</div>
                <div className="col-span-4">Title</div>
                <div className="col-span-3">Album</div>
                <div className="col-span-2">Date Added</div>
                <div className="col-span-1"></div>
                <div className="col-span-1 flex justify-end">Duration</div>
              </div>

              {/* Search Results */}
              <div className="mt-2">
                {searchResults.map((song, index) => (
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
            </div>
          </>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Start typing to search...
          </div>
        )}
      </div>
    </div>
  );
} 