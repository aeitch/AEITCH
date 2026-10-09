import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ContactFormSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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

    // Honeypot check
    if (website_hp && website_hp.length > 0) {
      return NextResponse.json({ success: true, inquiryId: 'bot-filtered' });
    }

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    let inquiryId = 'consult_' + Date.now().toString(36);
    try {
      const inquiry = await prisma.inquiry.create({
        data: {
          name,
          email,
          company: company || null,
          serviceRequested: serviceRequested || 'consultation',
          budgetRange: budgetRange || null,
          timeline: timeline || null,
          message,
          meetingDate: meetingDate || null,
          meetingTime: meetingTime || null,
          status: 'NEW',
          notes: `Consultation requested for ${meetingDate || 'TBD'} at ${meetingTime || 'TBD'}`,
          ipAddress,
          userAgent,
        },
      });
      inquiryId = inquiry.id;
    } catch (dbErr) {
      console.warn('[Consultation API] Database unavailable or running on serverless without persistence. Inquiry logged:', {
        inquiryId,
        name,
        email,
        company,
        serviceRequested,
        meetingDate,
        meetingTime,
        error: dbErr instanceof Error ? dbErr.message : String(dbErr),
      });
    }

    return NextResponse.json(
      {
        success: true,
        inquiryId,
        message: 'Consultation session booked. Calendar invite and preparation notes will be sent shortly.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Consultation API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
