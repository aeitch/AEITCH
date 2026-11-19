import type { IncomingMessage, ServerResponse } from 'http';

// In-memory rate limiting map: ip -> { count: number, resetAt: number }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_BODY_BYTES = 50 * 1024; // 50 KB

const SERVICE_LABELS: Record<string, string> = {
  'ai-automation': 'AI Automation',
  'product-development': 'Product Development',
  'devops-cloud': 'DevOps & Cloud',
  'custom-software': 'Custom Software',
  'not-sure': 'Not Sure Yet',
};

// Strips carriage returns and newlines to prevent header injection
function stripNewlines(str: string): string {
  return str.replace(/[\r\n]+/g, ' ').trim();
}

// Escapes special characters for safe HTML inclusion
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Standard email validation pattern
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
  honeypot?: string;
  pageUrl?: string;
}

export function validateSubmission(data: any): { valid: boolean; error?: string; cleanData?: ContactSubmissionPayload } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid JSON request payload' };
  }

  // Honeypot check: reject bots silently
  const honeypot = typeof data.honeypot === 'string' ? data.honeypot.trim() : (data.website_hp || '');
  if (honeypot) {
    // Return valid=false but indicate honeypot so handler can reply { ok: true } without sending
    return { valid: false, error: 'HONEYPOT_TRIGGERED' };
  }

  // Name
  if (typeof data.name !== 'string' || !data.name.trim()) {
    return { valid: false, error: 'Full name is required' };
  }
  const name = stripNewlines(data.name.trim());
  if (name.length > 100) {
    return { valid: false, error: 'Full name exceeds 100 characters' };
  }

  // Email
  if (typeof data.email !== 'string' || !data.email.trim()) {
    return { valid: false, error: 'Work email is required' };
  }
  const email = stripNewlines(data.email.trim());
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return { valid: false, error: 'Please enter a valid work email address' };
  }

  // Company (optional)
  let company = '';
  if (typeof data.company === 'string') {
    company = stripNewlines(data.company.trim()).slice(0, 100);
  }

  // Phone (optional)
  let phone = '';
  if (typeof data.phone === 'string') {
    phone = stripNewlines(data.phone.trim()).slice(0, 50);
  }

  // Service
  const validServices = ['ai-automation', 'product-development', 'devops-cloud', 'custom-software', 'not-sure'];
  let service = 'ai-automation';
  if (typeof data.service === 'string' && validServices.includes(data.service.trim().toLowerCase())) {
    service = data.service.trim().toLowerCase();
  }

  // Message (required, min 20, max 2000)
  if (typeof data.message !== 'string') {
    return { valid: false, error: 'Message is required' };
  }
  const message = data.message.trim();
  if (message.length < 20) {
    return { valid: false, error: 'Message must be at least 20 characters' };
  }
  if (message.length > 2000) {
    return { valid: false, error: 'Message cannot exceed 2000 characters' };
  }

  // Page URL (optional)
  const pageUrl = typeof data.pageUrl === 'string' ? stripNewlines(data.pageUrl.trim()).slice(0, 500) : 'https://aeitch.com/contact';

  return {
    valid: true,
    cleanData: {
      name,
      email,
      company,
      phone,
      service,
      message,
      pageUrl,
    },
  };
}

