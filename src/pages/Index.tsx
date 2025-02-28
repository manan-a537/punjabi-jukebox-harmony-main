
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import MusicPlayer from "@/components/MusicPlayer";
import SongCard from "@/components/SongCard";
import AlbumCard from "@/components/AlbumCard";
import PlaylistCard from "@/components/PlaylistCard";
import SongRow from "@/components/SongRow";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { 
  featuredArtists, 
  topAlbums, 
  trendingPlaylists, 
  popularSongs,
  recommendedRadio,
  recentlyPlayed
} from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Song, Album, Playlist } from "@/types";

const Index = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recentlyPlayedItems, setRecentlyPlayedItems] = useState<(Song | Album | Playlist)[]>(recentlyPlayed);
  
  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };
  
  const handleNextSong = () => {
    const currentIndex = popularSongs.findIndex(song => song.id === currentSong?.id);
    if (currentIndex !== -1 && currentIndex < popularSongs.length - 1) {
      setCurrentSong(popularSongs[currentIndex + 1]);
    } else if (popularSongs.length > 0) {
      setCurrentSong(popularSongs[0]);
    }
  };
  
  const handlePreviousSong = () => {
    const currentIndex = popularSongs.findIndex(song => song.id === currentSong?.id);
    if (currentIndex !== -1 && currentIndex > 0) {
      setCurrentSong(popularSongs[currentIndex - 1]);
    } else if (popularSongs.length > 0) {
      setCurrentSong(popularSongs[popularSongs.length - 1]);
    }
  };
  
  const handlePlayAlbum = (album: Album) => {
    // In a real app, we would load the first song of the album
    const song = popularSongs.find(song => song.album.includes(album.title));
    if (song) {
      handlePlaySong(song);
    }
  };
  
  const handlePlayPlaylist = (playlist: Playlist) => {
    // In a real app, we would load the first song of the playlist
    if (playlist.songs.length > 0 && playlist.songs[0]) {
      const song = popularSongs.find(song => song.id === playlist.songs[0]);
      if (song) {
        handlePlaySong(song);
      }
    }
  };
  
  // Setup initial song
  useEffect(() => {
    if (popularSongs.length > 0 && !currentSong) {
      setCurrentSong(popularSongs[0]);
    }
  }, []);
  
  return (
    <div className="bg-background min-h-screen text-foreground dark">
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 ml-[240px] pt-5 pb-28">
          <div className="px-6 max-w-[1600px] mx-auto">
            {/* Hero Section */}
            <Hero 
              title="Experience the vibrant sounds of Punjabi music"
              subtitle="FEATURED PLAYLIST"
              description="Immerse yourself in the rich culture and energetic rhythms of Punjabi music with our curated playlists."
              image="https://images.pexels.com/photos/2191013/pexels-photo-2191013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              onPlay={() => {
                if (trendingPlaylists.length > 0) {
                  handlePlayPlaylist(trendingPlaylists[0]);
                }
              }}
              className="mb-10 h-[400px]"
            />
            
            {/* Recently Played */}
            <section className="mb-10">
              <SectionHeader 
                title="Recently Played"
                action={
                  <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
                    See all <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                }
              />
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {recentlyPlayedItems.slice(0, 6).map((item, index) => {
                  if ('title' in item && 'albumCover' in item) {
                    // It's a song
                    return (
                      <SongCard 
                        key={`song-${item.id}-${index}`}
                        song={item as Song}
                        isCurrentSong={currentSong?.id === item.id}
                        isPlaying={isPlaying && currentSong?.id === item.id}
                        onPlay={handlePlaySong}
                      />
                    );
                  } else if ('title' in item && 'coverUrl' in item) {
                    // It's an album
                    return (
                      <AlbumCard 
                        key={`album-${item.id}-${index}`}
                        album={item as Album}
                        onPlay={handlePlayAlbum}
                      />
                    );
                  } else {
                    // It's a playlist
                    return (
                      <PlaylistCard 
                        key={`playlist-${item.id}-${index}`}
                        playlist={item as Playlist}
                        onPlay={handlePlayPlaylist}
                      />
                    );
                  }
                })}
              </div>
            </section>
            
            {/* Popular Songs */}
            <section className="mb-10">
              <SectionHeader 
                title="Popular Songs"
                description="Listen to the most trending Punjabi tracks"
                action={
                  <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
                    See all <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                }
              />
              
              <div className="bg-card/50 rounded-xl p-4 border border-border/50">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs uppercase text-muted-foreground font-medium">
                  <div className="col-span-1 flex justify-center">#</div>
                  <div className="col-span-4">Title</div>
                  <div className="col-span-3">Album</div>
                  <div className="col-span-2">Date Added</div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1 flex justify-end">
                    <span>Duration</span>
                  </div>
                </div>
                
                {/* Songs */}
                <div className="mt-2">
                  {popularSongs.slice(0, 5).map((song, index) => (
                    <SongRow 
                      key={song.id}
                      song={song}
                      index={index}
                      isCurrentSong={currentSong?.id === song.id}
                      isPlaying={isPlaying && currentSong?.id === song.id}
                      onPlay={handlePlaySong}
                    />
                  ))}
                </div>
              </div>
            </section>
            
            {/* Top Albums */}
            <section className="mb-10">
              <SectionHeader 
                title="Top Albums"
                action={
                  <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
                    See all <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                }
              />
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {topAlbums.map((album) => (
                  <AlbumCard 
                    key={album.id}
                    album={album}
                    onPlay={handlePlayAlbum}
                  />
                ))}
              </div>
            </section>
            
            {/* Featured Playlists */}
            <section className="mb-10">
              <SectionHeader 
                title="Featured Playlists"
                description="Curated playlists to match your mood"
                action={
                  <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
                    See all <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                }
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingPlaylists.map((playlist) => (
                  <PlaylistCard 
                    key={playlist.id}
                    playlist={playlist}
                    onPlay={handlePlayPlaylist}
                  />
                ))}
              </div>
            </section>
            
            {/* Recommended Radio */}
            <section className="mb-10">
              <SectionHeader 
                title="Recommended Radio"
                description="Stations based on your taste"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedRadio.map((radio) => (
                  <div 
                    key={radio.id}
                    className="group relative h-40 rounded-xl overflow-hidden cursor-pointer hover-scale border border-transparent hover:border-border"
                  >
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={radio.coverUrl} 
                        alt={radio.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <h3 className="text-white font-medium">{radio.name}</h3>
                      <p className="text-white/80 text-sm mt-1">{radio.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      
      {/* Music Player */}
      <MusicPlayer 
        song={currentSong}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNextSong}
        onPrevious={handlePreviousSong}
      />
    </div>
  );
};

export default Index;
