
export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  monthlyListeners: number;
  bio: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: number;
  songs: number;
  artistId: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songCount: number;
  createdBy: string;
  songs: string[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  duration: number;
  dateAdded: string;
  isLiked?: boolean;
  audioUrl: string;
}

export interface Radio {
  id: string;
  name: string;
  coverUrl: string;
  description: string;
}
