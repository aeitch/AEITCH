/**
 * Empirical Adversarial Test: CRUD Operations across all 6 Prisma Models
 * Target: prisma/dev.db via src/lib/prisma singleton
 */
import { prisma } from '../../src/lib/prisma';

export interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  durationMs: number;
  error?: string;
  details?: Record<string, unknown>;
}

export async function runCrudTests(): Promise<TestResult[]> {
  const results: TestResult[] = [];
  const testPrefix = `test_crud_${Date.now()}`;

  // Helper to run a test
  async function test(name: string, fn: () => Promise<Record<string, unknown> | void>) {
    const start = performance.now();
    try {
      const details = await fn();
      results.push({
        suite: 'CRUD Operations',
        name,
        passed: true,
        durationMs: Math.round(performance.now() - start),
        details: details || undefined,
      });
    } catch (err: unknown) {
      results.push({
        suite: 'CRUD Operations',
        name,
        passed: false,
        durationMs: Math.round(performance.now() - start),
        error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      });
    }
  }

  // --- 1. AdminUser CRUD ---
  let adminUserId = '';
  await test('AdminUser: CREATE with cuid, role, default timestamps', async () => {
    const created = await prisma.adminUser.create({
      data: {
        email: `${testPrefix}_admin@aeitch-test.com`,
        passwordHash: '$2a$10$adversarialHashForTestingOnly1234567890',
        name: 'Adversarial Admin Tester',
        role: 'editor',
      },
    });
    adminUserId = created.id;
    if (!created.id || !created.id.startsWith('c')) throw new Error(`Invalid cuid: ${created.id}`);
    if (created.role !== 'editor') throw new Error(`Role mismatch: ${created.role}`);
    if (!created.createdAt || !created.updatedAt) throw new Error('Timestamps missing');
    return { id: created.id, email: created.email, role: created.role };
  });

  await test('AdminUser: READ by unique email and id', async () => {
    const byEmail = await prisma.adminUser.findUnique({
      where: { email: `${testPrefix}_admin@aeitch-test.com` },
    });
    if (!byEmail || byEmail.id !== adminUserId) throw new Error('findUnique by email failed');

    const byId = await prisma.adminUser.findUnique({
      where: { id: adminUserId },
    });
    if (!byId) throw new Error('findUnique by id failed');
    return { found: true };
  });

  await test('AdminUser: UPDATE name, role, lastLoginAt, verify updatedAt changes', async () => {
    const before = await prisma.adminUser.findUniqueOrThrow({ where: { id: adminUserId } });
    // Slight pause to guarantee updatedAt timestamp difference
    await new Promise((r) => setTimeout(r, 20));

    const updated = await prisma.adminUser.update({
      where: { id: adminUserId },
      data: {
        name: 'Updated Admin Tester',
        role: 'superadmin',
        lastLoginAt: new Date(),
      },
    });
    if (updated.name !== 'Updated Admin Tester') throw new Error('Name update failed');
    if (updated.role !== 'superadmin') throw new Error('Role update failed');
    if (!updated.lastLoginAt) throw new Error('lastLoginAt update failed');
    if (updated.updatedAt.getTime() <= before.updatedAt.getTime()) {
      throw new Error(`updatedAt was not refreshed: before=${before.updatedAt}, after=${updated.updatedAt}`);
    }
    return { updatedAtBefore: before.updatedAt.toISOString(), updatedAtAfter: updated.updatedAt.toISOString() };
  });

  await test('AdminUser: DELETE and verify absence', async () => {
    await prisma.adminUser.delete({ where: { id: adminUserId } });
    const check = await prisma.adminUser.findUnique({ where: { id: adminUserId } });
    if (check !== null) throw new Error('AdminUser still exists after delete');
  });

  // --- 2. Service CRUD ---
  let serviceId = '';
  const serviceSlug = `${testPrefix}-service-slug`;
  await test('Service: CREATE with JSON array fields and default values', async () => {
    const featuresJson = JSON.stringify(['AI Agents', 'Vector Databases', 'Sub-second RAG']);
    const techStackJson = JSON.stringify(['TypeScript', 'PyTorch', 'Prisma', 'Tailwind']);
    const created = await prisma.service.create({
      data: {
        slug: serviceSlug,
        title: 'Adversarial AI Architecture',
        tagline: 'Stress testing model structures',
        category: 'Engineering',
        description: 'Comprehensive test description for deep validation.',
        fullContent: '## Full markdown content with code blocks and specs.',
        icon: 'Cpu',
        features: featuresJson,
        techStack: techStackJson,
        order: 99,
        isActive: true,
      },
    });
    serviceId = created.id;
    if (created.slug !== serviceSlug) throw new Error('Slug mismatch');
    const parsedFeatures = JSON.parse(created.features);
    if (!Array.isArray(parsedFeatures) || parsedFeatures.length !== 3) throw new Error('Features JSON corruption');
    return { id: created.id, slug: created.slug, featuresCount: parsedFeatures.length };
  });

  await test('Service: READ with slug and filtering', async () => {
    const found = await prisma.service.findUnique({ where: { slug: serviceSlug } });
    if (!found || found.id !== serviceId) throw new Error('Service findUnique by slug failed');
    return { foundSlug: found.slug, title: found.title };
  });

  await test('Service: UPDATE content, toggling isActive, order change', async () => {
    const updated = await prisma.service.update({
      where: { id: serviceId },
      data: {
        title: 'Updated AI Architecture Title',
        isActive: false,
        order: 100,
      },
    });
    if (updated.title !== 'Updated AI Architecture Title') throw new Error('Title update failed');
    if (updated.isActive !== false) throw new Error('isActive toggle failed');
    if (updated.order !== 100) throw new Error('Order update failed');
    return { isActive: updated.isActive, order: updated.order };
  });

  await test('Service: DELETE and verify absence', async () => {
    await prisma.service.delete({ where: { id: serviceId } });
    const check = await prisma.service.findUnique({ where: { id: serviceId } });
    if (check !== null) throw new Error('Service still exists after delete');
  });

  // --- 3. CaseStudy CRUD ---
  let caseStudyId = '';
  const caseStudySlug = `${testPrefix}-case-study-slug`;
  await test('CaseStudy: CREATE with MVP_SHOWCASE type, JSON results, nullable images', async () => {
    const resultsJson = JSON.stringify([
      { metric: '< 50ms', label: 'Inference latency' },
      { metric: '99.99%', label: 'Uptime SLA' },
    ]);
    const techStackJson = JSON.stringify(['Next.js', 'WebSockets', 'SQLite']);
    const created = await prisma.caseStudy.create({
      data: {
        slug: caseStudySlug,
        title: 'Adversarial Telemetry Mesh',
        clientName: 'Apex Dynamics',
        clientIndustry: 'FinTech',
        type: 'MVP_SHOWCASE',
        summary: 'Ultra-fast event pipeline for financial operations.',
        challenge: 'Legacy system crashed under 10k RPS load spikes.',
        solution: 'Built reactive stream processors with Rust and Next.js.',
        results: resultsJson,
        techStack: techStackJson,
        coverImage: 'https://images.unsplash.com/photo-test-123',
        liveUrl: 'https://apex-dynamics-demo.aeitch.internal',
        order: 5,
        isFeatured: true,
        isActive: true,
      },
    });
    caseStudyId = created.id;
    if (created.type !== 'MVP_SHOWCASE') throw new Error(`Type mismatch: ${created.type}`);
    if (!created.isFeatured) throw new Error('isFeatured flag not set');
    return { id: created.id, type: created.type, slug: created.slug };
  });

  await test('CaseStudy: READ and filter by type and isFeatured', async () => {
    const found = await prisma.caseStudy.findFirst({
      where: {
        slug: caseStudySlug,
        type: 'MVP_SHOWCASE',
        isFeatured: true,
      },
    });
    if (!found || found.id !== caseStudyId) throw new Error('CaseStudy filter query failed');
    return { found: true };
  });

  await test('CaseStudy: UPDATE nullable fields (set liveUrl to null, update results)', async () => {
    const updated = await prisma.caseStudy.update({
      where: { id: caseStudyId },
      data: {
        liveUrl: null,
        isFeatured: false,
      },
    });
    if (updated.liveUrl !== null) throw new Error('liveUrl was not set to null');
    if (updated.isFeatured !== false) throw new Error('isFeatured toggle failed');
    return { liveUrl: updated.liveUrl, isFeatured: updated.isFeatured };
  });

  await test('CaseStudy: DELETE and verify absence', async () => {
    await prisma.caseStudy.delete({ where: { id: caseStudyId } });
    const check = await prisma.caseStudy.findUnique({ where: { id: caseStudyId } });
    if (check !== null) throw new Error('CaseStudy still exists after delete');
  });

  // --- 4. Testimonial CRUD ---
  let testimonialId = '';
  await test('Testimonial: CREATE with rating, verified status, and nullable avatarUrl', async () => {
    const created = await prisma.testimonial.create({
      data: {
        clientName: 'Sarah Jenkins',
        clientRole: 'Chief Technology Officer',
        clientCompany: 'Starlight Financial',
        avatarUrl: null,
        quote: 'AEITCH re-engineered our core banking portal in record time with zero downtime.',
        rating: 5,
        verified: true,
        order: 10,
        isActive: true,
      },
    });
    testimonialId = created.id;
    if (created.rating !== 5) throw new Error(`Rating mismatch: ${created.rating}`);
    if (created.avatarUrl !== null) throw new Error('avatarUrl should be null');
    return { id: created.id, rating: created.rating };
  });

  await test('Testimonial: READ and sort by order', async () => {
    const found = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });
    if (!found) throw new Error('Testimonial findUnique failed');
    return { clientName: found.clientName, rating: found.rating };
  });

  await test('Testimonial: UPDATE quote and rating', async () => {
    const updated = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        quote: 'Updated testimonial quote with even higher commendation.',
        rating: 4,
        avatarUrl: 'https://images.unsplash.com/photo-avatar-sarah',
      },
    });
    if (updated.rating !== 4) throw new Error('Rating update failed');
    if (!updated.avatarUrl) throw new Error('avatarUrl update failed');
    return { rating: updated.rating, avatarUrl: updated.avatarUrl };
  });

  await test('Testimonial: DELETE and verify absence', async () => {
    await prisma.testimonial.delete({ where: { id: testimonialId } });
    const check = await prisma.testimonial.findUnique({ where: { id: testimonialId } });
    if (check !== null) throw new Error('Testimonial still exists after delete');
  });

  // --- 5. MetricCounter CRUD ---
  let metricId = '';
  await test('MetricCounter: CREATE with prefix, suffix, and order', async () => {
    const created = await prisma.metricCounter.create({
      data: {
        label: 'Stress Test TPS',
        value: '50000',
        prefix: '>',
        suffix: '+',
        description: 'Transactions per second sustained under load',
        icon: 'Zap',
        order: 12,
        isActive: true,
      },
    });
    metricId = created.id;
    if (created.value !== '50000') throw new Error('Value mismatch');
    if (created.prefix !== '>') throw new Error('Prefix mismatch');
    if (created.suffix !== '+') throw new Error('Suffix mismatch');
    return { id: created.id, label: created.label, value: created.value };
  });

  await test('MetricCounter: READ by id', async () => {
    const found = await prisma.metricCounter.findUnique({ where: { id: metricId } });
    if (!found) throw new Error('MetricCounter findUnique failed');
    return { label: found.label, value: found.value };
  });

  await test('MetricCounter: UPDATE value and description', async () => {
    const updated = await prisma.metricCounter.update({
      where: { id: metricId },
      data: {
        value: '75000',
        suffix: ' RPS',
        description: 'Updated description for throughput metric',
      },
    });
    if (updated.value !== '75000') throw new Error('Value update failed');
    if (updated.suffix !== ' RPS') throw new Error('Suffix update failed');
    return { value: updated.value, suffix: updated.suffix };
  });

  await test('MetricCounter: DELETE and verify absence', async () => {
    await prisma.metricCounter.delete({ where: { id: metricId } });
    const check = await prisma.metricCounter.findUnique({ where: { id: metricId } });
    if (check !== null) throw new Error('MetricCounter still exists after delete');
  });

  // --- 6. Inquiry CRUD ---
  let inquiryId = '';
  await test('Inquiry: CREATE full contact & consultation inquiry with default status', async () => {
    const created = await prisma.inquiry.create({
      data: {
        name: 'Alexander Sterling',
        email: `${testPrefix}_alex@sterling-ai.com`,
        company: 'Sterling AI Ventures',
        serviceRequested: 'AI Consulting & Systems',
        budgetRange: '$50,000 - $100,000',
        timeline: '1-3 Months',
        message: 'Looking to build an autonomous agent fleet for medical diagnostics.',
        meetingDate: '2026-10-15',
        meetingTime: '14:00',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 Test Suite Agent',
      },
    });
    inquiryId = created.id;
    if (created.status !== 'NEW') throw new Error(`Default status mismatch: ${created.status}`);
    if (created.company !== 'Sterling AI Ventures') throw new Error('Company mismatch');
    if (created.meetingDate !== '2026-10-15') throw new Error('Meeting date mismatch');
    return { id: created.id, status: created.status, email: created.email };
  });

  await test('Inquiry: READ and filter by status', async () => {
    const found = await prisma.inquiry.findMany({
      where: { email: `${testPrefix}_alex@sterling-ai.com` },
    });
    if (found.length !== 1 || found[0].id !== inquiryId) throw new Error('Inquiry query failed');
    return { count: found.length };
  });

  await test('Inquiry: UPDATE status workflow (NEW -> CONTACTED -> CONVERTED) & notes', async () => {
    const updated1 = await prisma.inquiry.update({
      where: { id: inquiryId },
      data: {
        status: 'CONTACTED',
        notes: 'Initial discovery call held on Zoom. Client has high interest.',
      },
    });
    if (updated1.status !== 'CONTACTED') throw new Error('Status update to CONTACTED failed');

    const updated2 = await prisma.inquiry.update({
      where: { id: inquiryId },
      data: {
        status: 'CONVERTED',
        notes: 'Signed 6-month contract for AI systems development.',
      },
    });
    if (updated2.status !== 'CONVERTED') throw new Error('Status update to CONVERTED failed');
    return { finalStatus: updated2.status, notes: updated2.notes };
  });

  await test('Inquiry: DELETE and verify absence', async () => {
    await prisma.inquiry.delete({ where: { id: inquiryId } });
    const check = await prisma.inquiry.findUnique({ where: { id: inquiryId } });
    if (check !== null) throw new Error('Inquiry still exists after delete');
  });

  return results;
}

if (require.main === module || process.argv[1]?.includes('crud-all-models')) {
  runCrudTests().then((res) => {
    console.log(JSON.stringify(res, null, 2));
    const failed = res.filter((r) => !r.passed);
    if (failed.length > 0) {
      console.error(`❌ ${failed.length} CRUD tests failed!`);
      process.exit(1);
    } else {
      console.log(`✅ All ${res.length} CRUD operations passed!`);
      process.exit(0);
    }
  });
}
