import { prisma } from '@/lib/prisma';
export async function POST(req: Request) {
  const body = await req.json();
  const {
    name,
    firstName,
    email,
    telephone,
    diplomas,
    experience,
    pastClubs,
    targetAudience,
    type,
    projectType,
    cvUrls,
    photoUrls,
    socialLinks,
  } = body;
  try {
    const entraineur = await prisma.entraineur.create({
      data: {
        name,
        firstName,
        email,
        telephone,
        diplomas: diplomas ?? [],
        experience: experience ?? '',
        pastClubs: pastClubs ?? [],
        targetAudience: targetAudience ?? [],
        type,
        projectType: Array.isArray(projectType) ? projectType : [],
        cvUrls: cvUrls ?? [],
        photoUrls: photoUrls ?? [],
        socialLinks: socialLinks ?? [],
      },
    });
    return Response.json(entraineur);
  } catch {
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
  } catch {
    return new Response(
      JSON.stringify({
        error: 'Erreur lors de la récupération des entraineurs',
      })
    );
  }
}
