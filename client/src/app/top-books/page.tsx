type Book = {
  title: string;
  author: string;
  url: string;
}

export default async function TopBooks() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch("http://127.0.0.1:5000/get_top_books", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer YOUR_PRIVATE_KEY"
    },
  });
  const books: Book[] = await res.json();
  return (
    <ul className="space-y-4 p-4 ">
      {books.map((book: Book) => (
        <li key={book.title} className="p-4 bg-white shadow-md rounded-lg text-gray-700">
          {book.title} ({book.author})
        </li>
      ))} 
    </ul>
  )
}