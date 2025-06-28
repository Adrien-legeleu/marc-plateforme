import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const joueur = await prisma.joueur.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!joueur) {
      return new Response(JSON.stringify({ error: 'Joueur non trouvé' }), {
        status: 404,
      });
    }
    return Response.json(joueur);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'erreur serveur' }), {
      status: 500,
    });
  }
}
