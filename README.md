# 🎬 Movie Recommender System

A machine learning-powered Movie Recommendation System that suggests movies similar to a user's favorite movie using a **Content-Based Filtering** approach.

The project covers the complete workflow from data preprocessing and feature engineering to model building and deployment through an interactive web application.

---

## Demo

https://movie-recommender-system-flax.vercel.app

---

## Features

- Search from thousands of movies
- Content-based movie recommendations
- Interactive web interface
- Movie posters fetched using TMDB API
- Fast recommendation generation using Cosine Similarity
- Clean and responsive UI

---

## Project Workflow

```
TMDB Dataset
      │
      ▼
Data Cleaning
      │
      ▼
Feature Engineering
      │
      ▼
Tag Generation
      │
      ▼
Count Vectorization
      │
      ▼
Cosine Similarity
      │
      ▼
Movie Recommendation
```

---

## Tech Stack

### Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- NLTK

### Backend

- Python 3
- FastAPI
- Uvicorn
- Pandas
- NumPy
- Scikit-learn
- Pickle
- HTTPX
- TMDB API
- Render (Deployment)

### Frontend

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Custom CSS Animations
- Axios (API Communication)
- Vercel (Deployment)

### Deployment

- Render
- Vercel

---

## Dataset

This project uses the **TMDB 5000 Movie Dataset** containing:

- Movie Metadata
- Cast Information
- Crew Information
- Genres
- Keywords
- Overview
- Ratings

---

## Folder Structure

```
Movie_Recommender_System
│
├── backend
├── frontend
├── data
├── models
├── notebooks
├── images
├── app.py
├── README.md
├── requirements.txt
└── render.yaml
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/AnImEsh015/Movie_Recommender_System.git
```

Move into the project

```bash
cd Movie_Recommender_System
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
streamlit run app.py
```

---

## Recommendation Technique

The recommendation engine uses **Content-Based Filtering**.

The following movie features are combined:

- Genres
- Keywords
- Cast
- Director
- Overview

The combined textual features are transformed using **CountVectorizer**, and **Cosine Similarity** is used to identify movies with similar characteristics.

---

## Future Improvements

- User Authentication
- Collaborative Filtering
- Hybrid Recommendation System
- Movie Ratings
- Watchlist Feature
- Personalized Recommendations
- Dark Mode

---


## Author

**Animesh Kumar**

- GitHub: https://github.com/AnImEsh015
