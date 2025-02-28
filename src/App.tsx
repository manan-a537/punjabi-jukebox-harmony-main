import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SongUpload } from "@/components/SongUpload";
import { SongList } from "@/components/SongList";
import { DebugPanel } from "@/components/DebugPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
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

export default App;
