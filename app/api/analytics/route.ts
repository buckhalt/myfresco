import { getInstallationId } from '~/analytics/utils';
import { createRouteHandler } from '@codaco/analytics';

export const dynamic = 'force-dynamic';

const installationId = await getInstallationId();

const routeHandler = createRouteHandler({
  installationId,
});

export { routeHandler as POST };
