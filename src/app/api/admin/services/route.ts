import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ServiceFormSchema } from '@/lib/validations';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
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

    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A service with this slug already exists' },
        { status: 409 }
      );
    }

    const service = await prisma.service.create({
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

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Creation failed' }, { status: 500 });
  }
}
