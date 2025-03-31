"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Book = {
  title: string;
  author: string;
  image: string;
}

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [bookImages, setBookImages] = useState<string[]>([]);
    useEffect(() => {
      const fetchBooks = async () => {
        setIsLoading(true);
        try {
          const res = await fetch("http://127.0.0.1:5000/get_top_books", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          });
          const data = await res.json();

          // Randomly pick 10 books and extract their image attributes
          const shuffledBooks = data.sort(() => 0.5 - Math.random()); // Shuffle the array
          const selectedBooks = shuffledBooks.slice(0, 10); // Pick the first 10 books
          const bookImages = selectedBooks.map((book: Book) => book.image); // Extract the image attributes
          console.log(bookImages)
          setBookImages(bookImages); // Update the state with the resulting array
        } catch (error) {
          console.error("Failed to fetch books:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchBooks();
    }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <Carousel className="relative">
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2">
            Previous
          </CarouselPrevious>
          <CarouselContent className="flex overflow-x-auto snap-x snap-mandatory">
            {bookImages.map((image, index) => (
              <CarouselItem
                key={index}
                className="flex-shrink-0 w-1/3 h-40 bg-gray-800 text-gray-100 flex items-center justify-center rounded-lg snap-center mx-2"
              >
                <img
                  src={image}
                  alt={`Book ${index + 1}`}
                  className="w-full aspect-[2/3] object-cover rounded-t-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2">
            Next
          </CarouselNext>
        </Carousel>
      )}
    </div>
  );
}