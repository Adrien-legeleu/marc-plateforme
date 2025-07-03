import { prisma } from '@/lib/prisma';

export async function GET({ params }: { params: { id: string } }) {
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
  } catch {
    return new Response(JSON.stringify({ error: 'erreur serveur' }), {
      status: 500,
    });
  }
}
