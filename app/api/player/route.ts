import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// (Optionnel) Augmenter la limite de taille du body si nécessaire (ex. dans un fichier route.ts Next.js App Router)
// export const config = { api: { bodyParser: { sizeLimit: '100mb' } } };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Parse and convert fields from request body
    const parseDateFr = (dateStr: string): Date => {
      const [day, month, year] = dateStr.split('/');
      return new Date(Number(year), Number(month) - 1, Number(day));
    };

    // Récupération des champs du body
    const {
      name,
      firstName,
      email,
      telephone,
      position,
      strongFoot,
      height,
      weight,
      nationalities,
      lastClub,
      currentLevel,
      educationLevel,
      mobility,
      cvUrls,
      photoUrls,
      videoUrls,
      bornDate,
      premium,
    } = body;

    // Conversion de la date de naissance en objet Date
    let bornDateValue: Date | undefined;
    if (bornDate) {
      if (typeof bornDate === 'string') {
        // Si format français JJ/MM/AAAA, on utilise parseDateFr, sinon Date()
        bornDateValue = bornDate.includes('/')
          ? parseDateFr(bornDate)
          : new Date(bornDate);
      } else if (bornDate instanceof Date) {
        bornDateValue = bornDate;
      }
    }

    // Création du joueur en base de données
    const joueur = await prisma.joueur.create({
      data: {
        name,
        firstName,
        email,
        telephone,
        // @ts-ignore: If bornDateValue is undefined and bornDate is required, Prisma will throw – we handle in catch
        bornDate: bornDateValue,
        position: position ?? [], // assure un tableau (vide si aucune valeur)
        strongFoot: strongFoot || null, // stocker null au lieu de chaîne vide si non fourni
        height: height ? Number(height) : null,
        weight: weight ? Number(weight) : null,
        nationalities: nationalities ?? [], // assure un tableau
        lastClub,
        currentLevel,
        educationLevel,
        mobility,
        cvUrls: cvUrls ?? [],
        photoUrls: photoUrls ?? [],
        videoUrls: videoUrls ?? [],
        premium: premium ?? false,
      },
    });
    return new Response(JSON.stringify(joueur), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la création du joueur :', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la création du joueur' }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const joueurs = await prisma.joueur.findMany();
    return new Response(JSON.stringify(joueurs), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs :', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération des joueurs' }),
      { status: 500 }
    );
  }
}
