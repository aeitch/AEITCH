import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');

    const where: Record<string, unknown> = { isActive: true };
    if (type) {
      where.type = type;
    }
    if (featured === 'true') {
      where.isFeatured = true;
    }

    const rawCaseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    const caseStudies = rawCaseStudies.map((cs) => ({
      ...cs,
      results: typeof cs.results === 'string' ? JSON.parse(cs.results) : cs.results,
      techStack: typeof cs.techStack === 'string' ? JSON.parse(cs.techStack) : cs.techStack,
    }));

    return NextResponse.json({
      success: true,
      data: caseStudies,
    });
  } catch (error) {
    console.error('GET /api/case-studies error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch case studies' },
      { status: 500 }
    );
  }
}
