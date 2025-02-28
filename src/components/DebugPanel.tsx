import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function DebugPanel() {
  const [songs, setSongs] = useState<any[]>([]);
  const [storageFiles, setStorageFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDebugData() {
      try {
        // Fetch songs from database
        const { data: songsData, error: songsError } = await supabase
          .from('songs')
          .select('*');
        
        if (songsError) throw songsError;
        setSongs(songsData || []);

        // List files in storage
        const { data: filesData, error: filesError } = await supabase
          .storage
          .from('songs')
          .list();
        
        if (filesError) throw filesError;
        setStorageFiles(filesData || []);

      } catch (err) {
        console.error('Debug data loading error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load debug data');
      } finally {
        setLoading(false);
      }
    }

    loadDebugData();
  }, []);

  if (loading) return <div>Loading debug data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Debug Information</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Songs in Database ({songs.length})</h3>
        <pre className="bg-white p-2 rounded overflow-auto max-h-40">
          {JSON.stringify(songs, null, 2)}
        </pre>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Files in Storage ({storageFiles.length})</h3>
        <pre className="bg-white p-2 rounded overflow-auto max-h-40">
          {JSON.stringify(storageFiles, null, 2)}
        </pre>
      </div>
    </div>
  );
} 