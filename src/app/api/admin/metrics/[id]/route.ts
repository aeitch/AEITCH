import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MetricCounterFormSchema } from '@/lib/validations';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const m = await prisma.metricCounter.findUnique({ where: { id } });
  if (!m) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: m });
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = MetricCounterFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { label, value, prefix, suffix, description, icon, order, isActive } = parsed.data;

    const updated = await prisma.metricCounter.update({
      where: { id },
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

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    await prisma.metricCounter.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Metric deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Deletion failed' }, { status: 500 });
  }
}
