/* eslint-disable local-rules/require-data-mapper */
import { PrismaClient, type Version } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const versionMap: Version[] = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7'];

    const protocols = await tx.protocol.findMany();
    for (const protocol of protocols) {
      const version =
        protocol.schemaVersion && protocol.schemaVersion < 7
          ? versionMap[protocol.schemaVersion - 1]
          : 'v7';
      await tx.protocol.update({
        where: { id: protocol.id },
        data: {
          version: version,
        },
      });
    }
  });
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
