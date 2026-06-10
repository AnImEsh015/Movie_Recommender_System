# 🎬 Movie Recommender System

A machine learning-based movie recommendation engine that suggests movies based on user preferences. This project takes a data-driven approach, from initial exploratory data analysis to a fully functional Python recommendation script.

## 🗂️ Project Structure

The repository is structured to show the entire pipeline, from raw data processing to the final model deployment:

* **`Data analysis.ipynb`**: Contains the Exploratory Data Analysis (EDA). Used for understanding data distributions, handling missing values, and exploring relationships within the dataset.
* **`movies.ipynb` & `Recommender_model.ipynb`**: The core machine learning notebooks. These detail the feature engineering, text vectorization (e.g., Bag of Words or TF-IDF), and the implementation of the recommendation algorithm (such as Cosine Similarity).
* **`recommender_system.py`**: The final executable Python script. This is the production-ready code that serves the recommendations, potentially through a command-line interface or a web framework like Streamlit.
* **Datasets (`.csv` and `.xlsx`)**:
  * `movies_df.csv` / `movies_df_exported.xlsx`: The raw/intermediate datasets used for initial processing.
  * `movies_final.csv`: The cleaned, preprocessed dataset that the final model uses to generate recommendations.

## 🚀 Features

* **Content-Based Filtering:** Recommends movies similar to the ones a user likes by analyzing movie metadata (genres, keywords, cast, crew, etc.).
* **Data Preprocessing Pipeline:** Includes robust cleaning and feature extraction workflows.
* **Interactive/Scripted Execution:** Can be run natively as a Python script to quickly fetch top `N` similar movies.

## 💻 Tech Stack

* **Language:** Python
* **Data Manipulation & Analysis:** Pandas, NumPy
* **Machine Learning:** Scikit-Learn (for similarity matrices and text vectorization)
* **Web Integration/UI (Optional):** Streamlit (If `recommender_system.py` is built as an interactive web app)
* **Development Environment:** Jupyter Notebook
