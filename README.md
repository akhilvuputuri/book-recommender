# Book Recommender

A full-stack application that recommends books based on user preferences, built with Next.js and Flask.

## Features

- Browse top 50 recommended books
- Get personalized book recommendations using similarity index
- Redis caching for improved performance
- Responsive UI built with shadcn/ui components

## Tech Stack

### Frontend (/client)
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Redis for caching

### Backend (/server)
- Flask
- Python
- scikit-learn for recommendations

## Getting Started

### Prerequisites
- Node.js 18 or higher
- Python 3.8 or higher
- Redis

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/book-recommender.git
cd book-recommender
```

2. Set up the frontend:
```bash
cd client
npm install
cp .env.example .env.local
```

3. Set up the backend:
```bash
cd ../server
python -m venv venv
source venv/bin/activate  # On Mac/Linux
pip install -r requirements.txt
```

4. Start Redis:
```bash
brew services start redis
```

### Running the Application

1. Start the backend server:
```bash
cd server
flask --app app.py run
```

2. In a new terminal, start the frontend:
```bash
cd client
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
book-recommender/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js 14 app router
│   │   ├── components/    # React components
│   │   ├── lib/          # Utilities and configurations
│   │   └── utils/        # Helper functions
│   └── public/           # Static assets
└── server/               # Flask backend
    ├── app.py           # Main Flask application
    ├── requirements.txt    # Python dependencies
    ├── analysis/          # Datasets and jupyter notebook
    └── results/          # Results from analysis used by API
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_URL=http://127.0.0.1:5000
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Backend (.env)
```
FLASK_APP=app.py
FLASK_ENV=development
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.