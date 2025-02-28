import { useState, useEffect } from 'react';
import { Song } from '@/types';

export function useLikedSongs() {
  const [likedSongs, setLikedSongs] = useState<Song[]>(() => {
    const saved = localStorage.getItem('liked-songs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('liked-songs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  const toggleLike = (song: Song) => {
    setLikedSongs(prev => {
      const isLiked = prev.some(s => s.id === song.id);
      if (isLiked) {
        return prev.filter(s => s.id !== song.id);
      } else {
        return [...prev, song];
      }
    });
  };

  const isLiked = (songId: string) => {
    return likedSongs.some(song => song.id === songId);
  };

  return {
    likedSongs,
    toggleLike,
    isLiked
  };
} 