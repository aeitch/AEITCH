import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CaseStudyFormSchema } from '@/lib/validations';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const cs = await prisma.caseStudy.findUnique({ where: { id } });
  if (!cs) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: cs });
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
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

    const updated = await prisma.caseStudy.update({
      where: { id },
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

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    await prisma.caseStudy.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Case study deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Deletion failed' }, { status: 500 });
  }
}
