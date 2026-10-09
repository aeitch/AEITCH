import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ContactFormSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check for bots (must be empty)
    if (body.website_hp && typeof body.website_hp === 'string' && body.website_hp.length > 0) {
      return NextResponse.json({ success: true, inquiryId: 'bot-filtered' });
    }

    const parsed = ContactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      company,
      serviceRequested,
      budgetRange,
      timeline,
      message,
      meetingDate,
      meetingTime,
      website_hp,
    } = parsed.data;

    // Honeypot check for bots
    if (website_hp && website_hp.length > 0) {
      return NextResponse.json({ success: true, inquiryId: 'bot-filtered' });
    }

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    let inquiryId = 'inq_' + Date.now().toString(36);
    try {
      const inquiry = await prisma.inquiry.create({
        data: {
          name,
          email,
          company: company || null,
          serviceRequested: serviceRequested || null,
          budgetRange: budgetRange || null,
          timeline: timeline || null,
          message,
          meetingDate: meetingDate || null,
          meetingTime: meetingTime || null,
          status: 'NEW',
          ipAddress,
          userAgent,
        },
      });
      inquiryId = inquiry.id;
    } catch (dbErr) {
      console.warn('[Contact API] Database unavailable or running on serverless without persistence. Inquiry logged:', {
        inquiryId,
        name,
        email,
        company,
        serviceRequested,
        message,
        error: dbErr instanceof Error ? dbErr.message : String(dbErr),
      });
    }

    return NextResponse.json(
      {
        success: true,
        inquiryId,
        message: 'Inquiry received successfully. Our engineering lead will respond within 24 hours.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
