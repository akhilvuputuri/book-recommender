"use client"
import { useState, useEffect, FormEvent } from "react";
// import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BookCard from "../components/bookCard";

type Book = {
  title: string;
  author: string;
  image: string;
}


export default function RecommendBook() {
  const [searchTitle, setSearchTitle] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);


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
    <div className="">
      <div>
        <form className="mb-4" onSubmit={handleSubmit}>
          <Input type="text" name="searchTitle" value={searchTitle} required placeholder="Search title" onChange={e => setSearchTitle(e.target.value)} />
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