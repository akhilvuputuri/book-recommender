"use client"
import { useState, useEffect, FormEvent } from "react";
// import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BookCard from "../components/bookCard";
import { Autocomplete } from "../components/autocomplete";

type Book = {
  title: string;
  author: string;
  image: string;
}



export default function RecommendBook() {
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

  const [allBookTitles, setAllBookTitles] = useState<{ value: string; label: string }[]>([]);
  const [filteredBookTitles, setFilteredBookTitles] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    const fetchBookTitles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_all_book_names");
        if (!response.ok) {
          throw new Error("Failed to fetch book titles");
        }
        const data = await response.json();
        const mappedData = data
        // .slice(0, 50) // Take only the first 50 entries
        .map((s: string) => ({ value: s, label: s })); // Map strings to objects
        setAllBookTitles(mappedData); // Assuming setAllBookTitles expects an array of objects
        setFilteredBookTitles(mappedData)
      } catch (error) {
        console.error("Error fetching book titles:", error);
      }
    };
  
    fetchBookTitles();
  }, []);
  
  useEffect(() => {
    console.log("searchTitle changed")
    if (searchTitle === "") {
      setFilteredBookTitles(allBookTitles); // Reset to all titles if searchTitle is empty
      return;
    }
  
    const filtered = allBookTitles.filter((book) =>
      book.label.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setFilteredBookTitles(filtered);
  }, [searchTitle, allBookTitles]); // Dependencies: searchTitle and allBookTitles

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault()
    // setIsLoading(true) 
    try {
      // const formData = new FormData(event.currentTarget)
      // console.log(searchTitle)
      const res = await fetch("http://127.0.0.1:5000/get_recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
        body: JSON.stringify({ searchTitle })
      });
      // updateData()
      const books: Book[] = await res.json();
      setRecommendedBooks(books)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  // useEffect(() => {
  //  updateData()
  // }, [])

  return (
    <div>
      <div className="mt-8">
        <form className="mb-4 flex justify-center space-x-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="searchTitle"
            value={searchTitle}
            required
            placeholder="Search title"
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-1/3"
          />
          <Autocomplete
            selectedValue={selectedTitle}
            onSelectedValueChange={setSelectedTitle}
            searchValue={searchTitle}
            onSearchValueChange={setSearchTitle}
            items={filteredBookTitles}
            placeholder="Search for a book"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-16 p-4">
          {recommendedBooks.map(({title, author, image}: Book) => (
            <li key={title}>
              <BookCard title={title} author={author} image={image} />
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  )
}