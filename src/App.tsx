import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "./pages/NotFound";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SongUpload } from "@/components/SongUpload";
import { SongList } from "@/components/SongList";
import { DebugPanel } from "@/components/DebugPanel";
import Search from "@/pages/Search";
import Sidebar from "@/components/Sidebar";
import MusicPlayer from "@/components/MusicPlayer";
import { useState } from "react";
import { Song } from "@/types";
import PlaylistPage from "@/pages/Playlist";
import SignUp from "@/pages/SignUp";
import LikedSongs from "@/pages/LikedSongs";
import { Header } from "@/components/Header";

const queryClient = new QueryClient();

const App = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex-1 relative">
              <Header />
              <main className="flex-1 overflow-y-auto pb-28 h-full">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/liked-songs" element={<LikedSongs />} />
                  <Route path="/playlist/:id" element={<PlaylistPage />} />
                </Routes>
              </main>
              <MusicPlayer />
            </div>
          </div>
        </Router>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Punjabi Jukebox</h1>
          
          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="debug">Debug</TabsTrigger>
            </TabsList>
            <TabsContent value="songs">
              <SongList />
            </TabsContent>
            <TabsContent value="upload">
              <SongUpload />
            </TabsContent>
            <TabsContent value="debug">
              <DebugPanel />
            </TabsContent>
          </Tabs>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
