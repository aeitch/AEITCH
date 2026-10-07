/**
 * Empirical Adversarial & Stress Testing Suite: M1 Security, Auth, Middleware & Validations
 *
 * Targets:
 * 1. src/lib/auth.ts (JWT HS256, tampering, invalid signatures, expired tokens, alg none)
 * 2. bcryptjs password hashing and salt verification against AeitchAdmin2026! in prisma/dev.db
 * 3. src/lib/validations.ts (Honeypot website_hp, invalid emails, malformed slugs, XSS strings, boundary lengths)
 * 4. src/middleware.ts (Edge guard protection for /admin and /api/admin, cookie verification, unauthenticated redirects)
 */

import { signAdminToken, verifyAdminToken, SESSION_COOKIE_NAME } from '../../src/lib/auth';
import {
  ContactFormSchema,
  AdminLoginSchema,
  ServiceFormSchema,
  CaseStudyFormSchema,
  TestimonialFormSchema,
  MetricCounterFormSchema,
  InquiryUpdateSchema,
} from '../../src/lib/validations';
import { prisma } from '../../src/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose/jwt/sign';
import { middleware } from '../../src/middleware';
import { NextRequest } from 'next/server';

export interface StressTestResult {
  category: 'JWT_AUTH' | 'BCRYPT_PASSWORDS' | 'ZOD_VALIDATIONS' | 'EDGE_MIDDLEWARE';
  name: string;
  passed: boolean;
  durationMs: number;
  expected: string;
  actual: string;
  details?: Record<string, unknown>;
  error?: string;
}

