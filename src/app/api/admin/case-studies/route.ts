import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CaseStudyFormSchema } from '@/lib/validations';

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ success: true, data: caseStudies });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CaseStudyFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      title,
      slug,
      clientName,
      clientIndustry,
      type,
      summary,
      challenge,
      solution,
      results,
      techStack,
      coverImage,
      liveUrl,
      order,
      isFeatured,
      isActive,
    } = parsed.data;

    const existing = await prisma.caseStudy.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A case study with this slug already exists' },
        { status: 409 }
      );
    }

    const created = await prisma.caseStudy.create({
      data: {
        title,
        slug,
        clientName,
        clientIndustry,
        type,
        summary,
        challenge,
        solution,
        results: JSON.stringify(results),
        techStack: JSON.stringify(techStack),
        coverImage: coverImage || null,
        liveUrl: liveUrl || null,
        order,
        isFeatured,
        isActive,
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Creation failed' }, { status: 500 });
  }
}
