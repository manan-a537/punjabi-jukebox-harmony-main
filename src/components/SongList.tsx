import { useEffect, useState, useRef } from 'react';
import { fetchSongs, SongRow } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SongList() {
  const [songs, setSongs] = useState<SongRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState<SongRow | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Keep track of audio element events
  const audioEvents = useRef<string[]>([]);
  const addDebugInfo = (info: string) => {
    audioEvents.current = [...audioEvents.current, info].slice(-5); // Keep last 5 events
    setDebugInfo(audioEvents.current.join('\n'));
  };

  useEffect(() => {
    loadSongs();
  }, []);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    
    // Add all possible audio events for debugging
    const events = [
      'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended',
      'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play',
      'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled',
      'suspend', 'timeupdate', 'volumechange', 'waiting'
    ];

    events.forEach(eventName => {
      audio.addEventListener(eventName, (e) => {
        addDebugInfo(`Audio event: ${eventName}`);
        if (eventName === 'error') {
          const err = (e.target as HTMLAudioElement).error;
          addDebugInfo(`Error details: ${err?.code} - ${err?.message}`);
        }
      });
    });

    // Add error handling
    audio.onerror = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      const errorMessage = target.error?.message || 'Unknown error';
      const errorCode = target.error?.code || 'No code';
      console.error('Audio error:', { code: errorCode, message: errorMessage });
      setError(`Error playing song (${errorCode}): ${errorMessage}`);
      addDebugInfo(`Audio error: ${errorMessage}`);
    };

    setAudioElement(audio);

    // Cleanup
    return () => {
      events.forEach(eventName => {
        audio.removeEventListener(eventName, () => {});
      });
      audio.pause();
      audio.src = '';
    };
  }, []);

  const loadSongs = async () => {
    try {
      const songsData = await fetchSongs();
      console.log('Fetched songs:', songsData);
      addDebugInfo(`Fetched ${songsData.length} songs`);
      setSongs(songsData);
    } catch (error) {
      console.error('Error loading songs:', error);
      setError('Failed to load songs');
      addDebugInfo(`Error loading songs: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const playSong = async (song: SongRow) => {
    if (!audioElement) return;

    try {
      addDebugInfo(`Attempting to play: ${song.title}`);
      console.log('Attempting to play song:', song);
      console.log('Audio URL:', song.audio_url);

      if (currentSong?.id === song.id) {
        // Toggle play/pause for current song
        if (audioElement.paused) {
          addDebugInfo('Resuming paused song');
          const playPromise = audioElement.play();
          if (playPromise) {
            await playPromise.catch(err => {
              console.error('Play error:', err);
              setError(`Failed to play: ${err.message}`);
              addDebugInfo(`Play error: ${err.message}`);
            });
          }
        } else {
          addDebugInfo('Pausing playing song');
          audioElement.pause();
        }
      } else {
        // Play new song
        addDebugInfo(`Setting new audio source: ${song.audio_url}`);
        audioElement.src = song.audio_url;
        const playPromise = audioElement.play();
        if (playPromise) {
          await playPromise.catch(err => {
            console.error('Play error:', err);
            setError(`Failed to play: ${err.message}`);
            addDebugInfo(`Play error: ${err.message}`);
          });
        }
        setCurrentSong(song);
      }
    } catch (err) {
      console.error('Play error:', err);
      setError('Failed to play song');
      addDebugInfo(`General error: ${err}`);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading songs...</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {error && (
        <div className="text-red-500 p-2 rounded bg-red-50 mb-4">
          {error}
        </div>
      )}

      {debugInfo && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Debug Log:</h3>
          <pre className="whitespace-pre-wrap text-sm">
            {debugInfo}
          </pre>
        </div>
      )}

      {songs.length === 0 ? (
        <div className="text-center p-4">No songs available. Please upload some songs first.</div>
      ) : (
        songs.map((song) => (
          <Card key={song.id} className="overflow-hidden">
            <CardContent className="p-4 flex items-center gap-4">
              <img
                src={song.album_cover}
                alt={`${song.album} cover`}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
                <p className="text-sm text-gray-400">{song.album}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Audio URL: {song.audio_url}
                </p>
              </div>
              <Button
                variant={currentSong?.id === song.id ? "secondary" : "default"}
                onClick={() => playSong(song)}
              >
                {currentSong?.id === song.id && !audioElement?.paused ? 'Pause' : 'Play'}
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
} 