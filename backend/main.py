import os
import pickle
import pandas as pd
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Late Show Movie Recommender")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data models (paths are relative to backend/ directory when run)
# We assume the backend is run from the root, or we use absolute paths. 
# Better to use absolute path or relative to project root.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MOVIES_PKL_PATH = os.path.join(BASE_DIR, 'movies.pkl')
DISTANCES_PKL_PATH = os.path.join(BASE_DIR, 'movies_distances.pkl')

try:
    movies_df = pickle.load(open(MOVIES_PKL_PATH, 'rb'))
    similarity = pickle.load(open(DISTANCES_PKL_PATH, 'rb'))
except FileNotFoundError:
    print("Could not load .pkl files. Make sure they are in the project root.")
    movies_df = pd.DataFrame(columns=['id', 'title'])
    similarity = []

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3"

class MovieBase(BaseModel):
    id: int
    title: str

class MovieDetail(MovieBase):
    poster_url: Optional[str] = None
    year: Optional[str] = None
    overview: Optional[str] = None
    similarity_score: Optional[float] = None

@app.get("/movies", response_model=List[MovieBase])
def get_movies():
    """Return a list of all movies to populate the dropdown/search."""
    movies = []
    for _, row in movies_df.iterrows():
        movies.append(MovieBase(id=row['id'], title=row['title']))
    return movies

async def fetch_tmdb_metadata(movie_id: int) -> dict:
    if not TMDB_API_KEY:
        return {}
    
    url = f"{TMDB_BASE_URL}/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=5.0)
            if response.status_code == 200:
                data = response.json()
                poster_path = data.get("poster_path")
                release_date = data.get("release_date", "")
                
                return {
                    "poster_url": f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else None,
                    "year": release_date.split("-")[0] if release_date else None,
                    "overview": data.get("overview")
                }
    except Exception as e:
        print(f"TMDB fetch error: {e}")
    return {}

@app.get("/recommend", response_model=List[MovieDetail])
async def recommend(movie: str):
    """Return top 5 movie recommendations."""
    if movies_df.empty or len(similarity) == 0:
        raise HTTPException(status_code=500, detail="Model data not loaded.")

    try:
        movie_index = movies_df[movies_df['title'] == movie].index[0]
    except IndexError:
        raise HTTPException(status_code=404, detail="Movie not found.")

    distances = similarity[movie_index]
    # top 5 similar movies (skipping the first one which is the movie itself)
    movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]

    recommendations = []
    for i in movie_list:
        idx = i[0]
        score = i[1]
        row = movies_df.iloc[idx]
        movie_id = row['id']
        title = row['title']
        
        metadata = await fetch_tmdb_metadata(movie_id)
        
        recommendations.append(MovieDetail(
            id=movie_id,
            title=title,
            similarity_score=round(float(score) * 100, 1),  # % match
            poster_url=metadata.get("poster_url"),
            year=metadata.get("year"),
            overview=metadata.get("overview")
        ))
        
    return recommendations
