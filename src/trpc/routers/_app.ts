import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
// tRPC router
export const appRouter = createTRPCRouter({
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      // Go to database and get the vedio
      console.log("User is:", { dbUser: opts.ctx.user });
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
