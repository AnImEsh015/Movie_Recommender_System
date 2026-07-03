import { useState, useEffect } from 'react';
import { HeroSearch } from './components/HeroSearch';
import { FilmStrip } from './components/FilmStrip';
import { MovieDetail } from './components/MovieCard';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [movies, setMovies] = useState<{id: number, title: string}[]>([]);
  const [recommendations, setRecommendations] = useState<MovieDetail[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Fetch initial movie list
    fetch(`${API_BASE_URL}/movies`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          setError("Failed to load movie catalog.");
        }
      })
      .catch(() => setError("Couldn't reach the recommender backend. Is it running?"))
      .finally(() => setIsLoadingList(false));
  }, []);

  const handleSearch = async (title: string) => {
    setHasSearched(true);
    setIsLoadingRecs(true);
    setError(null);
    setRecommendations([]);

    try {
      const response = await fetch(`${API_BASE_URL}/recommend?movie=${encodeURIComponent(title)}`);
      if (!response.ok) {
        throw new Error("API Error");
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      setError("Couldn't reach the recommender. Try again.");
    } finally {
      setIsLoadingRecs(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col">
      <main className="flex-grow flex flex-col items-center pt-8 sm:pt-16">
        <HeroSearch 
          movies={movies} 
          onSearch={handleSearch} 
          isLoading={isLoadingList} 
        />
        
        <FilmStrip 
          movies={recommendations} 
          isLoading={isLoadingRecs} 
          error={error} 
          hasSearched={hasSearched}
        />
      </main>
      
      <footer className="w-full text-center py-6 text-faint font-mono text-xs border-t border-velvet/50 mt-auto">
        Late Show &copy; {new Date().getFullYear()} &mdash; Find your next watch.
      </footer>
    </div>
  );
}

export default App;
