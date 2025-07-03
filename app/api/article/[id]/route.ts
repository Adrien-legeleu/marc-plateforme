import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { slugify } from '../route';

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ error: 'ID mansuant' }, { status: 400 });
    }
    const article = await prisma.article.delete({ where: { id: id } });
    if (!article) {
      return new Response(JSON.stringify({ error: 'article non trouvé' }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "erreur lors de la suppression de l'article" }),
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    let subCategoryId = null;

    if (body.subCategoryName) {
      const existing = await prisma.subCategory.findFirst({
        where: { name: body.subCategoryName, parent: body.pageParent },
      });

      if (existing) {
        subCategoryId = existing.id;
      } else {
        const created = await prisma.subCategory.create({
          data: { name: body.subCategoryName, parent: body.pageParent },
        });
        subCategoryId = created.id;
      }
    }

    const article = await prisma.article.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug: slugify(body.title),
        content: body.content,
        pageParent: body.pageParent,
        subCategoryId: subCategoryId,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "erreur lors de la modification de l'article" }),
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }

    const article = await prisma.article.findUnique({
      where: { id: id },
    });
    if (!article) {
      return new Response(JSON.stringify({ error: 'article non trouvé' }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "erreur lors de la récupération de l'article" })
    );
  }
}
