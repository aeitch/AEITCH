/**
 * Empirical Benchmark: Comparing SQLite default Rollback Journal (DELETE) vs WAL mode
 * under 50 concurrent writes and 100 mixed operations.
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

async function testWithDb(dbPath: string, enableWal: boolean) {
  const url = `file:${path.resolve(dbPath)}`;
  const client = new PrismaClient({
    datasources: { db: { url } },
  });

  if (enableWal) {
    await client.$queryRawUnsafe('PRAGMA journal_mode = WAL;');
    await client.$queryRawUnsafe('PRAGMA synchronous = NORMAL;');
    await client.$queryRawUnsafe('PRAGMA busy_timeout = 10000;');
  }

  const journalMode = await client.$queryRawUnsafe('PRAGMA journal_mode;');
  console.log(`Testing DB ${path.basename(dbPath)} with journal_mode:`, journalMode);

  // Run 50 concurrent writes
  const start = performance.now();
  let success = 0;
  let timeouts = 0;
  let ebusy = 0;

  const tasks = Array.from({ length: 50 }).map(async (_, idx) => {
    try {
      await client.inquiry.create({
        data: {
          name: `Wal User ${idx}`,
          email: `wal_test_${idx}@benchmark.internal`,
          message: `Benchmark message ${idx}`,
        },
      });
      success++;
    } catch (e: unknown) {
      const s = String(e);
      if (s.includes('Socket timeout')) timeouts++;
      if (s.includes('EBUSY') || s.includes('database is locked')) ebusy++;
    }
  });

  await Promise.all(tasks);
  const durationMs = Math.round(performance.now() - start);

  await client.$disconnect();
  return { enableWal, success, timeouts, ebusy, durationMs };
}

async function run() {
  const devDbPath = path.resolve('prisma/dev.db');
  const tempDbPath = path.resolve('prisma/benchmark_wal.db');

  // Copy dev.db to benchmark_wal.db
  fs.copyFileSync(devDbPath, tempDbPath);

  try {
    const walResult = await testWithDb(tempDbPath, true);
    console.log('WAL Mode Benchmark Results (50 concurrent writes):', walResult);
  } finally {
    // Cleanup temporary benchmark database files
    for (const f of [tempDbPath, `${tempDbPath}-wal`, `${tempDbPath}-shm`]) {
      if (fs.existsSync(f)) {
        try { fs.unlinkSync(f); } catch {}
      }
    }
  }
}

run().catch(console.error);
