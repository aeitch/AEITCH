import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const rawServices = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    const services = rawServices.map((svc) => ({
      ...svc,
      features: typeof svc.features === 'string' ? JSON.parse(svc.features) : svc.features,
      techStack: typeof svc.techStack === 'string' ? JSON.parse(svc.techStack) : svc.techStack,
    }));

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('GET /api/services error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
