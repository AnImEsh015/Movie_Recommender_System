import { useState, useEffect, useRef } from 'react';

interface Movie {
  id: number;
  title: string;
}

interface HeroSearchProps {
  movies: Movie[];
  onSearch: (movieTitle: string) => void;
  isLoading: boolean;
}

export function HeroSearch({ movies, onSearch, isLoading }: HeroSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const dropdownRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredMovies(movies.slice(0, 100)); // Show top 100 max initially
    } else {
      const lowerQuery = query.toLowerCase();
      setFilteredMovies(
        movies.filter(m => m.title.toLowerCase().includes(lowerQuery)).slice(0, 50)
      );
    }
  }, [query, movies]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (title: string) => {
    setQuery(title);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      onSearch(query);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-center text-center">
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl mb-8 tracking-tight text-paper animate-fade-in-up opacity-0">
        Find your <br className="hidden sm:block" /> next watch.
      </h1>
      
      <form onSubmit={handleSubmit} className="w-full relative animate-fade-in-up opacity-0" style={{ animationDelay: '150ms' }} ref={dropdownRef}>
        <div className="relative flex flex-col sm:flex-row items-center w-full gap-4">
          <div className="w-full relative">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search a movie you liked..."
              className="w-full bg-velvet text-paper border-2 border-velvet focus:border-marquee rounded-none px-6 py-4 text-lg font-body outline-none transition-colors placeholder:text-faint/50"
              disabled={isLoading || movies.length === 0}
            />
            {isOpen && filteredMovies.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-velvet border border-faint/20 max-h-60 overflow-y-auto z-50 shadow-xl custom-scrollbar text-left">
                {filteredMovies.map(movie => (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() => handleSelect(movie.title)}
                    className="w-full text-left px-6 py-3 hover:bg-marquee/10 hover:text-marquee focus:bg-marquee/10 focus:text-marquee focus:outline-none transition-colors font-body text-paper"
                  >
                    {movie.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !query}
            className="w-full sm:w-auto px-8 py-4 bg-marquee text-ink font-body font-semibold text-lg uppercase tracking-wide hover:bg-marquee/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            Get recommendations
          </button>
        </div>
      </form>
    </div>
  );
}
