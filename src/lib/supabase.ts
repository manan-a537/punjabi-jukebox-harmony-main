import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our songs table
export interface SongRow {
  id: string;
  title: string;
  artist: string;
  album: string;
  album_cover: string;
  duration: number;
  audio_url: string;
  created_at: string;
}

// Function to upload a song file to Supabase storage
export async function uploadSong(file: File) {
  console.log('Starting file upload to Supabase storage');
  
  // Validate file type
  if (!file.type.startsWith('audio/')) {
    throw new Error('Invalid file type. Please upload an audio file.');
  }

  const fileName = `${Date.now()}-${file.name}`;
  console.log('Generated filename:', fileName);

  const { data, error } = await supabase.storage
    .from('songs')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Supabase storage upload error:', error);
    throw error;
  }

  console.log('Upload successful:', data);
  return data;
}

// Function to get the public URL for a song
export function getSongUrl(path: string) {
  console.log('Getting public URL for path:', path);
  const { data } = supabase.storage
    .from('songs')
    .getPublicUrl(path);
  
  // Make sure the URL is using HTTPS
  let publicUrl = data.publicUrl;
  if (publicUrl.startsWith('http://')) {
    publicUrl = publicUrl.replace('http://', 'https://');
  }
  
  console.log('Generated public URL:', publicUrl);
  return publicUrl;
}

// Function to fetch all songs from the database
export async function fetchSongs() {
  console.log('Fetching songs from database');
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Database fetch error:', error);
    throw error;
  }

  console.log('Fetched songs:', data);
  return data as SongRow[];
}

// Function to add a new song to the database
export async function addSong(songData: Omit<SongRow, 'id' | 'created_at'>) {
  console.log('Adding song to database:', songData);
  const { data, error } = await supabase
    .from('songs')
    .insert([songData])
    .select()
    .single();

  if (error) {
    console.error('Database insert error:', error);
    throw error;
  }

  console.log('Song added successfully:', data);
  return data;
} 