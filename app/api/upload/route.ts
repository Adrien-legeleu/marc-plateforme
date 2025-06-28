// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json(
      { error: 'Aucun fichier trouvé' },
      { status: 400 }
    );
  }

  if (file.size > 100 * 1024 * 1024) {
    return NextResponse.json(
      { error: 'Fichier trop volumineux' },
      { status: 413 }
    );
  }

  const blob = await put(file.name, file, {
    access: 'public', // ou 'private' si besoin
  });

  return NextResponse.json({ url: blob.url });
}
