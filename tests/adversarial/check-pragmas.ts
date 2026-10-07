import { prisma } from '../../src/lib/prisma';

async function main() {
  const journalMode = await prisma.$queryRawUnsafe('PRAGMA journal_mode;');
  const busyTimeout = await prisma.$queryRawUnsafe('PRAGMA busy_timeout;');
  const synchronous = await prisma.$queryRawUnsafe('PRAGMA synchronous;');
  console.log('PRAGMA status:', { journalMode, busyTimeout, synchronous });
}

main().catch(console.error);
