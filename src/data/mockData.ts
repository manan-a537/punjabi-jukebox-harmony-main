import { Artist, Album, Playlist, Song, Radio } from "@/types";

export const featuredArtists: Artist[] = [
  {
    id: "artist1",
    name: "Diljit Dosanjh",
    imageUrl: "https://images.pexels.com/photos/4348094/pexels-photo-4348094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    monthlyListeners: 15200000,
    bio: "Diljit Dosanjh is a Punjabi singer, actor, and television presenter. He has established himself as one of the leading artists in the Punjabi music industry."
  },
  {
    id: "artist2",
    name: "AP Dhillon",
    imageUrl: "https://images.pexels.com/photos/7561175/pexels-photo-7561175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    monthlyListeners: 9800000,
    bio: "AP Dhillon is a Punjabi singer, songwriter, and record producer known for his hit songs like 'Brown Munde', 'Excuses', and 'Insane'."
  },
  {
    id: "artist3",
    name: "Sidhu Moose Wala",
    imageUrl: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    monthlyListeners: 14500000,
    bio: "Sidhu Moose Wala was a Punjabi singer, lyricist, and actor known for his contributions to Punjabi music and culture."
  },
  {
    id: "artist4",
    name: "Karan Aujla",
    imageUrl: "https://images.pexels.com/photos/1916821/pexels-photo-1916821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    monthlyListeners: 8900000,
    bio: "Karan Aujla is a Punjabi singer, rapper, and lyricist. He is known for his songs like 'Don't Worry', 'Chitta Kurta', and 'Sheikh'."
  },
  {
    id: "artist5",
    name: "Guru Randhawa",
    imageUrl: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    monthlyListeners: 12300000,
    bio: "Guru Randhawa is a Punjabi singer and songwriter known for songs like 'Lahore', 'High Rated Gabru', and 'Suit Suit'."
  },
  {
    id: "artist6",
    name: "Harrdy Sandhu",
    imageUrl: "https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    monthlyListeners: 7500000,
    bio: "Harrdy Sandhu is a Punjabi singer, actor, and former cricketer known for songs like 'Kya Baat Ay', 'Naah', and 'Backbone'."
  }
];

export const topAlbums: Album[] = [
  {
    id: "album1",
    title: "G.O.A.T.",
    artist: "Diljit Dosanjh",
    coverUrl: "https://images.pexels.com/photos/894156/pexels-photo-894156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2020,
    songs: 16,
    artistId: "artist1"
  },
  {
    id: "album2",
    title: "Hidden Gems",
    artist: "AP Dhillon",
    coverUrl: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2022,
    songs: 8,
    artistId: "artist2"
  },
  {
    id: "album3",
    title: "Moosetape",
    artist: "Sidhu Moose Wala",
    coverUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2021,
    songs: 32,
    artistId: "artist3"
  },
  {
    id: "album4",
    title: "BTFU",
    artist: "Karan Aujla",
    coverUrl: "https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2021,
    songs: 12,
    artistId: "artist4"
  },
  {
    id: "album5",
    title: "MAN OF THE MOON",
    artist: "Guru Randhawa",
    coverUrl: "https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2022,
    songs: 10,
    artistId: "artist5"
  },
  {
    id: "album6",
    title: "Restless",
    artist: "Harrdy Sandhu",
    coverUrl: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    year: 2023,
    songs: 7,
    artistId: "artist6"
  }
];

export const trendingPlaylists: Playlist[] = [
  {
    id: "playlist1",
    name: "Punjabi Hits 2023",
    description: "The hottest Punjabi songs of the year, all in one playlist.",
    coverUrl: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    songCount: 50,
    createdBy: "Punjabi Jukebox",
    songs: ["song1", "song2", "song3", "song4", "song5"]
  },
  {
    id: "playlist2",
    name: "Bhangra Classics",
    description: "Timeless Bhangra hits that will make you dance.",
    coverUrl: "https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    songCount: 35,
    createdBy: "Punjabi Jukebox",
    songs: ["song6", "song7", "song8", "song9", "song10"]
  },
  {
    id: "playlist3",
    name: "Chill Punjabi Vibes",
    description: "Relaxing Punjabi songs for your downtime.",
    coverUrl: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    songCount: 42,
    createdBy: "Punjabi Jukebox",
    songs: ["song11", "song12", "song13", "song14", "song15"]
  },
  {
    id: "playlist4",
    name: "Punjabi Party Mix",
    description: "Energetic Punjabi tracks for your party needs.",
    coverUrl: "https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    songCount: 28,
    createdBy: "Punjabi Jukebox",
    songs: ["song16", "song17", "song18", "song19", "song20"]
  }
];

