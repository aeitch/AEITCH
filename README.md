# AEITCH Website & Contact System

Production-grade website and autonomous systems portfolio for **AEITCH** built with React, TypeScript, Tailwind CSS, and Vite.

## Contact Form & Email Delivery

The contact page at `/contact` features an automated query submission system that delivers all prospective inquiries directly to the engineering team.

### Recipients
Every inquiry is dispatched simultaneously to:
- `haseeb@aeitch.com`
- `umer.khan@parkkaro.pk`

### Configuration (`.env`)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure your email provider:
```env
CONTACT_RECIPIENTS="haseeb@aeitch.com,umer.khan@parkkaro.pk"
CONTACT_FROM="AEITCH Website <no-reply@aeitch.com>"
RESEND_API_KEY="re_your_api_key_here"
```

In development when no `RESEND_API_KEY` is present, the endpoint automatically operates in **Dev Sandbox Mode**, validating all inputs, simulating delivery, and logging submission metadata without writing message text to logs.

---

## Required DNS Records for `aeitch.com`

Because one recipient (`umer.khan@parkkaro.pk`) is on an external domain, modern mail servers (Gmail, Google Workspace, Outlook) enforce strict anti-spoofing policies (DMARC, SPF, DKIM). To ensure 100% inbox delivery when sending from `no-reply@aeitch.com`, configure the following DNS records in your domain registrar/DNS provider (Cloudflare, Namecheap, Route 53, etc.):

### 1. SPF Record (Sender Policy Framework)
Authorizes the mail provider to send emails on behalf of `@aeitch.com`.

* **Type**: `TXT`
* **Name / Host**: `@` (or `aeitch.com`)
* **Value**: `v=spf1 include:resend.com ~all`
*(If you already have an existing SPF record, add `include:resend.com` before the `~all` flag, e.g., `v=spf1 include:_spf.google.com include:resend.com ~all`)*

### 2. DKIM Records (DomainKeys Identified Mail)
Cryptographically signs every outgoing email from `aeitch.com` to prevent tampering.

* **Type**: `CNAME` (or `TXT` as assigned by Resend dashboard)
* **Name / Host**: `resend._domainkey` (or domain-specific selector from Resend)
* **Value**: `resend._domainkey.resend.com.` (or custom DKIM key provided in Resend)

### 3. DMARC Record (Domain-based Message Authentication)
Informs receiving mail servers how to treat messages claiming to come from `@aeitch.com`.

* **Type**: `TXT`
* **Name / Host**: `_dmarc` (or `_dmarc.aeitch.com`)
* **Value**: `v=DMARC1; p=none; rua=mailto:dmarc-reports@aeitch.com; pct=100; sp=none`
*(Once SPF and DKIM pass validation, update `p=none` to `p=quarantine` or `p=reject` for strict brand protection).*

### 4. MX Record Check
Ensure your incoming MX records for `aeitch.com` (e.g. Google Workspace / Microsoft 365) are unaffected. Sending via Resend uses outbound DKIM/SPF and does not conflict with existing inbound MX records.

---

## Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) or [http://localhost:5173/contact](http://localhost:5173/contact).
