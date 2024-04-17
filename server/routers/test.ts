import { z } from 'zod';
import { publicProcedure, router } from '~/server/trpc';

export const testRouter = router({
  greet: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(({ input: { name } }) => {
      return {
        greeting: `Hello ${name}`,
      };
    }),
});
