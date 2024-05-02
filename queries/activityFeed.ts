/* eslint-disable local-rules/require-data-mapper */
import { unstable_cache } from 'next/cache';
import { type SearchParams } from '~/lib/data-table/types';
import { prisma } from '~/utils/db';
import 'server-only';

export const getActivities = unstable_cache(
  async (rawSearchParams: unknown) => {
    // const searchParams = SearchParamsSchema.parse(rawSearchParams);
    const searchParams = rawSearchParams as SearchParams;

    const { page, perPage, sort, sortField, filterParams } = searchParams;

    // Number of items to skip
    const offset = page > 0 ? (page - 1) * perPage : 0;

    // Generate the dynamic filter parameters for the database call from the
    // input filter params.
    const queryFilterParams = filterParams
      ? {
          OR: [
            ...filterParams.map(({ id, value }) => {
              const operator = Array.isArray(value) ? 'in' : 'contains';
              return {
                [id]: { [operator]: value },
              };
            }),
          ],
        }
      : {};

    // Transaction is used to ensure both queries are executed in a single transaction
    const [count, events] = await prisma.$transaction([
      prisma.events.count({
        where: {
          ...queryFilterParams,
        },
      }),
      prisma.events.findMany({
        take: perPage,
        skip: offset,
        orderBy: { [sortField]: sort },
        where: {
          ...queryFilterParams,
        },
      }),
    ]);

    const pageCount = Math.ceil(count / perPage);
    return { events, pageCount };
  },
  ['activityFeed'],
  {
    tags: ['activityFeed'],
  },
);

export type ActivitiesFeed = ReturnType<typeof getActivities>;
