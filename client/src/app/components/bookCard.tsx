import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BookCardProps = {
  title: string;
  author: string;
  image: string; // New prop for the image URL
};

export default function BookCard({ title, author, image }: BookCardProps) {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <img
          src={image}
          alt={`Cover of ${title}`}
          className="w-full aspect-[2/3] object-cover rounded-t-lg"
        />
        <CardTitle>{title}</CardTitle>
        <CardDescription>by {author}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Discover more about this book and its author.
        </p>
      </CardContent>
    </Card>
  );
}