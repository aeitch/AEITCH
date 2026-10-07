import { prisma } from '../../src/lib/prisma';

async function cleanup() {
  console.log('Cleaning up test records from dev.db...');
  const delInq = await prisma.inquiry.deleteMany({
    where: {
      OR: [
        { email: { contains: 'test' } },
        { email: { contains: 'user' } },
        { email: { contains: 'internal' } },
        { name: { contains: 'User' } },
        { name: { contains: 'Tester' } },
      ],
    },
  });
  console.log(`Deleted ${delInq.count} test inquiries.`);

  const delMetrics = await prisma.metricCounter.deleteMany({
    where: {
      OR: [
        { label: { contains: 'Mixed Metric' } },
        { label: { contains: 'Metric Order' } },
        { label: { contains: 'Stress Test' } },
      ],
    },
  });
  console.log(`Deleted ${delMetrics.count} test metric counters.`);

  const counts = {
    admins: await prisma.adminUser.count(),
    services: await prisma.service.count(),
    caseStudies: await prisma.caseStudy.count(),
    metrics: await prisma.metricCounter.count(),
    testimonials: await prisma.testimonial.count(),
    inquiries: await prisma.inquiry.count(),
  };
  console.log('Restored DB Counts:', JSON.stringify(counts));
}

cleanup().catch(console.error);
