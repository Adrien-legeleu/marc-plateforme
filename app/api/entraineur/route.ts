import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { name, firstName, email, telephone } = body;
  try {
    const entraineur = await prisma.entraineur.create({
      data: {
        name,
        firstName,
        email,
        telephone,
      },
    });
    return Response.json(entraineur);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la création de l'entraineur" }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const entraineurs = await prisma.entraineur.findMany();
    return Response.json(entraineurs);
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Erreur lors de la récupération des entraineurs',
      })
    );
  }
}
