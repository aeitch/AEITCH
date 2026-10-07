/**
 * Concurrency Threshold Profiler
 * Determines exact throughput and concurrency capacity of dev.db in its current configuration
 */
import { prisma } from '../../src/lib/prisma';

async function testConcurrencyLevel(level: number): Promise<{
  level: number;
  success: number;
  failed: number;
  durationMs: number;
  error?: string;
}> {
  const start = performance.now();
  const testPrefix = `prof_${level}_${Date.now()}`;
  const createdIds: string[] = [];

  const tasks = Array.from({ length: level }).map(async (_, idx) => {
    try {
      const inq = await prisma.inquiry.create({
        data: {
          name: `Profiler User ${idx}`,
          email: `${testPrefix}_u${idx}@aeitch.test`,
          message: `Testing concurrency capacity level ${level}`,
        },
      });
      createdIds.push(inq.id);
      return true;
    } catch (e: unknown) {
      return false;
    }
  });

  const results = await Promise.all(tasks);
  const durationMs = Math.round(performance.now() - start);
  const success = results.filter(Boolean).length;
  const failed = results.filter((r) => !r).length;

  // Cleanup
  if (createdIds.length > 0) {
    await prisma.inquiry.deleteMany({ where: { id: { in: createdIds } } });
  }

  return { level, success, failed, durationMs };
}

async function runProfile() {
  console.log('--- Profiling Concurrency Limits (Current SQLite delete-journal mode) ---');
  for (const count of [5, 10, 15, 20, 25, 30, 40, 50]) {
    const res = await testConcurrencyLevel(count);
    console.log(`Concurrency ${res.level}: ${res.success}/${res.level} succeeded in ${res.durationMs}ms (failed: ${res.failed})`);
    if (res.failed > 0) {
      console.log(`⚠️ Saturation / timeout threshold reached at concurrency level: ${res.level}`);
      break;
    }
  }
}

runProfile().catch(console.error);
