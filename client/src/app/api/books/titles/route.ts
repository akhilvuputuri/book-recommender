import { NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';

export async function GET() {
  const redis = getRedisClient();
  const cacheKey = 'all_book_titles';

  try {
    if (redis) {
      try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
          console.log(`Cache hit for ${cacheKey}`);
          return NextResponse.json(JSON.parse(cachedData));
        }
      } catch (error) {
        console.warn('Redis operation failed:', error);
      }
    }

    const res = await fetch(`${process.env.API_URL}/get_all_book_names`);
    const data = await res.json();
    const mappedData = data.map((s: string) => ({ value: s, label: s }));

    if (redis) {
      try {
        await redis.setex(cacheKey, 3600, JSON.stringify(mappedData));
      } catch (error) {
        console.warn('Redis caching failed:', error);
      }
    }

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Request failed:', error);
    return NextResponse.json({ error: 'Failed to fetch book titles' }, { status: 500 });
  }
}