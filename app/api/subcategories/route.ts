import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parent = searchParams.get('parent');
  if (!parent) return NextResponse.json([], { status: 200 });

  const data = await prisma.subCategory.findMany({
    where: { parent },
    orderBy: { name: 'asc' },
  });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, parent } = body;
  if (!name || !parent) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
  }

  const existing = await prisma.subCategory.findFirst({
    where: { name, parent },
  });

  if (existing) return NextResponse.json(existing);

  const created = await prisma.subCategory.create({
    data: { name, parent },
  });
  return NextResponse.json(created);
}
