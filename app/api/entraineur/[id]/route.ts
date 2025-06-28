import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const entraineur = await prisma.entraineur.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!entraineur) {
      return new Response(JSON.stringify({ error: 'Entraineur non trouvé' }), {
        status: 404,
      });
    }
    return Response.json(entraineur);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'erreur serveur' }), {
      status: 500,
    });
  }
}
