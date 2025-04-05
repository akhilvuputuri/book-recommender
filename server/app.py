from flask import Flask,request,jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd

# Local imports (pickle files)
def load_pickle_files():
    popularity_df = pd.read_pickle(open('results/popularity.pkl', 'rb'))
    pt = pd.read_pickle(open('results/pt.pkl', 'rb'))
    books = pd.read_pickle(open('results/books.pkl', 'rb'))
    similarity_scores = pd.read_pickle(open('results/similarity_scores.pkl', 'rb'))
    filtered_books = pd.read_pickle(open('results/filtered_books.pkl', 'rb'))
    return popularity_df, pt, books, similarity_scores, filtered_books

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load model data
popularity_df, pt, books, similarity_scores, filtered_books = load_pickle_files()


@app.route('/get_top_books',methods=['get'])
def get_top_books():
    return jsonify(popularity_df.rename(columns={"Book-Title": "title", "Book-Author": "author", "Image-URL-M": "image"}).to_dict('records')), 200

@app.route('/get_all_book_names',methods=['get']) 
def get_all_book_names():
    return jsonify(filtered_books), 200

@app.route('/get_recommend',methods=['post'])
def recommend():
    user_input = request.json['searchTitle']
    index = np.where(pt.index == user_input)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:6]

    data = []
    for i in similar_items:
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        item = {
            'title': temp_df.drop_duplicates('Book-Title')['Book-Title'].values[0],
            'author': temp_df.drop_duplicates('Book-Title')['Book-Author'].values[0],
            'image': temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values[0]
        }
        data.append(item)
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True)