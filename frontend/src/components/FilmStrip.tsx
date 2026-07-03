import { MovieDetail, MovieCard, SkeletonCard } from './MovieCard';

interface FilmStripProps {
  movies: MovieDetail[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export function FilmStrip({ movies, isLoading, error, hasSearched }: FilmStripProps) {
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12 flex justify-center">
        <p className="font-body text-faint text-lg bg-velvet px-6 py-4 border border-marquee/30 text-center">
          {error}
        </p>
      </div>
    );
  }

  if (!hasSearched && !isLoading) {
    return (
      <div className="w-full film-strip-rail bg-ink border-y border-velvet/50 mt-8 mb-24">
        <div className="max-w-7xl mx-auto px-12 sm:px-16 py-16 flex justify-center">
          <p className="font-body text-faint text-lg italic text-center">
            Pick a film above and I'll line up five more.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full film-strip-rail bg-ink border-y border-velvet/50 mt-8 mb-24 overflow-hidden relative">
      {/* Scroll hints */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 sm:px-16 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory sm:snap-none pb-8 sm:pb-0">
          {isLoading ? (
            // Skeleton Loading State
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            // Results State
            movies.map((movie, index) => (
              <div key={movie.id} className="snap-center sm:snap-align-none">
                <MovieCard movie={movie} delayIndex={index} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
