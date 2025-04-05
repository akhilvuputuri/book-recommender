"use client";
import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import BookCard from "../components/bookCard";
import { Autocomplete } from "../components/autocomplete";
import { getAllBookTitles, getBookRecommendations } from "@/utils/api/books";

type Book = {
  title: string;
  author: string;
  image: string;
};

export default function RecommendBook() {
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

  const [allBookTitles, setAllBookTitles] = useState<
    { value: string; label: string }[]
  >([]);
  const [filteredBookTitles, setFilteredBookTitles] = useState<
    { value: string; label: string }[]
  >([]);
  useEffect(() => {
    const fetchBookTitles = async () => {
      try {
        const mappedData = await getAllBookTitles();
        setAllBookTitles(mappedData);
        setFilteredBookTitles(mappedData);
      } catch (error) {
        console.error("Error fetching book titles:", error);
      }
    };

    fetchBookTitles();
  }, []);

  useEffect(() => {
    console.log("searchTitle changed");
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
    event.preventDefault();
    setIsLoading(true);
    try {
      const books = await getBookRecommendations(searchTitle);
      setRecommendedBooks(books);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect(() => {
  //  updateData()
  // }, [])

  return (
    <div>
      <div className="mt-8">
        <form
          className="mb-4 flex justify-center space-x-4"
          onSubmit={handleSubmit}
        >
          <Autocomplete
            selectedValue={selectedTitle}
            onSelectedValueChange={setSelectedTitle}
            searchValue={searchTitle}
            onSearchValueChange={setSearchTitle}
            items={filteredBookTitles}
            placeholder="Search for a book"
            // className="w-1/4"
          />
          <Button
            type="submit"
            size="lg"
            className="px-8 text-lg h-14 bg-zinc-900 text-zinc-100 border border-zinc-100 hover:bg-zinc-800 cursor-pointer hover:cursor-pointer"
          >
            Search
          </Button>
        </form>
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-16 p-4">
            {recommendedBooks.map(({ title, author, image }: Book) => (
              <li key={title}>
                <BookCard title={title} author={author} image={image} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
