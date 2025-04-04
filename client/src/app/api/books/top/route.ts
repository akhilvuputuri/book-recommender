import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";

export async function GET() {
  const redis = getRedisClient();
  const cacheKey = "top_books";

  try {
    if (redis) {
      try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
          console.log(`Cache hit for ${cacheKey}`);
          return NextResponse.json(JSON.parse(cachedData));
        }
      } catch (error) {
        console.warn("Redis operation failed:", error);
      }
    }

    const res = await fetch(`${process.env.API_URL}/get_top_books`);
    const data = await res.json();

    if (redis) {
      try {
        await redis.setex(cacheKey, 3600, JSON.stringify(data));
      } catch (error) {
        console.warn("Redis caching failed:", error);
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Request failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch top books" },
      { status: 500 }
    );
  }
}
