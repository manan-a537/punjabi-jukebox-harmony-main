import { useState, useEffect } from 'react';
import { Playlist, Song } from '@/types';

export function usePlaylist() {
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem('user-playlists');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('user-playlists', JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = (name: string, description: string = '') => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      description,
      coverUrl: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      songCount: 0,
      createdBy: "User",
      songs: []
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  };

  const addSongToPlaylist = (playlistId: string, song: Song) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        const songs = playlist.songs.includes(song.id) 
          ? playlist.songs 
          : [...playlist.songs, song.id];
        return {
          ...playlist,
          songs,
          songCount: songs.length
        };
      }
      return playlist;
    }));
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        const songs = playlist.songs.filter(id => id !== songId);
        return {
          ...playlist,
          songs,
          songCount: songs.length
        };
      }
      return playlist;
    }));
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
  };

  return {
    playlists,
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist
  };
} 