// Client IP extractor
function getClientIp(req: IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

// Rate limiting check
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean expired
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Send email using Resend API or SMTP
async function sendContactEmail(payload: ContactSubmissionPayload): Promise<{ success: boolean; errors: string[] }> {
  const recipientsEnv = process.env.CONTACT_RECIPIENTS || 'haseeb@aeitch.com,umer.khan@parkkaro.pk';
  const recipients = recipientsEnv
    .split(',')
    .map((r) => r.trim())
    .filter((r) => r.length > 0);

  const fromAddress = process.env.CONTACT_FROM || 'AEITCH Website <no-reply@aeitch.com>';
  const serviceLabel = SERVICE_LABELS[payload.service] || payload.service;
  const subject = `New AEITCH query: ${serviceLabel} — ${payload.name}`;

  const submissionTime = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'full',
    timeStyle: 'medium',
  }) + ' (UTC)';

  const plainText = `
NEW QUERY RECEIVED VIA AEITCH WEBSITE
======================================

Name: ${payload.name}
Email: ${payload.email}
Company: ${payload.company || 'Not provided'}
Phone: ${payload.phone || 'Not provided'}
Selected Service: ${serviceLabel}
Submitted At: ${submissionTime}
Page URL: ${payload.pageUrl}

PROJECT DESCRIPTION:
--------------------
${payload.message}

Reply-To: ${payload.email}
======================================
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #050505; color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #0b0b0c; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden;">
    <tr>
      <td style="padding: 24px 32px; background-color: #121214; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <table width="100%">
          <tr>
            <td>
              <span style="font-size: 18px; font-weight: 700; letter-spacing: -0.5px; color: #ffffff;">AEITCH</span>
              <span style="font-size: 12px; margin-left: 8px; color: #FFC247; text-transform: uppercase; font-family: monospace;">New Query</span>
            </td>
            <td align="right">
              <span style="font-size: 12px; color: #85858c;">${escapeHtml(submissionTime)}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <h2 style="margin: 0 0 20px; font-size: 22px; font-weight: 500; color: #ffffff;">
          ${escapeHtml(payload.name)} sent an inquiry
        </h2>
        
        <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 24px; background-color: #121214; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
          <tr>
            <td width="130" style="color: #a1a1aa; font-size: 13px;">Selected Service:</td>
            <td style="color: #FFC247; font-weight: 600; font-size: 13px;">${escapeHtml(serviceLabel)}</td>
          </tr>
          <tr>
            <td style="color: #a1a1aa; font-size: 13px;">Email:</td>
            <td style="color: #fafafa; font-size: 13px;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #5EEAD4; text-decoration: none;">${escapeHtml(payload.email)}</a></td>
          </tr>
          <tr>
            <td style="color: #a1a1aa; font-size: 13px;">Company:</td>
            <td style="color: #fafafa; font-size: 13px;">${escapeHtml(payload.company || 'Not provided')}</td>
          </tr>
          <tr>
            <td style="color: #a1a1aa; font-size: 13px;">Phone:</td>
            <td style="color: #fafafa; font-size: 13px;">${escapeHtml(payload.phone || 'Not provided')}</td>
          </tr>
          <tr>
            <td style="color: #a1a1aa; font-size: 13px;">Page Source:</td>
            <td style="color: #85858c; font-size: 12px;">${escapeHtml(payload.pageUrl || '')}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #85858c; margin-bottom: 8px;">Project Details:</div>
          <div style="padding: 20px; background-color: #121214; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); color: #fafafa; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(payload.message)}</div>
        </div>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
          <a href="mailto:${escapeHtml(payload.email)}?subject=Re:%20${encodeURIComponent(subject)}" style="display: inline-block; padding: 12px 28px; background-color: #FFC247; color: #1a1203; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 13px;">
            Reply to ${escapeHtml(payload.name)}
          </a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const resendApiKey = process.env.RESEND_API_KEY;
  const errors: string[] = [];
  let successfulSends = 0;

  // Option 1: Resend API
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: recipients,
          reply_to: payload.email,
          subject,
          text: plainText,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[AEITCH Contact] Resend API error (${response.status}):`, errorText);
        errors.push(`Resend error: ${response.status}`);
      } else {
        successfulSends += recipients.length;
      }
    } catch (err: any) {
      console.error('[AEITCH Contact] Resend fetch exception:', err?.message || err);
      errors.push(err?.message || 'Network error sending to Resend');
    }
  } else {
    // Development / Sandbox mode
    console.log(`[AEITCH Contact] [DEV/SANDBOX MODE] Submission validated successfully from "${payload.name}" <${payload.email}> for "${serviceLabel}". Email would be dispatched to: ${recipients.join(', ')}`);
    successfulSends = recipients.length;
  }

  return {
    success: successfulSends > 0,
    errors,
  };
}

// HTTP handler for Connect / Vite / Express
export function handleContactRequest(req: IncomingMessage, res: ServerResponse): void {
  // Only handle POST
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: 'Method Not Allowed' }));
    return;
  }

  // Rate limit
  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    res.statusCode = 429;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: 'Too many requests. Please wait 10 minutes before submitting again.' }));
    return;
  }

  let body = '';
  let bodyBytes = 0;

  req.on('data', (chunk) => {
    bodyBytes += chunk.length;
    if (bodyBytes > MAX_BODY_BYTES) {
      res.statusCode = 413;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, error: 'Payload too large' }));
      req.destroy();
      return;
    }
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const parsed = JSON.parse(body);
      const validation = validateSubmission(parsed);

      if (!validation.valid) {
        // If honeypot was triggered, respond with success silently
        if (validation.error === 'HONEYPOT_TRIGGERED') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true }));
          return;
        }

        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: false, error: validation.error || 'Invalid form data' }));
        return;
      }

      const sendResult = await sendContactEmail(validation.cleanData!);

      if (sendResult.success) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: true }));
      } else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: false, error: 'Failed to deliver email. Please try again or contact us directly.' }));
      }
    } catch (err: any) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, error: 'Invalid JSON request format' }));
    }
  });
}
