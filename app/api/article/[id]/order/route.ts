import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { direction }: { direction: 'up' | 'down' } = await req.json();

  // Type Article Prisma si tu veux plus strict encore
  const current = await prisma.article.findUnique({ where: { id } });
  if (!current) return new Response('Not found', { status: 404 });

  const other = await prisma.article.findFirst({
    where: {
      pageParent: current.pageParent,
      order: direction === 'up' ? { lt: current.order } : { gt: current.order },
    },
    orderBy: {
      order: direction === 'up' ? 'desc' : 'asc',
    },
  });

  if (!other) return new Response("Can't move", { status: 400 });

  await prisma.$transaction([
    prisma.article.update({
      where: { id: current.id },
      data: { order: other.order },
    }),
    prisma.article.update({
      where: { id: other.id },
      data: { order: current.order },
    }),
  ]);

  return new Response('OK');
}
