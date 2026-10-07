import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

describe('Milestone 4: Public APIs & Intake Workflows', () => {
  it('POST /api/contact saves valid lead inquiry into SQLite with NEW status', async () => {
    const { POST } = await import('@/app/api/contact/route');

    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jordan Rivera',
        email: 'jordan@vanguardtech.io',
        company: 'Vanguard Tech',
        serviceRequested: 'custom-software',
        budgetRange: '$25k - $50k',
        timeline: '1 - 3 months',
        message: 'Looking to re-architect our legacy backend into high-throughput microservices.',
      }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.inquiryId).toBeDefined();

    // Verify in database
    const dbInquiry = await prisma.inquiry.findUnique({
      where: { id: data.inquiryId },
    });
    expect(dbInquiry).not.toBeNull();
    expect(dbInquiry?.email).toBe('jordan@vanguardtech.io');
    expect(dbInquiry?.status).toBe('NEW');

    // Clean up
    await prisma.inquiry.delete({ where: { id: data.inquiryId } });
  });

  it('POST /api/consultation books consultation with meeting date and time', async () => {
    const { POST } = await import('@/app/api/consultation/route');

    const req = new Request('http://localhost:3000/api/consultation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Samantha Vance',
        email: 'samantha@apexglobal.com',
        company: 'Apex Global',
        serviceRequested: 'ai-consulting',
        budgetRange: '$50k+',
        timeline: 'Immediate',
        meetingDate: '2026-10-15',
        meetingTime: '11:00 AM EST',
        message: 'Requesting an architectural session on sovereign RAG deployment.',
      }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.inquiryId).toBeDefined();

    const dbInquiry = await prisma.inquiry.findUnique({
      where: { id: data.inquiryId },
    });
    expect(dbInquiry?.meetingDate).toBe('2026-10-15');
    expect(dbInquiry?.meetingTime).toBe('11:00 AM EST');

    // Clean up
    await prisma.inquiry.delete({ where: { id: data.inquiryId } });
  });

  it('POST /api/contact blocks bots silently via honeypot website_hp field', async () => {
    const { POST } = await import('@/app/api/contact/route');

    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Spam Bot',
        email: 'spambot@spam.ru',
        message: 'Buy cheap backlinks today now free',
        website_hp: 'http://spam-link.ru', // Bot populated honeypot
      }),
    });

    const res = await POST(req as any);
    const data = await res.json();
    // Bot is blocked (not saved to database)
    expect(data.inquiryId).toBe('bot-filtered');

    const count = await prisma.inquiry.count({
      where: { email: 'spambot@spam.ru' },
    });
    expect(count).toBe(0);
  });

  it('GET /api/services returns published services', async () => {
    const { GET } = await import('@/app/api/services/route');
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.data.length).toBeGreaterThanOrEqual(1);
  });

  it('GET /api/case-studies returns active case studies', async () => {
    const { GET } = await import('@/app/api/case-studies/route');
    const req = new Request('http://localhost:3000/api/case-studies');
    const res = await GET(req as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });

  it('GET /api/testimonials returns client reviews', async () => {
    const { GET } = await import('@/app/api/testimonials/route');
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });

  it('GET /api/metrics returns homepage counters', async () => {
    const { GET } = await import('@/app/api/metrics/route');
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });
});

describe('Milestone 5: Admin Auth & CRUD Console', () => {
  it('POST /api/admin/login authenticates valid admin credentials', async () => {
    const { POST } = await import('@/app/api/admin/login/route');

    const req = new Request('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@aeitch.com',
        password: 'AeitchAdmin2026!',
      }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.user.email).toBe('admin@aeitch.com');
  });

  it('POST /api/admin/login rejects invalid passwords', async () => {
    const { POST } = await import('@/app/api/admin/login/route');

    const req = new Request('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@aeitch.com',
        password: 'WrongPassword123!',
      }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  it('GET and PATCH /api/admin/inquiries allows updating CRM status & notes', async () => {
    // 1. Create a test inquiry
    const testInquiry = await prisma.inquiry.create({
      data: {
        name: 'CRM Test Lead',
        email: 'crmtest@example.com',
        message: 'Testing CRM status workflows and notes.',
        status: 'NEW',
      },
    });

    const { PATCH } = await import('@/app/api/admin/inquiries/[id]/route');

    const patchReq = new Request(
      `http://localhost:3000/api/admin/inquiries/${testInquiry.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'CONTACTED',
          notes: 'Had introductory discovery call. Scheduled follow-up proposal.',
        }),
      }
    );

    const patchRes = await PATCH(patchReq as any, {
      params: Promise.resolve({ id: testInquiry.id }),
    });

    expect(patchRes.status).toBe(200);
    const updated = await prisma.inquiry.findUnique({ where: { id: testInquiry.id } });
    expect(updated?.status).toBe('CONTACTED');
    expect(updated?.notes).toContain('Had introductory discovery call');

    // Clean up
    await prisma.inquiry.delete({ where: { id: testInquiry.id } });
  });
});
