"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

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
    <div className="flex justify-center items-center h-screen">
      <Carousel 
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full max-w-2xl"
      >
        <CarouselContent className="-ml-1">
          {bookImages.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card className="bg-gray-700 border-none">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img
                    src={image}
                    // alt={`Cover of ${imeg}`}
                    className="w-full aspect-[2/3] object-cover rounded-t-lg"
                  />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
      )}
    </div>
  );
}