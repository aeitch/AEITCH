import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MetricCounterFormSchema } from '@/lib/validations';

export async function GET() {
  try {
    const metrics = await prisma.metricCounter.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ success: true, data: metrics });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = MetricCounterFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { label, value, prefix, suffix, description, icon, order, isActive } = parsed.data;

    const metric = await prisma.metricCounter.create({
      data: {
        label,
        value,
        prefix,
        suffix,
        description: description || null,
        icon: icon || null,
        order,
        isActive,
      },
    });

    return NextResponse.json({ success: true, data: metric }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Creation failed' }, { status: 500 });
  }
}