export const popularSongs: Song[] = [
  {
    id: "song1",
    title: "Brown Munde",
    artist: "AP Dhillon, Gurinder Gill, Shinda Kahlon",
    album: "Brown Munde - Single",
    albumCover: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: 242,
    dateAdded: "2 weeks ago",
    isLiked: true,
    audioUrl: "https://lwnqzgchcnruxmlyzwmk.supabase.co/storage/v1/object/public/songs//Brown%20Munde%20-%20AP%20Dhillon,%20Gminxr,%20Gurinder%20Gill,%20Shinda%20Kahlon.m4a"
  },
  {
    id: "song2",
    title: "295",
    artist: "Sidhu Moose Wala",
    album: "Moosetape",
    albumCover: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: 318,
    dateAdded: "3 months ago",
    isLiked: false,
    audioUrl: "https://lwnqzgchcnruxmlyzwmk.supabase.co/storage/v1/object/public/songs//295%20(Official%20Audio)%20%20Sidhu%20Moose%20Wala%20%20The%20Kidd%20%20Moosetape.mp3"
  },
  {
    id: "song3",
    title: "Lover",
    artist: "Diljit Dosanjh",
    album: "G.O.A.T.",
    albumCover: "https://images.pexels.com/photos/894156/pexels-photo-894156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: 187,
    dateAdded: "1 month ago",
    isLiked: false,
    audioUrl: "https://lwnqzgchcnruxmlyzwmk.supabase.co/storage/v1/object/public/songs//Lover%20-%20Diljit%20Dosanjh.m4a"
  },
  {
    id: "song4",
    title: "Excuses",
    artist: "AP Dhillon, Gurinder Gill",
    album: "Hidden Gems",
    albumCover: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: 176,
    dateAdded: "2 months ago",
    isLiked: true,
    audioUrl: "https://lwnqzgchcnruxmlyzwmk.supabase.co/storage/v1/object/public/songs//Excuses%20-%20AP%20Dhillon,%20Gurinder%20Gill,%20Intense.m4a"
  },
  {
    id: "song5",
    title: "GOAT",
    artist: "Diljit Dosanjh",
    album: "G.O.A.T.",
    albumCover: "https://images.pexels.com/photos/894156/pexels-photo-894156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: 213,
    dateAdded: "1 week ago",
    isLiked: false,
    audioUrl: "https://lwnqzgchcnruxmlyzwmk.supabase.co/storage/v1/object/public/songs//GOAT%20-%20Diljit%20Dosanjh.m4a"
  },
  {
    id: "song6",
    title: "Old Skool",
    artist: "Sidhu Moose Wala, Prem Dhillon",
    album: "Moosetape",
    albumCover: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: 285,
    dateAdded: "6 months ago",
    isLiked: true,
    audioUrl: "https://lwnqzgchcnruxmlyzwmk.supabase.co/storage/v1/object/public/songs//Old%20Skool%20-%20Prem%20Dhillon,%20Sidhu%20Moosewala,%20Naseeb.m4a"
  },
  {
    id: "song7",
    title: "Insane",
    artist: "AP Dhillon, Gurinder Gill, Shinda Kahlon",
    album: "Hidden Gems",
    albumCover: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: 195,
    dateAdded: "3 weeks ago",
    isLiked: false,
    audioUrl: "https://lwnqzgchcnruxmlyzwmk.supabase.co/storage/v1/object/public/songs//INSANE%20-%20AP%20DHILLON%20%20GURINDER%20GILL%20%20SHINDA%20KAHLON%20(Official%20Music%20Video).mp3"
  },
  {
    id: "song8",
    title: "Clash",
    artist: "Diljit Dosanjh",
    album: "G.O.A.T.",
    albumCover: "https://images.pexels.com/photos/894156/pexels-photo-894156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: 203,
    dateAdded: "2 weeks ago",
    isLiked: false,
    audioUrl: "https://lwnqzgchcnruxmlyzwmk.supabase.co/storage/v1/object/public/songs//Diljit%20Dosanjh_%20CLASH%20(Official)%20Music%20Video%20%20G.O.A.T..mp3"
  },
  {
    id: "song9",
    title: "3 Peg",
    artist: "Sharry Mann",
    album: "Hidden Gems",
    albumCover: "https://lwnqzgchcnruxmlyzwmk.supabase.co/storage/v1/object/public/images//3-Peg-Punjabi-2016-500x500.jpg",
    duration: 188,
    dateAdded: "5 weeks ago",
    isLiked: true,
    audioUrl: "https://lwnqzgchcnruxmlyzwmk.supabase.co/storage/v1/object/public/songs//3%20Peg%20-%20Sharry%20Mann.m4a"
  },
  {
    id: "song10",
    title: "Levels",
    artist: "Sidhu Moose Wala",
    album: "Moosetape",
    albumCover: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: 274,
    dateAdded: "4 months ago",
    isLiked: false,
    audioUrl: "https://lwnqzgchcnruxmlyzwmk.supabase.co/storage/v1/object/public/songs//Levels%20(feat%20Sunny%20Malton)%20-%20Sidhu%20Moose%20Wala.m4a"
  }
];

export const recommendedRadio: Radio[] = [
  {
    id: "radio1",
    name: "Punjabi Pulse",
    coverUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "The heartbeat of Punjabi music, bringing you the latest hits."
  },
  {
    id: "radio2",
    name: "Bhangra Beats",
    coverUrl: "https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "High-energy Bhangra music to get your day moving."
  },
  {
    id: "radio3",
    name: "Desi Vibes",
    coverUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "A mix of the best Indian music, from Punjabi to Bollywood."
  }
];

export const recentlyPlayed: (Song | Album | Playlist)[] = [
  popularSongs[0],
  topAlbums[2],
  trendingPlaylists[1],
  popularSongs[3],
  topAlbums[0],
  trendingPlaylists[0]
];
