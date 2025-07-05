import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { direction }: { direction: 'up' | 'down' } = await request.json();

  const current = await prisma.article.findUnique({ where: { id } });
  if (!current) return new Response('Not found', { status: 404 });

  const other = await prisma.article.findFirst({
    where: {
      pageParent: current.pageParent,
      order: direction === 'up' ? { lt: current.order } : { gt: current.order },
    },
    orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
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
