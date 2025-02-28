import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadSong, addSong, getSongUrl } from '@/lib/supabase';

export function SongUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    albumCover: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const audioFile = (form.querySelector('input[type="file"]') as HTMLInputElement).files?.[0];

    if (!audioFile) {
      setError('Please select an audio file');
      return;
    }

    try {
      setIsUploading(true);

      // Upload the audio file to Supabase storage
      console.log('Uploading file:', audioFile.name);
      const uploadData = await uploadSong(audioFile);
      console.log('Upload response:', uploadData);
      
      if (!uploadData?.path) {
        throw new Error('Upload failed - no path returned');
      }

      // Get the public URL for the uploaded file
      const audioUrl = getSongUrl(uploadData.path);
      console.log('Generated audio URL:', audioUrl);

      // Add the song to the database
      const songData = {
        title: formData.title,
        artist: formData.artist,
        album: formData.album,
        album_cover: formData.albumCover,
        audio_url: audioUrl,
        duration: 0, // You might want to calculate this from the audio file
      };
      console.log('Adding song to database:', songData);
      
      const result = await addSong(songData);
      console.log('Database insert result:', result);

      // Reset form
      setFormData({
        title: '',
        artist: '',
        album: '',
        albumCover: '',
      });
      form.reset();
      alert('Song uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload song');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto p-4">
      {error && (
        <div className="text-red-500 p-2 rounded bg-red-50 mb-4">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="title">Song Title</Label>
        <Input
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="artist">Artist</Label>
        <Input
          id="artist"
          required
          value={formData.artist}
          onChange={(e) => setFormData(prev => ({ ...prev, artist: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="album">Album</Label>
        <Input
          id="album"
          required
          value={formData.album}
          onChange={(e) => setFormData(prev => ({ ...prev, album: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="albumCover">Album Cover URL</Label>
        <Input
          id="albumCover"
          type="url"
          required
          value={formData.albumCover}
          onChange={(e) => setFormData(prev => ({ ...prev, albumCover: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="audioFile">Audio File</Label>
        <Input
          id="audioFile"
          type="file"
          required
          accept="audio/*"
        />
      </div>

      <Button type="submit" disabled={isUploading} className="w-full">
        {isUploading ? 'Uploading...' : 'Upload Song'}
      </Button>
    </form>
  );
} 