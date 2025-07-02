'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ArticleEditor from '@/components/dashboard/ArticleEditor';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<any | null>(null);

  const fetchArticle = async () => {
    console.log(id);

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
  };

  const handleUpdate = async (data: {
    title: string;
    pageParent: string;
    content: any[];
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

  useEffect(() => {
    fetchArticle();
  }, []);

  if (!article) return <p className="p-10">Chargement...</p>;

  return (
    <div className="max-w-4xl mx-auto py-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Modifier l’article</h1>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Supprimer
        </button>
      </div>

      <ArticleEditor
        initialBlocks={article.content}
        initialTitle={article.title}
        initialPageParent={article.pageParent}
        onSave={(data) => handleUpdate(data)}
      />
    </div>
  );
}
