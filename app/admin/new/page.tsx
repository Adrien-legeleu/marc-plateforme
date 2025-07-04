'use client';

import ArticleEditor from '@/components/dashboard/ArticleEditor';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();

  const saveArticle = async (data: {
    title: string;
    pageParent: string;
    subCategoryName: string;
    content: string; // HTML
  }) => {
    try {
      const response = await fetch('/api/article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Échec de la requête');

      toast('✅ Article créé avec succès.');
      router.push('/admin'); // Ou la route de la liste
    } catch (error) {
      console.error(error);
      toast.error("❌ Erreur lors de la création de l'article");
    }
  };

  return (
    <div className="py-40">
      <ArticleEditor onSave={saveArticle} />
    </div>
  );
}
