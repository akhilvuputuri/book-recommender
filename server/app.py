from flask import Flask,request,jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

popularity_df = pd.read_pickle(open('popularity.pkl','rb'))
pt = pd.read_pickle(open('pt.pkl','rb'))
books = pd.read_pickle(open('books.pkl','rb'))
similarity_scores = pd.read_pickle(open('similarity_scores.pkl','rb'))
filtered_books = pd.read_pickle(open('filtered_books.pkl','rb'))

app = Flask(__name__)
CORS(app)

# @app.route('/')
# def index():
#     return render_template('index.html',
#                            book_name = list(popularity_df['Book-Title'].values),
#                            author=list(popularity_df['Book-Author'].values),
#                            image=list(popularity_df['Image-URL-M'].values),
#                            votes=list(popularity_df['num_ratings'].values),
#                            rating=list(popularity_df['avg_rating'].values)
#                            )

# @app.route('/recommend')
# def recommend_ui():
#     return render_template('recommend.html')

@app.route('/get_top_books',methods=['get'])
def get_top_books():
    return jsonify(popularity_df.rename(columns={"Book-Title": "title", "Book-Author": "author", "Image-URL-M": "image"}).to_dict('records')), 200

@app.route('/get_all_book_names',methods=['get']) 
def get_all_book_names():
    return jsonify(filtered_books), 200

@app.route('/get_recommend',methods=['post'])
def recommend():
    print("REQUEST")
    print(request.json)
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

    # print(data)

    return jsonify(data), 200

# @app.route('/recommend_books',methods=['post'])
# def recommend():
    user_input = request.form.get('user_input')
    index = np.where(pt.index == user_input)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:5]

    data = []
    for i in similar_items:
        item = []
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))

        data.append(item)

    print(data)

    return render_template('recommend.html',data=data)

if __name__ == '__main__':
    app.run(debug=True)