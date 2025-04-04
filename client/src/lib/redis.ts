import { Redis } from 'ioredis';

let redis: Redis | null = null;

export function getRedisClient() {
  if (!redis) {
    try {
      redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        maxRetriesPerRequest: 1,
        retryStrategy: () => null, // Disable retries
      });

      redis.on('error', (error) => {
        console.warn('Redis connection error:', error);
        redis = null;
      });
    } catch (error) {
      console.warn('Redis initialization failed:', error);
      return null;
    }
  }
  return redis;
}