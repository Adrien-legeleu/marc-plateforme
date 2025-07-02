import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

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
    const article = await prisma.article.update({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
      },
      where: { id: params.id },
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
