interface Book {
    title: string;
    author: string;
    image: string;
  }
  
  interface BookTitle {
    value: string;
    label: string;
  }
  
  export async function getTopBooks(): Promise<Book[]> {
    const res = await fetch('/api/books/top');
    if (!res.ok) {
      throw new Error('Failed to fetch top books');
    }
    return res.json();
  }
  
  export async function getAllBookTitles(): Promise<BookTitle[]> {
    const res = await fetch('/api/books/titles');
    if (!res.ok) {
      throw new Error('Failed to fetch book titles');
    }
    return res.json();
  }
  
  export async function getBookRecommendations(searchTitle: string): Promise<Book[]> {
    const res = await fetch('/api/books/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchTitle }),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch recommendations');
    }
    return res.json();
  }