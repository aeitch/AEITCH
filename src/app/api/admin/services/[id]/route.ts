import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ServiceFormSchema } from '@/lib/validations';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: service });
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = ServiceFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      title,
      slug,
      tagline,
      category,
      description,
      fullContent,
      icon,
      features,
      techStack,
      order,
      isActive,
    } = parsed.data;

    const updated = await prisma.service.update({
      where: { id },
      data: {
        title,
        slug,
        tagline,
        category,
        description,
        fullContent,
        icon,
        features: JSON.stringify(features),
        techStack: JSON.stringify(techStack),
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
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Deletion failed' }, { status: 500 });
  }
}
