import pandas as pd
import streamlit as st
import pickle
from sklearn.metrics.pairwise import cosine_similarity

new_df = pickle.load(open('movies.pkl','rb'))
similarity = pickle.load(open('movies_distances.pkl','rb'))

def recommender(movie):
    movie_index = new_df[new_df['title'] == movie].index[0]
    distances = similarity[movie_index]
    movie_list = sorted(list(enumerate(distances)),reverse = True,key = lambda x: x[1])[1:6]
    recommendation = []
    for i in movie_list:
        recommendation.append(new_df.iloc[i[0]]['title'])
    return recommendation

movie_list = new_df['title'].values
st.title('Movie Recommendation System')

option = st.selectbox('Select Movie', movie_list)

button = st.button('Get Movie Recommendation')
if button:
    recommendation = recommender(option)
    for item in recommendation:
        st.write(item)


