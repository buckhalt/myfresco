import { headers } from 'next/headers';
import { appRouter } from '~/server/router';
import { getServerSession } from '~/utils/auth';
import 'server-only';
import { createCallerFactory } from '~/server/trpc';

const createCaller = createCallerFactory(appRouter);

export const api = createCaller({
  headers: headers(),
  session: await getServerSession(),
});
