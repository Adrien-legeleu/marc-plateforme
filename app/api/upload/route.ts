import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(req: Request) {
  try {
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

    // 🧠 Ajout d’un suffixe aléatoire pour éviter les collisions
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 100000);
    const extension = file.name.split('.').pop();
    const baseName = file.name.replace(/\.[^/.]+$/, ''); // supprime l’extension
    const uniqueName = `${baseName}-${timestamp}-${randomSuffix}.${extension}`;

    const blob = await put(uniqueName, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error('❌ ERREUR /api/upload :', err);
    return NextResponse.json(
      { error: 'Erreur serveur lors de l’upload' },
      { status: 500 }
    );
  }
}
