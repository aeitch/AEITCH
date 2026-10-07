import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TestimonialFormSchema } from '@/lib/validations';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = TestimonialFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { clientName, clientRole, clientCompany, avatarUrl, quote, rating, verified, order, isActive } =
      parsed.data;

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        clientRole,
        clientCompany,
        avatarUrl: avatarUrl || null,
        quote,
        rating,
        verified,
        order,
        isActive,
      },
    });

    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Creation failed' }, { status: 500 });
  }
}
