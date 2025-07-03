'use client';
import ArticleEditor from '@/components/dashboard/ArticleEditor';
import React from 'react';
import { toast } from 'sonner';

export default function page() {
  const saveArticle = async (data: {
    title: string;
    pageParent: string;
    content: Array<{ type: string; content?: string; items?: string[] }>;
  }) => {
    try {
      const response = await fetch('/api/article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Échec de la requête');
      }

      toast('✅ Article créé avec succès.');
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
