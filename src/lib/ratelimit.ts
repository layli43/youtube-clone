import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "10s"),
});

redis.set("aaa", 1);
