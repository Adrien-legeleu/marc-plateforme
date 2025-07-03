import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('body', body);

    const { title, pageParent, content, subCategoryName } = body;

    let subCategoryId = null;

    if (subCategoryName) {
      const existing = await prisma.subCategory.findFirst({
        where: { name: subCategoryName, parent: pageParent },
      });

      if (existing) {
        subCategoryId = existing.id;
      } else {
        const created = await prisma.subCategory.create({
          data: { name: subCategoryName, parent: pageParent },
        });
        subCategoryId = created.id;
      }
    }

    const slug = slugify(title);

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        pageParent,
        subCategoryId,
        content,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "erreur lors de la création de l'article" }),
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const articles = await prisma.article.findMany();
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'erreur lors de la récupération des articles' }),
      { status: 500 }
    );
  }
}
