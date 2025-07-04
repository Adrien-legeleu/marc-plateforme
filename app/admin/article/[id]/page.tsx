'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ArticleEditor from '@/components/dashboard/ArticleEditor';

type Article = {
  id: string;
  title: string;
  pageParent: string;
  content: string; // HTML
  subCategory?: { name: string };
};

export default function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/article/${id}`);
        if (!res.ok) throw new Error('Erreur de chargement');
        const json = await res.json();
        console.log(json);

        setArticle(json);
      } catch (err) {
        console.error(err);
        toast.error('Impossible de charger l’article.');
      }
    })();
  }, [id]);

  const handleUpdate = async (data: {
    title: string;
    pageParent: string;
    subCategoryName: string;
    content: string;
  }) => {
    try {
      const res = await fetch(`/api/article/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast('✅ Article mis à jour.');
    } catch {
      toast.error('Erreur lors de la mise à jour.');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/article/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast('🗑️ Article supprimé.');
      router.push('/admin');
    } catch {
      toast.error('Erreur lors de la suppression.');
    }
  };

  if (!article) return <p className="p-10">Chargement...</p>;

  return (
    <div className="mx-auto py-40">
      <div className="px-5">
        <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Modifier l’article</h1>
          <button
            onClick={handleDelete}
            className="px-5 py-3 bg-red-600 text-white rounded-3xl"
          >
            Supprimer
          </button>
        </div>
      </div>
      <ArticleEditor
        initialTitle={article.title}
        initialContent={article.content}
        initialPageParent={article.pageParent}
        initialSubCategory={article.subCategory?.name || ''}
        onSave={handleUpdate}
      />
    </div>
  );
}
