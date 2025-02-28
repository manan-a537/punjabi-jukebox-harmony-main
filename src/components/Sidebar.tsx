import { useState } from "react";
import { 
  Home, Search, Library, PlusCircle, Heart,
  ChevronRight, ChevronLeft, Download, User, UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { CreatePlaylistDialog } from "./CreatePlaylistDialog";
import { usePlaylist } from "@/hooks/usePlaylist";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { playlists, createPlaylist } = usePlaylist();
  const navigate = useNavigate();
  
  return (
    <div 
      className={cn(
        "fixed top-0 left-0 bottom-0 z-30 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[240px]",
        "h-[calc(100%-80px)]", // Adjust for music player
        className
      )}
    >
      <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden no-scrollbar p-3">
        {/* Logo & Collapse Button */}
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">PJ</span>
              </div>
              <span className="font-display font-semibold">PunjabiJukebox</span>
            </div>
          )}
          {collapsed && (
            <div className="mx-auto bg-primary w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">PJ</span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground p-1 rounded-full"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
        
        {/* Main Navigation */}
        <nav className="space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            to="/search"
            className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg"
          >
            <Search className="h-5 w-5" />
            Search
          </Link>
          <SidebarItem icon={<Library />} label="Your Library" collapsed={collapsed} />
          <SidebarItem icon={<Heart />} label="Liked Songs" collapsed={collapsed} />
        </nav>
        
        <div className="mt-6 space-y-1">
          <SidebarItem icon={<PlusCircle />} label="Create Playlist" collapsed={collapsed} />
        </div>
        
        <Separator className="my-6 bg-sidebar-foreground/10" />
        
        {/* Playlists */}
        {!collapsed && (
          <div className="flex-grow">
            <div className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/70 mb-3">
              Playlists
            </div>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-muted-foreground mb-2">
                  Your Playlists
                </h2>
                {playlists.map((playlist) => (
                  <Link
                    key={playlist.id}
                    to={`/playlist/${playlist.id}`}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg"
                  >
                    {playlist.name}
                    <span className="text-xs text-muted-foreground">
                      ({playlist.songCount})
                    </span>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        
        {/* User Actions */}
        <div className="mt-auto space-y-1">
          <SidebarItem icon={<Download />} label="Install App" collapsed={collapsed} />
          <SidebarItem icon={<User />} label="Account" collapsed={collapsed} />
        </div>
      </div>

      <div className="px-6 py-4">
        <CreatePlaylistDialog onCreatePlaylist={createPlaylist} />
      </div>

      <div className="mt-auto p-6 border-t border-border">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/signup")}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Create Account
        </Button>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({ icon, label, active, collapsed }: SidebarItemProps) => {
  return (
    <a
      href="#"
      className={cn(
        "flex items-center gap-3 py-2 px-3 text-sm font-medium rounded-md transition-colors",
        active 
          ? "text-sidebar-foreground bg-sidebar-accent"
          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </a>
  );
};

export default Sidebar;
