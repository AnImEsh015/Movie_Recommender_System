export interface MovieDetail {
  id: number;
  title: string;
  poster_url?: string | null;
  year?: string | null;
  overview?: string | null;
  similarity_score?: number | null;
}

interface MovieCardProps {
  movie: MovieDetail;
  delayIndex: number;
}

export function MovieCard({ movie, delayIndex }: MovieCardProps) {
  return (
    <div 
      className="flex-shrink-0 w-64 sm:w-72 flex flex-col gap-3 group animate-slide-in opacity-0"
      style={{ animationDelay: `${delayIndex * 60}ms` }}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-velvet border border-faint/10 transition-colors duration-300 group-hover:border-marquee">
        {movie.poster_url ? (
          <img 
            src={movie.poster_url} 
            alt={`Poster for ${movie.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 text-center bg-velvet">
            <h3 className="font-display text-2xl text-faint opacity-50">{movie.title}</h3>
          </div>
        )}
        
        {/* Hover Overview Overlay */}
        <div className="absolute inset-0 bg-ink/90 p-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm pointer-events-none sm:pointer-events-auto">
          <p className="font-body text-sm text-paper/90 line-clamp-6 leading-relaxed">
            {movie.overview || "No synopsis available."}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-xl text-paper truncate" title={movie.title}>
          {movie.title}
        </h3>
        <div className="flex items-center justify-between font-mono text-xs text-faint uppercase tracking-wider">
          <span>{movie.year || "Unknown Year"}</span>
          {movie.similarity_score && (
            <span className="text-marquee">{movie.similarity_score}% Match</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-64 sm:w-72 flex flex-col gap-3">
      <div className="relative aspect-[2/3] w-full bg-velvet border border-faint/10 overflow-hidden">
        <div className="absolute inset-0 shimmer-bg animate-shimmer" />
      </div>
      <div className="flex flex-col gap-2 pt-1">
        <div className="h-6 w-3/4 bg-velvet overflow-hidden relative">
           <div className="absolute inset-0 shimmer-bg animate-shimmer" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-12 bg-velvet overflow-hidden relative">
             <div className="absolute inset-0 shimmer-bg animate-shimmer" />
          </div>
          <div className="h-4 w-16 bg-velvet overflow-hidden relative">
             <div className="absolute inset-0 shimmer-bg animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
