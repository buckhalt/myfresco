import { MockContext, Context, createMockContext } from '~/server/context';
import { getAppSettings } from '~/server/routers/appSettings';
import { prismaMock } from '~/singleton';

// import functions

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test('should create new appSettings', async () => {
  const appSettings = {
    configured: true,
    initializedAt: new Date(),
    allowAnonymousRecruitment: true,
    limitInterviews: false,
    installationId: 'test-installation',
  };
  prismaMock.appSettings.create.mockResolvedValue(appSettings);

  await expect(getAppSettings()).resolves.toEqual({
    ...appSettings,
    expired: false,
  });
});
