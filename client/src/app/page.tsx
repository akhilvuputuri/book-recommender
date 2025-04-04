"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getTopBooks } from "@/utils/api/books";

type Book = {
  title: string;
  author: string;
  image: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookImages, setBookImages] = useState<string[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const data = await getTopBooks();

        // Randomly pick 10 books and extract their image attributes
        const shuffledBooks = data.sort(() => 0.5 - Math.random()); // Shuffle the array
        const selectedBooks = shuffledBooks.slice(0, 10); // Pick the first 10 books
        const bookImages = selectedBooks.map((book: Book) => book.image); // Extract the image attributes
        console.log(bookImages);
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
    <div className="w-full max-w-7xl mx-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full max-w-7xl"
            opts={{
              loop: true,  // Enable infinite looping
            }}
          >
            <CarouselContent className="-ml-1">
              {bookImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/3 lg:basis-1/5" // Changed from lg:basis-1/3 to lg:basis-1/5
                >
                  <div className="p-2">
                    <Card className="bg-zinc-700 border-none">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src={image}
                          alt={`Book cover ${index + 1}`} // Fixed the alt text
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
