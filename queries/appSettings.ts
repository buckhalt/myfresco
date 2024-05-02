import { unstable_cache } from 'next/cache';
import 'server-only';
import { api } from '~/trpc/server';

export const getAppSettings = unstable_cache(
  api.appSettings.get,
  ['appSettings'],
  { tags: ['appSettings', 'allowAnonymousRecruitment', 'limitInterviews'] },
);

export const getAnonymousRecruitmentStatus = unstable_cache(
  api.appSettings.getAnonymousRecruitmentStatus,
  ['allowAnonymousRecruitment'],
  { tags: ['appSettings', 'allowAnonymousRecruitment'] },
);

export const getLimitInterviewsStatus = unstable_cache(
  api.appSettings.getLimitInterviewsStatus,
  ['limitInterviews'],
  {
    tags: ['appSettings', 'limitInterviews'],
  },
);
