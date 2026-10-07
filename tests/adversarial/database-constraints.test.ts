/**
 * Empirical Adversarial Test: Database Constraints, Unique Slugs, Nullability,
 * Cascades/Relations, Sort Order, and Extreme Payloads.
 * Target: prisma/dev.db via src/lib/prisma singleton
 */
import { prisma } from '../../src/lib/prisma';
import { Prisma } from '@prisma/client';

export interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  durationMs: number;
  error?: string;
  details?: Record<string, unknown>;
}

export async function runConstraintTests(): Promise<TestResult[]> {
  const results: TestResult[] = [];
  const testPrefix = `test_constr_${Date.now()}`;
  const createdIds: { model: string; id: string }[] = [];

  async function test(name: string, fn: () => Promise<Record<string, unknown> | void>) {
    const start = performance.now();
    try {
      const details = await fn();
      results.push({
        suite: 'Database Constraints',
        name,
        passed: true,
        durationMs: Math.round(performance.now() - start),
        details: details || undefined,
      });
    } catch (err: unknown) {
      results.push({
        suite: 'Database Constraints',
        name,
        passed: false,
        durationMs: Math.round(performance.now() - start),
        error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      });
    }
  }

  // --- 1. Unique Constraint: Service Slugs ---
  const sharedServiceSlug = `${testPrefix}-unique-service`;
  await test('Unique Constraint: Service slug collision rejected (P2002)', async () => {
    // 1st record: should succeed
    const s1 = await prisma.service.create({
      data: {
        slug: sharedServiceSlug,
        title: 'Original Service',
        tagline: 'First',
        description: 'First service for slug collision test',
        fullContent: 'Content 1',
        icon: 'Box',
        features: '[]',
        techStack: '[]',
      },
    });
    createdIds.push({ model: 'Service', id: s1.id });

    // 2nd record: should fail with P2002
    let threw = false;
    let errorCode = '';
    try {
      await prisma.service.create({
        data: {
          slug: sharedServiceSlug,
          title: 'Duplicate Service',
          tagline: 'Second',
          description: 'Second service attempting duplicate slug',
          fullContent: 'Content 2',
          icon: 'Box',
          features: '[]',
          techStack: '[]',
        },
      });
    } catch (e: unknown) {
      threw = true;
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        errorCode = e.code;
      }
    }

    if (!threw) throw new Error('Duplicate service slug was accepted without error');
    if (errorCode !== 'P2002') throw new Error(`Expected P2002 error, got: ${errorCode}`);
    return { errorCode, rejectedSlug: sharedServiceSlug };
  });

  // --- 2. Unique Constraint: Service Slug Collision on UPDATE ---
  await test('Unique Constraint: Service slug collision on UPDATE rejected (P2002)', async () => {
    const s2 = await prisma.service.create({
      data: {
        slug: `${sharedServiceSlug}-second`,
        title: 'Second Service For Update Collision',
        tagline: 'Second',
        description: 'Second service for slug update collision test',
        fullContent: 'Content 2',
        icon: 'Box',
        features: '[]',
        techStack: '[]',
      },
    });
    createdIds.push({ model: 'Service', id: s2.id });

    let threw = false;
    let errorCode = '';
    try {
      await prisma.service.update({
        where: { id: s2.id },
        data: { slug: sharedServiceSlug }, // conflicts with s1
      });
    } catch (e: unknown) {
      threw = true;
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        errorCode = e.code;
      }
    }

    if (!threw) throw new Error('Updating to duplicate service slug was accepted');
    if (errorCode !== 'P2002') throw new Error(`Expected P2002, got: ${errorCode}`);
    return { errorCode };
  });

  // --- 3. Unique Constraint: CaseStudy Slugs ---
  const sharedCaseStudySlug = `${testPrefix}-unique-case-study`;
  await test('Unique Constraint: CaseStudy slug collision rejected (P2002)', async () => {
    const cs1 = await prisma.caseStudy.create({
      data: {
        slug: sharedCaseStudySlug,
        title: 'Original Case Study',
        clientName: 'Alpha Corp',
        clientIndustry: 'Logistics',
        summary: 'First case study summary',
        challenge: 'Challenge text',
        solution: 'Solution text',
        results: '[]',
        techStack: '[]',
      },
    });
    createdIds.push({ model: 'CaseStudy', id: cs1.id });

    let threw = false;
    let errorCode = '';
    try {
      await prisma.caseStudy.create({
        data: {
          slug: sharedCaseStudySlug,
          title: 'Duplicate Case Study',
          clientName: 'Beta Corp',
          clientIndustry: 'Fintech',
          summary: 'Second case study summary',
          challenge: 'Challenge text',
          solution: 'Solution text',
          results: '[]',
          techStack: '[]',
        },
      });
    } catch (e: unknown) {
      threw = true;
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        errorCode = e.code;
      }
    }

    if (!threw) throw new Error('Duplicate CaseStudy slug was accepted without error');
    if (errorCode !== 'P2002') throw new Error(`Expected P2002, got: ${errorCode}`);
    return { errorCode, rejectedSlug: sharedCaseStudySlug };
  });

  // --- 4. Unique Constraint: AdminUser Email ---
  const sharedAdminEmail = `${testPrefix}_unique_admin@aeitch.com`;
  await test('Unique Constraint: AdminUser duplicate email rejected (P2002)', async () => {
    const a1 = await prisma.adminUser.create({
      data: {
        email: sharedAdminEmail,
        passwordHash: 'hash1',
        name: 'First Admin',
      },
    });
    createdIds.push({ model: 'AdminUser', id: a1.id });

    let threw = false;
    let errorCode = '';
    try {
      await prisma.adminUser.create({
        data: {
          email: sharedAdminEmail,
          passwordHash: 'hash2',
          name: 'Duplicate Admin',
        },
      });
    } catch (e: unknown) {
      threw = true;
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        errorCode = e.code;
      }
    }

    if (!threw) throw new Error('Duplicate AdminUser email was accepted without error');
    if (errorCode !== 'P2002') throw new Error(`Expected P2002, got: ${errorCode}`);
    return { errorCode, rejectedEmail: sharedAdminEmail };
  });

  // --- 5. Slug Case-Sensitivity Analysis in SQLite ---
  await test('Slug Case-Sensitivity: test-slug vs TEST-SLUG behavior', async () => {
    const lowerSlug = `${testPrefix}-case-test`;
    const upperSlug = `${testPrefix}-CASE-TEST`;

    const lower = await prisma.service.create({
      data: {
        slug: lowerSlug,
        title: 'Lower Case Slug',
        tagline: 'Test',
        description: 'Lower case slug',
        fullContent: 'Content',
        icon: 'Box',
        features: '[]',
        techStack: '[]',
      },
    });
    createdIds.push({ model: 'Service', id: lower.id });

    let upperCreated = false;
    try {
      const upper = await prisma.service.create({
        data: {
          slug: upperSlug,
          title: 'Upper Case Slug',
          tagline: 'Test',
          description: 'Upper case slug',
          fullContent: 'Content',
          icon: 'Box',
          features: '[]',
          techStack: '[]',
        },
      });
      createdIds.push({ model: 'Service', id: upper.id });
      upperCreated = true;
    } catch (e: unknown) {
      upperCreated = false;
    }

    // In standard SQLite, strings without COLLATE NOCASE are case-sensitive.
    // Documenting empirical behavior:
    return {
      lowerSlug,
      upperSlug,
      sqliteCaseSensitive: upperCreated,
      observation: upperCreated
        ? 'SQLite treats slugs as binary case-sensitive (standard default)'
        : 'SQLite treats slugs as case-insensitive',
    };
  });

  // --- 6. Required Fields Validation ---
  await test('Required Fields: Service missing required fields rejected', async () => {
    let threw = false;
    try {
      await (prisma.service.create as any)({
        data: {
          description: 'Incomplete record',
        },
      });
    } catch {
      threw = true;
    }
    if (!threw) throw new Error('Service created despite missing required fields');
    return { rejected: true };
  });

  await test('Required Fields: Inquiry missing required name and message rejected', async () => {
    let threw = false;
    try {
      await (prisma.inquiry.create as any)({
        data: {
          email: 'valid@example.com',
        },
      });
    } catch {
      threw = true;
    }
    if (!threw) throw new Error('Inquiry created despite missing required name and message');
    return { rejected: true };
  });

  // --- 7. Nullable Fields Verification ---
  await test('Nullable Fields: Nullable fields correctly store and retrieve null', async () => {
    const cs = await prisma.caseStudy.create({
      data: {
        slug: `${testPrefix}-null-test`,
        title: 'Null Fields Verification',
        clientName: 'Null Check Corp',
        clientIndustry: 'Testing',
        summary: 'Summary',
        challenge: 'Challenge',
        solution: 'Solution',
        results: '[]',
        techStack: '[]',
        coverImage: null,
        liveUrl: null,
      },
    });
    createdIds.push({ model: 'CaseStudy', id: cs.id });
    if (cs.coverImage !== null || cs.liveUrl !== null) {
      throw new Error('Expected null fields in CaseStudy');
    }

    const inq = await prisma.inquiry.create({
      data: {
        name: 'Null Fields Inquiry',
        email: `${testPrefix}_null@test.com`,
        message: 'Testing all optional fields as null',
        company: null,
        serviceRequested: null,
        budgetRange: null,
        timeline: null,
        meetingDate: null,
        meetingTime: null,
        notes: null,
        ipAddress: null,
        userAgent: null,
      },
    });
    createdIds.push({ model: 'Inquiry', id: inq.id });
    if (inq.company !== null || inq.meetingDate !== null || inq.notes !== null) {
      throw new Error('Expected null fields in Inquiry');
    }

    return { caseStudyNullsVerified: true, inquiryNullsVerified: true };
  });

  // --- 8. Cascade & Relation Architecture Analysis ---
  await test('Cascade & Relations: Model independence and non-interference', async () => {
    // Create an inquiry referencing a service name in text
    const inq = await prisma.inquiry.create({
      data: {
        name: 'Cascade Tester',
        email: `${testPrefix}_cascade@test.com`,
        serviceRequested: 'Custom Software Engineering',
        message: 'Inquiry referring to service',
      },
    });
    createdIds.push({ model: 'Inquiry', id: inq.id });

    // Create a temporary service
    const s = await prisma.service.create({
      data: {
        slug: `${testPrefix}-temp-service`,
        title: 'Temporary Service',
        tagline: 'Temp',
        description: 'Testing independent deletion',
        fullContent: 'Content',
        icon: 'Cpu',
        features: '[]',
        techStack: '[]',
      },
    });

    // Delete service
    await prisma.service.delete({ where: { id: s.id } });

    // Verify inquiry still exists completely unaffected
    const inqCheck = await prisma.inquiry.findUnique({ where: { id: inq.id } });
    if (!inqCheck) throw new Error('Inquiry was unexpectedly affected by Service deletion');

    return {
      relationDesign: 'Flat/Decoupled: Models contain zero foreign keys, preventing cascading lockups',
      unaffectedRecords: true,
    };
  });

  // --- 9. Sort Order Verification ---
  await test('Sort Order: Negative, zero, positive, and descending ordering', async () => {
    const orders = [-50, 0, 10, 25, 100];
    const createdMetrics: string[] = [];

    for (const ord of orders) {
      const m = await prisma.metricCounter.create({
        data: {
          label: `Metric Order ${ord}`,
          value: `${ord}`,
          order: ord,
          isActive: true,
        },
      });
      createdMetrics.push(m.id);
      createdIds.push({ model: 'MetricCounter', id: m.id });
    }

    // Query ascending
    const ascList = await prisma.metricCounter.findMany({
      where: { id: { in: createdMetrics } },
      orderBy: { order: 'asc' },
    });
    const ascOrders = ascList.map((m) => m.order);
    const expectedAsc = [-50, 0, 10, 25, 100];
    if (JSON.stringify(ascOrders) !== JSON.stringify(expectedAsc)) {
      throw new Error(`Ascending sort order failed. Got: ${JSON.stringify(ascOrders)}, expected: ${JSON.stringify(expectedAsc)}`);
    }

    // Query descending
    const descList = await prisma.metricCounter.findMany({
      where: { id: { in: createdMetrics } },
      orderBy: { order: 'desc' },
    });
    const descOrders = descList.map((m) => m.order);
    const expectedDesc = [100, 25, 10, 0, -50];
    if (JSON.stringify(descOrders) !== JSON.stringify(expectedDesc)) {
      throw new Error(`Descending sort order failed. Got: ${JSON.stringify(descOrders)}, expected: ${JSON.stringify(expectedDesc)}`);
    }

    return { ascOrders, descOrders };
  });

  // --- 10. Extreme Payloads & Unicode / Emoji Support ---
  await test('Extreme Payloads: Large text payloads (50KB) and multilingual Unicode + Emojis', async () => {
    const largeContent = '⚡ AEITCH Enterprise Architecture: '.repeat(1500); // ~54 KB string
    const unicodeTitle = '🚀 全球量子计算与AI架构 (Global AI Architecture) - اختبار الأداء';
    const unicodeQuote = '“卓越的技术与惊人的速度！⚡ 10/10 service.” — مراجعة العملاء';

    const s = await prisma.service.create({
      data: {
        slug: `${testPrefix}-unicode-large`,
        title: unicodeTitle,
        tagline: 'Extreme payload testing 🛡️',
        description: 'Large content test',
        fullContent: largeContent,
        icon: 'Sparkles',
        features: JSON.stringify(['🚀 Feature A', '🛡️ Feature B', '💎 Feature C']),
        techStack: JSON.stringify(['Rust 🦀', 'Next.js ⚛️', 'SQLite 🗄️']),
      },
    });
    createdIds.push({ model: 'Service', id: s.id });

    const retrieved = await prisma.service.findUniqueOrThrow({ where: { id: s.id } });
    if (retrieved.title !== unicodeTitle) throw new Error('Unicode title corruption');
    if (retrieved.fullContent.length !== largeContent.length) {
      throw new Error(`Large payload length mismatch: got ${retrieved.fullContent.length}, expected ${largeContent.length}`);
    }

    const t = await prisma.testimonial.create({
      data: {
        clientName: '張偉 (Zhang Wei)',
        clientRole: 'VP of AI Engineering',
        clientCompany: 'Quantum Leap Tech Ltd.',
        quote: unicodeQuote,
        rating: 5,
      },
    });
    createdIds.push({ model: 'Testimonial', id: t.id });

    const retrievedTestimonial = await prisma.testimonial.findUniqueOrThrow({ where: { id: t.id } });
    if (retrievedTestimonial.quote !== unicodeQuote) throw new Error('Unicode quote corruption in Testimonial');

    return {
      payloadBytes: largeContent.length,
      unicodeTitlePreserved: true,
      emojiPreserved: true,
    };
  });

  // --- Cleanup created test records ---
  for (const item of createdIds) {
    try {
      if (item.model === 'Service') await prisma.service.deleteMany({ where: { id: item.id } });
      if (item.model === 'CaseStudy') await prisma.caseStudy.deleteMany({ where: { id: item.id } });
      if (item.model === 'AdminUser') await prisma.adminUser.deleteMany({ where: { id: item.id } });
      if (item.model === 'MetricCounter') await prisma.metricCounter.deleteMany({ where: { id: item.id } });
      if (item.model === 'Testimonial') await prisma.testimonial.deleteMany({ where: { id: item.id } });
      if (item.model === 'Inquiry') await prisma.inquiry.deleteMany({ where: { id: item.id } });
    } catch {
      // Ignore cleanup error if already deleted
    }
  }

  return results;
}

if (require.main === module || process.argv[1]?.includes('database-constraints')) {
  runConstraintTests().then((res) => {
    console.log(JSON.stringify(res, null, 2));
    const failed = res.filter((r) => !r.passed);
    if (failed.length > 0) {
      console.error(`❌ ${failed.length} Constraint tests failed!`);
      process.exit(1);
    } else {
      console.log(`✅ All ${res.length} Constraint tests passed!`);
      process.exit(0);
    }
  });
}
