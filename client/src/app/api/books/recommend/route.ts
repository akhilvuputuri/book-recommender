import { NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';

export async function POST(request: Request) {
  const redis = getRedisClient();
  
  try {
    const { searchTitle } = await request.json();
    const cacheKey = `recommendations:${searchTitle}`;

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

    const res = await fetch(`${process.env.API_URL}/get_recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchTitle }),
    });

    const data = await res.json();

    if (redis) {
      try {
        await redis.setex(cacheKey, 3600, JSON.stringify(data));
      } catch (error) {
        console.warn('Redis caching failed:', error);
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Request failed:', error);
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}