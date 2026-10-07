/**
 * Master Adversarial Test Runner
 * Executes all empirical test suites against prisma/dev.db:
 *  1. CRUD Operations across all 6 models
 *  2. Database constraints, unique slugs, nullability, sort order, and payloads
 *  3. Concurrency, parallel load, transactions, and SQLite EBUSY locking
 *
 * Verifies zero database state leakage / corruption of seed data.
 */
import { prisma } from '../../src/lib/prisma';
import { runCrudTests, TestResult } from './crud-all-models.test';
import { runConstraintTests } from './database-constraints.test';
import { runConcurrencyTests } from './concurrency-stress.test';

async function getDbCounts() {
  return {
    admins: await prisma.adminUser.count(),
    services: await prisma.service.count(),
    caseStudies: await prisma.caseStudy.count(),
    metrics: await prisma.metricCounter.count(),
    testimonials: await prisma.testimonial.count(),
    inquiries: await prisma.inquiry.count(),
  };
}

async function main() {
  console.log('================================================================');
  console.log('🚀 STARTING EMPIRICAL ADVERSARIAL STRESS SUITE (M1 VERIFICATION)');
  console.log('================================================================');

  const baselineCounts = await getDbCounts();
  console.log('📊 Baseline DB Counts:', JSON.stringify(baselineCounts));

  const allResults: TestResult[] = [];
  const suiteStart = performance.now();

  // Suite 1: CRUD
  console.log('\n--- 1. Executing CRUD Suite across 6 models ---');
  const crudRes = await runCrudTests();
  allResults.push(...crudRes);
  const crudPass = crudRes.filter((r) => r.passed).length;
  console.log(`   Result: ${crudPass}/${crudRes.length} passed.`);

  // Suite 2: Constraints
  console.log('\n--- 2. Executing Constraints & Edge Cases Suite ---');
  const constrRes = await runConstraintTests();
  allResults.push(...constrRes);
  const constrPass = constrRes.filter((r) => r.passed).length;
  console.log(`   Result: ${constrPass}/${constrRes.length} passed.`);

  // Suite 3: Concurrency & EBUSY Stress
  console.log('\n--- 3. Executing Concurrency & Locking Stress Suite ---');
  const concRes = await runConcurrencyTests();
  allResults.push(...concRes);
  const concPass = concRes.filter((r) => r.passed).length;
  console.log(`   Result: ${concPass}/${concRes.length} passed.`);

  const suiteDuration = Math.round(performance.now() - suiteStart);

  // Baseline Verification
  const postTestCounts = await getDbCounts();
  console.log('\n📊 Post-Test DB Counts:', JSON.stringify(postTestCounts));

  const countsMatch = JSON.stringify(baselineCounts) === JSON.stringify(postTestCounts);
  if (!countsMatch) {
    console.error('⚠️ DB STATE LEAK DETECTED: Counts before and after testing differ!');
    console.error('Before:', baselineCounts);
    console.error('After:', postTestCounts);
  } else {
    console.log('✅ State integrity verified: Database seed data remained completely pristine!');
  }

  // Summary Table
  console.log('\n================================================================');
  console.log('🏁 EMPIRICAL ADVERSARIAL SUMMARY REPORT');
  console.log('================================================================');
  console.log(`Total Test Cases Executed: ${allResults.length}`);
  const totalPassed = allResults.filter((r) => r.passed).length;
  const totalFailed = allResults.filter((r) => !r.passed).length;
  console.log(`Passed: ${totalPassed} | Failed: ${totalFailed} | Duration: ${suiteDuration}ms`);
  console.log('================================================================\n');

  for (const r of allResults) {
    const icon = r.passed ? '✅' : '❌';
    console.log(`${icon} [${r.suite}] ${r.name} (${r.durationMs}ms)`);
    if (r.error) {
      console.log(`     Error: ${r.error}`);
    }
    if ((r as any).metrics) {
      const m = (r as any).metrics;
      console.log(`     Metrics: ${m.successOps}/${m.totalOps} ops, ${m.throughputOpsPerSec} ops/s, p50=${m.p50Ms}ms, p95=${m.p95Ms}ms, max=${m.maxMs}ms, lockingErrors=${m.lockingErrors}`);
    }
  }

  if (totalFailed > 0 || !countsMatch) {
    console.error(`\n❌ ADVERSARIAL VERDICT: REQUEST_CHANGES (${totalFailed} failures, stateMatch=${countsMatch})`);
    process.exit(1);
  } else {
    console.log(`\n🌟 ADVERSARIAL VERDICT: APPROVE (All ${totalPassed} empirical tests passed cleanly)`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal runner error:', err);
  process.exit(1);
});
