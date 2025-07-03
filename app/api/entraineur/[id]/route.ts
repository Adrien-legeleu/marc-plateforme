import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  const entraineur = await prisma.entraineur.findUnique({
    where: { id: parseInt(id) },
  });
  if (!entraineur) {
    return new Response(JSON.stringify({ error: 'Entraineur non trouvé' }), {
      status: 404,
    });
  }
  return NextResponse.json(entraineur);
}
