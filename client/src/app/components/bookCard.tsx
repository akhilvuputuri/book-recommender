import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H3, P, Small } from "@/app/typography";

const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";


type BookCardProps = {
  title: string;
  author: string;
  image: string;
};

export default function BookCard({ title, author, image }: BookCardProps) {
  const getRandomDescription = () => {
    const words = LOREM_IPSUM.split(' ');
    const randomLength = Math.floor(Math.random() * 15) + 10; // Random length between 10-25 words
    return words.slice(0, randomLength).join(' ') + '...';
  };

  return (
    <Card className="w-full max-w-xs bg-zinc-700 border-none">
      <CardHeader>
        <img
          src={image}
          alt={`Cover of ${title}`}
          className="w-full aspect-[2/3] object-cover rounded-t-lg"
        />
        <CardTitle>
          <H3>{title}</H3>
        </CardTitle>
        <Small className="">by {author}</Small>
      </CardHeader>
      {/* <CardContent>
        <P className="text-sm">
          {getRandomDescription()}
        </P>
      </CardContent> */}
    </Card>
  );
}