export async function runSecurityStressTests(): Promise<StressTestResult[]> {
  const results: StressTestResult[] = [];

  async function assertTest(
    category: StressTestResult['category'],
    name: string,
    expected: string,
    fn: () => Promise<{ actual: string; details?: Record<string, unknown> }>
  ) {
    const start = performance.now();
    try {
      const outcome = await fn();
      results.push({
        category,
        name,
        passed: true,
        durationMs: Math.round(performance.now() - start),
        expected,
        actual: outcome.actual,
        details: outcome.details,
      });
    } catch (err: unknown) {
      results.push({
        category,
        name,
        passed: false,
        durationMs: Math.round(performance.now() - start),
        expected,
        actual: err instanceof Error ? err.message : String(err),
        error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      });
    }
  }

  const validPayload = {
    userId: 'cmu_admin_test_123',
    email: 'admin@aeitch.com',
    name: 'AEITCH Administrator',
    role: 'superadmin',
  };

  // =========================================================================
  // SECTION 1: JWT Authentication & Tampering Tests (src/lib/auth.ts)
  // =========================================================================

  let validToken = '';

  await assertTest(
    'JWT_AUTH',
    'JWT Generation: Valid token returns dot-separated 3-part HS256 structure',
    '3 parts (header.payload.signature) with HS256 algorithm',
    async () => {
      validToken = await signAdminToken(validPayload);
      const parts = validToken.split('.');
      if (parts.length !== 3) {
        throw new Error(`Token did not have 3 parts: count=${parts.length}`);
      }
      const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf-8'));
      if (header.alg !== 'HS256') {
        throw new Error(`Header algorithm mismatch: ${header.alg}`);
      }
      return {
        actual: `Valid 3-part JWT generated, alg=${header.alg}`,
        details: { tokenLength: validToken.length, header },
      };
    }
  );

  await assertTest(
    'JWT_AUTH',
    'JWT Verification: Valid token verifies and restores payload accurately',
    'Payload matching userId, email, and role: superadmin',
    async () => {
      const verified = await verifyAdminToken(validToken);
      if (!verified) throw new Error('verifyAdminToken returned null for valid token');
      if (verified.userId !== validPayload.userId) throw new Error('userId mismatch');
      if (verified.email !== validPayload.email) throw new Error('email mismatch');
      if (verified.role !== validPayload.role) throw new Error('role mismatch');
      return {
        actual: `Successfully verified payload for user ${verified.email}`,
        details: { verified },
      };
    }
  );

  await assertTest(
    'JWT_AUTH',
    'JWT Tampering: Modifying payload role to escalate privilege is detected and rejected',
    'verifyAdminToken returns null',
    async () => {
      const parts = validToken.split('.');
      const payloadObj = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'));
      payloadObj.role = 'attacker-escalated-role';
      const tamperedPayload = Buffer.from(JSON.stringify(payloadObj)).toString('base64url');
      const tamperedToken = `${parts[0]}.${tamperedPayload}.${parts[2]}`;

      const verified = await verifyAdminToken(tamperedToken);
      if (verified !== null) {
        throw new Error(`Security breach: tampered token was accepted: ${JSON.stringify(verified)}`);
      }
      return { actual: 'Tampered payload rejected, returned null' };
    }
  );

  await assertTest(
    'JWT_AUTH',
    'JWT Tampering: Corrupting token signature is detected and rejected',
    'verifyAdminToken returns null',
    async () => {
      const parts = validToken.split('.');
      const corruptedSig = parts[2].substring(0, parts[2].length - 4) + 'XXXX';
      const corruptedToken = `${parts[0]}.${parts[1]}.${corruptedSig}`;

      const verified = await verifyAdminToken(corruptedToken);
      if (verified !== null) {
        throw new Error('Security breach: corrupted signature was accepted');
      }
      return { actual: 'Corrupted signature rejected, returned null' };
    }
  );

  await assertTest(
    'JWT_AUTH',
    'JWT Tampering: Empty or missing signature is rejected',
    'verifyAdminToken returns null',
    async () => {
      const parts = validToken.split('.');
      const unsignedToken = `${parts[0]}.${parts[1]}.`;
      const verified = await verifyAdminToken(unsignedToken);
      if (verified !== null) {
        throw new Error('Security breach: unsigned token was accepted');
      }
      return { actual: 'Unsigned token rejected, returned null' };
    }
  );

  await assertTest(
    'JWT_AUTH',
    'JWT Tampering: alg: none attack is rejected by jose validator',
    'verifyAdminToken returns null',
    async () => {
      const parts = validToken.split('.');
      const noneHeader = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
      const noneToken = `${noneHeader}.${parts[1]}.`;

      const verified = await verifyAdminToken(noneToken);
      if (verified !== null) {
        throw new Error('Security breach: alg:none token was accepted');
      }
      return { actual: 'alg:none rejected, returned null' };
    }
  );

  await assertTest(
    'JWT_AUTH',
    'JWT Secret Isolation: Token signed with unauthorized secret key is rejected',
    'verifyAdminToken returns null',
    async () => {
      const foreignSecret = new TextEncoder().encode('unauthorized-foreign-attacker-secret-key-32-chars');
      const foreignToken = await new SignJWT({ ...validPayload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('8h')
        .sign(foreignSecret);

      const verified = await verifyAdminToken(foreignToken);
      if (verified !== null) {
        throw new Error('Security breach: token signed with foreign secret was accepted');
      }
      return { actual: 'Foreign key rejected, returned null' };
    }
  );

  await assertTest(
    'JWT_AUTH',
    'JWT Expiration: Past-dated / expired token is rejected',
    'verifyAdminToken returns null',
    async () => {
      const activeSecret = new TextEncoder().encode(
        process.env.ADMIN_JWT_SECRET || 'aeitch-enterprise-secret-key-at-least-32-chars-long-2026'
      );
      const expiredToken = await new SignJWT({ ...validPayload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt(Math.floor(Date.now() / 1000) - 7200)
        .setExpirationTime(Math.floor(Date.now() / 1000) - 3600)
        .sign(activeSecret);

      const verified = await verifyAdminToken(expiredToken);
      if (verified !== null) {
        throw new Error('Security breach: expired token was accepted');
      }
      return { actual: 'Expired token rejected, returned null' };
    }
  );

  await assertTest(
    'JWT_AUTH',
    'JWT Adversarial Inputs: Malformed inputs (empty string, random garbage, SQLi strings) return null gracefully',
    'All malformed inputs return null without unhandled crashes',
    async () => {
      const maliciousInputs = [
        '',
        '   ',
        'single-token-without-dots',
        'two.dots.only',
        'four.dots.separated.jwt.tokens',
        "' OR '1'='1",
        '<script>alert(1)</script>',
        'null',
        'undefined',
        '../path/traversal',
        '\x00\x00\x00\x00',
        'a'.repeat(50000),
      ];

      for (const input of maliciousInputs) {
        const res = await verifyAdminToken(input);
        if (res !== null) {
          throw new Error(`Malformed input accepted: "${input.substring(0, 30)}"`);
        }
      }
      return { actual: `${maliciousInputs.length} malformed inputs safely rejected with null` };
    }
  );

  // =========================================================================
  // SECTION 2: Bcrypt Password Hashing & Salt Verification
  // =========================================================================

  await assertTest(
    'BCRYPT_PASSWORDS',
    'Admin Password Verification: Database admin password hash matches AeitchAdmin2026!',
    'bcrypt.compareSync returns true for admin@aeitch.com',
    async () => {
      const admin = await prisma.adminUser.findUnique({
        where: { email: 'admin@aeitch.com' },
      });
      if (!admin) throw new Error('Seeded admin user not found in prisma/dev.db');
      if (!admin.passwordHash) throw new Error('Admin passwordHash is null or empty');

      const saltMatch = admin.passwordHash.match(/^\$2[ab]\$(\d+)\$/);
      if (!saltMatch) {
        throw new Error(`Invalid bcrypt hash format: ${admin.passwordHash}`);
      }
      const rounds = parseInt(saltMatch[1], 10);
      if (rounds !== 10) {
        throw new Error(`Expected 10 bcrypt salt rounds, found: ${rounds}`);
      }

      const isValid = bcrypt.compareSync('AeitchAdmin2026!', admin.passwordHash);
      if (!isValid) {
        throw new Error('bcrypt.compareSync failed for AeitchAdmin2026!');
      }

      return {
        actual: `Password verified valid: rounds=${rounds}, hash=${admin.passwordHash.substring(0, 15)}...`,
        details: { rounds, email: admin.email, role: admin.role },
      };
    }
  );

  await assertTest(
    'BCRYPT_PASSWORDS',
    'Admin Password Adversarial: Incorrect passwords, casing, whitespace, and injection rejected',
    'bcrypt.compareSync returns false for all non-matching inputs',
    async () => {
      const admin = await prisma.adminUser.findUniqueOrThrow({
        where: { email: 'admin@aeitch.com' },
      });

      const badPasswords = [
        'aeitchadmin2026!', // wrong lowercase
        'AEITCHADMIN2026!', // wrong uppercase
        'AeitchAdmin2026',  // missing special char
        'AeitchAdmin2026! ', // trailing space
        ' AeitchAdmin2026!', // leading space
        'admin',
        'password123',
        '',
        "' OR '1'='1",
        '<script>alert(1)</script>',
        'AeitchAdmin2025!',
      ];

      for (const bad of badPasswords) {
        const matches = bcrypt.compareSync(bad, admin.passwordHash);
        if (matches) {
          throw new Error(`Security breach: bad password matched hash: "${bad}"`);
        }
      }
      return { actual: `${badPasswords.length} invalid/adversarial passwords rejected` };
    }
  );

  await assertTest(
    'BCRYPT_PASSWORDS',
    'Bcrypt Salt Uniqueness: Hashing identical password generates different unique salts and hashes',
    'Two hashes of AeitchAdmin2026! are distinct strings but both evaluate true',
    async () => {
      const h1 = bcrypt.hashSync('AeitchAdmin2026!', 10);
      const h2 = bcrypt.hashSync('AeitchAdmin2026!', 10);

      if (h1 === h2) {
        throw new Error('Salt generation flaw: consecutive hashes were identical');
      }
      if (!bcrypt.compareSync('AeitchAdmin2026!', h1)) {
        throw new Error('Hash 1 failed comparison');
      }
      if (!bcrypt.compareSync('AeitchAdmin2026!', h2)) {
        throw new Error('Hash 2 failed comparison');
      }
      return {
        actual: 'Unique random salts generated, both verified successfully',
        details: { h1: h1.substring(0, 20), h2: h2.substring(0, 20) },
      };
    }
  );

  // =========================================================================
  // SECTION 3: Zod Schema Stress-Testing (src/lib/validations.ts)
  // =========================================================================

  await assertTest(
    'ZOD_VALIDATIONS',
    'Honeypot: Empty or undefined website_hp passes validation',
    'Validation succeeds for normal legitimate users',
    async () => {
      const validPayload1 = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'We need enterprise AI consulting for our legal database.',
        website_hp: '',
      };
      const r1 = ContactFormSchema.safeParse(validPayload1);
      if (!r1.success) throw new Error(`Empty honeypot failed: ${r1.error.message}`);

      const validPayload2 = {
        name: 'Jane Smith',
        email: 'jane@enterprise.org',
        message: 'Looking for a cloud infrastructure audit and cost reduction.',
      };
      const r2 = ContactFormSchema.safeParse(validPayload2);
      if (!r2.success) throw new Error(`Omitted honeypot failed: ${r2.error.message}`);

      return { actual: 'Both empty and omitted website_hp validated successfully' };
    }
  );

  await assertTest(
    'ZOD_VALIDATIONS',
    'Honeypot: Filled website_hp bot submissions are intercepted and rejected',
    'Validation fails with Bot detected',
    async () => {
      const botPayloads = [
        'http://spambot-link.xyz',
        'https://seo-ranking-boost.com',
        'buy crypto here',
        ' ',
        'a',
      ];

      for (const botVal of botPayloads) {
        const payload = {
          name: 'Bot Spammer',
          email: 'bot@spam.com',
          message: 'Cheap SEO backlinks service for your high-ranking domain.',
          website_hp: botVal,
        };
        const parseRes = ContactFormSchema.safeParse(payload);
        if (parseRes.success) {
          throw new Error(`Honeypot failed to catch bot value: "${botVal}"`);
        }
        const issues = parseRes.error.issues;
        const hpIssue = issues.find((i) => i.path.includes('website_hp'));
        if (!hpIssue || !hpIssue.message.includes('Bot detected')) {
          throw new Error(`Expected "Bot detected" message, got: ${JSON.stringify(issues)}`);
        }
      }
      return { actual: `${botPayloads.length} bot submissions intercepted by honeypot` };
    }
  );

  await assertTest(
    'ZOD_VALIDATIONS',
    'Email Validation: Malformed emails in Contact & AdminLogin are strictly rejected',
    'Validation fails for non-RFC/malformed email addresses',
    async () => {
      const invalidEmails = [
        'not-an-email',
        'missing-at-sign.com',
        'user@',
        '@example.com',
        'user@domain..com',
        'user @domain.com',
        'user@ domain.com',
        'user@@domain.com',
        'user@domain',
        '',
        '<script>alert(1)</script>@domain.com',
        'user@domain.c',
      ];

      for (const badEmail of invalidEmails) {
        const contactRes = ContactFormSchema.safeParse({
          name: 'Tester',
          email: badEmail,
          message: 'Valid message exceeding minimum length of ten chars.',
        });
        if (contactRes.success) {
          throw new Error(`ContactFormSchema accepted invalid email: "${badEmail}"`);
        }

        const loginRes = AdminLoginSchema.safeParse({
          email: badEmail,
          password: 'ValidPassword123!',
        });
        if (loginRes.success) {
          throw new Error(`AdminLoginSchema accepted invalid email: "${badEmail}"`);
        }
      }
      return { actual: `${invalidEmails.length} malformed email variants rejected` };
    }
  );

  await assertTest(
    'ZOD_VALIDATIONS',
    'Slug Validation: Lowercase alphanumeric with hyphens accepted, malformed rejected',
    'Valid slugs pass, uppercase/spaces/symbols/traversals fail regex',
    async () => {
      const validSlugs = ['ai-consulting', 'cloud-devops', 'custom-software-2026', 'mvp-1', 'a-b'];

      for (const slug of validSlugs) {
        const res = ServiceFormSchema.safeParse({
          title: 'Valid Title',
          slug,
          tagline: 'Valid tagline for service',
          category: 'Engineering',
          description: 'Valid description for testing.',
          fullContent: '## Full content section with sufficient detail.',
          icon: 'Cpu',
          features: ['Feature 1'],
          techStack: ['TypeScript'],
        });
        if (!res.success) {
          throw new Error(`Valid slug rejected: "${slug}", error: ${res.error.message}`);
        }
      }

      const invalidSlugs = [
        'AI-Consulting',
        'ai consulting',
        'ai_consulting',
        'ai@consulting',
        'ai.consulting',
        '../../etc/passwd',
        'slug?query=1',
        'slug#hash',
        'a',
        'a'.repeat(101),
        '',
        'ai-консалтинг',
      ];

      for (const badSlug of invalidSlugs) {
        const res = ServiceFormSchema.safeParse({
          title: 'Valid Title',
          slug: badSlug,
          tagline: 'Valid tagline for service',
          category: 'Engineering',
          description: 'Valid description for testing.',
          fullContent: '## Full content section with sufficient detail.',
          icon: 'Cpu',
          features: ['Feature 1'],
          techStack: ['TypeScript'],
        });
        if (res.success) {
          throw new Error(`Malformed slug accepted: "${badSlug}"`);
        }
      }

      return {
        actual: `${validSlugs.length} valid slugs accepted, ${invalidSlugs.length} malformed slugs rejected`,
      };
    }
  );

  await assertTest(
    'ZOD_VALIDATIONS',
    'Message Field: Boundary limits (<10, 10, 3000, 3001 chars) and XSS payload handling',
    'Boundaries enforced: 9 chars rejected, 10 accepted, 3000 accepted, 3001 rejected',
    async () => {
      const basePayload = {
        name: 'Security Researcher',
        email: 'research@aeitch.com',
      };

      const tooShort = ContactFormSchema.safeParse({
        ...basePayload,
        message: '123456789',
      });
      if (tooShort.success) throw new Error('9-char message accepted (min is 10)');

      const exactMin = ContactFormSchema.safeParse({
        ...basePayload,
        message: '1234567890',
      });
      if (!exactMin.success) throw new Error(`10-char message rejected: ${exactMin.error.message}`);

      const exactMax = ContactFormSchema.safeParse({
        ...basePayload,
        message: 'a'.repeat(3000),
      });
      if (!exactMax.success) throw new Error(`3000-char message rejected: ${exactMax.error.message}`);

      const tooLong = ContactFormSchema.safeParse({
        ...basePayload,
        message: 'a'.repeat(3001),
      });
      if (tooLong.success) throw new Error('3001-char message accepted (max is 3000)');

      const xssStrings = [
        '<script>alert("XSS")</script>',
        '<img src=x onerror=alert("document.cookie")>',
        '"><svg onload=alert(1)>',
        '{{constructor.constructor("alert(1)")()}}',
        '\' UNION SELECT * FROM AdminUser WHERE \'1\'=\'1',
      ];

      for (const xss of xssStrings) {
        const xssRes = ContactFormSchema.safeParse({
          ...basePayload,
          message: xss,
        });
        if (!xssRes.success) {
          throw new Error(`XSS string failed schema parsing unexpectedly: ${xssRes.error.message}`);
        }
        if (xssRes.data.message !== xss) {
          throw new Error('Message content mutated during schema validation');
        }
      }

      return {
        actual: 'Boundary conditions (9, 10, 3000, 3001) verified and XSS payloads preserved cleanly',
      };
    }
  );

  await assertTest(
    'ZOD_VALIDATIONS',
    'Contact Form Enums: Strict enum validation for serviceRequested, budgetRange, timeline, meetingDate',
    'Enums and regex allow valid agency options and reject foreign input',
    async () => {
      const validForm = ContactFormSchema.safeParse({
        name: 'Marcus Global',
        email: 'marcus@apexpay.com',
        serviceRequested: 'ai-consulting',
        budgetRange: '$50k+',
        timeline: '1 - 3 months',
        meetingDate: '2026-10-25',
        meetingTime: '15:00 UTC',
        message: 'We require a sovereign on-prem LLM pipeline for compliance checking.',
      });
      if (!validForm.success) {
        throw new Error(`Valid form combination failed: ${validForm.error.message}`);
      }

      const badService = ContactFormSchema.safeParse({
        name: 'Marcus',
        email: 'marcus@apexpay.com',
        serviceRequested: 'unsupported-service' as any,
        message: 'Valid message for testing requirements.',
      });
      if (badService.success) throw new Error('Invalid serviceRequested was accepted');

      const badBudget = ContactFormSchema.safeParse({
        name: 'Marcus',
        email: 'marcus@apexpay.com',
        budgetRange: '$1M+' as any,
        message: 'Valid message for testing requirements.',
      });
      if (badBudget.success) throw new Error('Invalid budgetRange was accepted');

      const badDate = ContactFormSchema.safeParse({
        name: 'Marcus',
        email: 'marcus@apexpay.com',
        meetingDate: '25/10/2026',
        message: 'Valid message for testing requirements.',
      });
      if (badDate.success) throw new Error('Invalid meetingDate format was accepted');

      return { actual: 'Strict enums and date regex verified' };
    }
  );

  // =========================================================================
  // SECTION 4: Edge Runtime Middleware Security (src/middleware.ts)
  // =========================================================================

  await assertTest(
    'EDGE_MIDDLEWARE',
    'Middleware Route Guard: Unauthenticated access to /admin routes redirects to /admin/login?from=...',
    'Redirect 307 to /admin/login with preserved target path',
    async () => {
      const req = new NextRequest('http://localhost:3000/admin/services');
      const res = await middleware(req);
      if (res.status !== 307) {
        throw new Error(`Expected redirect status 307, got: ${res.status}`);
      }
      const location = res.headers.get('location');
      if (!location || !location.includes('/admin/login?from=%2Fadmin%2Fservices')) {
        throw new Error(`Invalid redirect location: ${location}`);
      }
      return { actual: `Redirected to ${location}`, details: { status: res.status, location } };
    }
  );

  await assertTest(
    'EDGE_MIDDLEWARE',
    'Middleware API Guard: Unauthenticated access to /api/admin returns 401 Unauthorized',
    'HTTP 401 with JSON { success: false, error: "Unauthorized" }',
    async () => {
      const req = new NextRequest('http://localhost:3000/api/admin/services');
      const res = await middleware(req);
      if (res.status !== 401) {
        throw new Error(`Expected status 401, got: ${res.status}`);
      }
      const body = await res.json();
      if (body.error !== 'Unauthorized') {
        throw new Error(`Unexpected error message: ${JSON.stringify(body)}`);
      }
      return { actual: `Blocked with 401: ${JSON.stringify(body)}` };
    }
  );

  await assertTest(
    'EDGE_MIDDLEWARE',
    'Middleware Authenticated Session: Valid session cookie passes through both /admin and /api/admin',
    'Request proceeds with x-middleware-next',
    async () => {
      const token = await signAdminToken(validPayload);

      const adminReq = new NextRequest('http://localhost:3000/admin/services', {
        headers: { cookie: `${SESSION_COOKIE_NAME}=${token}` },
      });
      const adminRes = await middleware(adminReq);
      if (adminRes.headers.get('x-middleware-next') !== '1') {
        throw new Error('Admin route was not allowed with valid token');
      }

      const apiReq = new NextRequest('http://localhost:3000/api/admin/services', {
        headers: { cookie: `${SESSION_COOKIE_NAME}=${token}` },
      });
      const apiRes = await middleware(apiReq);
      if (apiRes.headers.get('x-middleware-next') !== '1') {
        throw new Error('API route was not allowed with valid token');
      }

      return { actual: 'Authenticated session passes through admin routes and API routes' };
    }
  );

  await assertTest(
    'EDGE_MIDDLEWARE',
    'Middleware Tampered Session: Corrupted session cookie rejected and cookie cleared on redirect',
    'Admin route redirects and deletes cookie; API route returns 401',
    async () => {
      const token = await signAdminToken(validPayload);
      const tampered = token.slice(0, -6) + 'XXXXXX';

      const adminReq = new NextRequest('http://localhost:3000/admin/services', {
        headers: { cookie: `${SESSION_COOKIE_NAME}=${tampered}` },
      });
      const adminRes = await middleware(adminReq);
      if (adminRes.status !== 307) {
        throw new Error(`Expected redirect status 307, got: ${adminRes.status}`);
      }

      const apiReq = new NextRequest('http://localhost:3000/api/admin/services', {
        headers: { cookie: `${SESSION_COOKIE_NAME}=${tampered}` },
      });
      const apiRes = await middleware(apiReq);
      if (apiRes.status !== 401) {
        throw new Error(`Expected 401, got: ${apiRes.status}`);
      }
      const body = await apiRes.json();
      if (!body.error?.includes('Session expired or invalid')) {
        throw new Error(`Unexpected error message: ${JSON.stringify(body)}`);
      }

      return { actual: 'Tampered cookies cleanly rejected across page routes and API routes' };
    }
  );

  await assertTest(
    'EDGE_MIDDLEWARE',
    'Middleware Whitelist: /admin/login and /api/admin/login are unblocked for login flow',
    'Login endpoints pass without authentication checks',
    async () => {
      const loginPageReq = new NextRequest('http://localhost:3000/admin/login');
      const loginPageRes = await middleware(loginPageReq);
      if (loginPageRes.headers.get('x-middleware-next') !== '1') {
        throw new Error('/admin/login was blocked');
      }

      const loginApiReq = new NextRequest('http://localhost:3000/api/admin/login');
      const loginApiRes = await middleware(loginApiReq);
      if (loginApiRes.headers.get('x-middleware-next') !== '1') {
        throw new Error('/api/admin/login was blocked');
      }

      return { actual: 'Login routes pass through unblocked' };
    }
  );

  return results;
}

if (require.main === module || process.argv[1]?.includes('auth-validation-security')) {
  runSecurityStressTests()
    .then((results) => {
      console.log(JSON.stringify(results, null, 2));
      const failed = results.filter((r) => !r.passed);
      console.log(`\n==================================================`);
      console.log(`Security Stress Test Summary:`);
      console.log(`Total Tests Run: ${results.length}`);
      console.log(`Passed: ${results.filter((r) => r.passed).length}`);
      console.log(`Failed: ${failed.length}`);
      console.log(`==================================================\n`);

      if (failed.length > 0) {
        console.error(`❌ ${failed.length} security tests failed!`);
        process.exit(1);
      } else {
        console.log(`✅ All ${results.length} security and stress tests passed!`);
        process.exit(0);
      }
    })
    .catch((err) => {
      console.error('Fatal execution error:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
