import { db } from "@/db";
import { users, videoReactions, videos, videoViews } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { z } from "zod";
import { eq, and, or, lt, desc, ilike, getTableColumns } from "drizzle-orm";
// Infinite studio video fetching logic
export const searchRouter = createTRPCRouter({
  // Zod ensures type secruity at runtime
  // If the client sends invalid data
  //  tRPC will automatically reject the request
  getMany: baseProcedure
    .input(
      z.object({
        query: z.string().nullish(),
        categoryId: z.string().uuid().nullish(),
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      }),
    )
    .query(async ({ input }) => {
      const { cursor, limit, query, categoryId } = input;
      const data = await db
        .select({
          ...getTableColumns(videos),
          user: users,
          //View counts
          viewCounts: db.$count(videoViews, eq(videoViews.videoId, videos.id)),
          //Like Counts
          likeCounts: db.$count(
            videoReactions,
            and(
              eq(videoReactions.videoId, videos.id),
              eq(videoReactions.type, "like"),
            ),
          ),
          //Dislike counts
          dislikeCounts: db.$count(
            videoReactions,
            and(
              eq(videoReactions.videoId, videos.id),
              eq(videoReactions.type, "dislike"),
            ),
          ),
        })
        .from(videos)
        .innerJoin(users, eq(videos.userId, users.id))
        .where(
          and(
            eq(videos.visibility, "public"),
            ilike(videos.title, `%${query}%`),
            categoryId ? eq(videos.categoryId, categoryId) : undefined,
            cursor
              ? or(
                  lt(videos.updatedAt, cursor.updatedAt),
                  and(
                    eq(videos.updatedAt, cursor.updatedAt),
                    lt(videos.id, cursor.id),
                  ),
                )
              : undefined,
          ),
        )
        .orderBy(desc(videos.updatedAt), desc(videos.id))
        // Check if the data length exceed the limit
        .limit(limit + 1);

      const hasMore = data.length > limit;
      const items = hasMore ? data.slice(0, -1) : data;

      // Set the nextCursor if there is more data to fetch
      const lastItem = items[items.length - 1];
      const nextCursor = hasMore
        ? {
            id: lastItem.id,
            updatedAt: lastItem.updatedAt,
          }
        : null;
      return {
        items,
        nextCursor,
      };
    }),
});
