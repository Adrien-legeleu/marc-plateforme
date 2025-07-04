'use client';
import {
  IconChevronRight,
  IconFileText,
  IconNewSection,
} from '@tabler/icons-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Article = {
  id: string;
  title: string;
  slug: string;
  pageParent: string;
  subCategory?: string;
  subCategoryId: string;
  createdAt: Date | string;
  order: number;
};

const pageParentOptions = [
  { value: '', label: 'Tous' },
  { value: 'agent', label: 'Agent Sportif' },
  { value: 'amateur', label: 'Foot amateur' },
  { value: 'pro', label: 'Foot pro' },
  { value: 'management', label: 'Management Carrières' },
];

export default function Page() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedPageParent, setSelectedPageParent] = useState('');

  function formatDate(dateStr: Date | string | undefined) {
    if (!dateStr) return '';
    try {
      const date = dateStr instanceof Date ? dateStr : new Date(dateStr);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  }

  const getData = async () => {
    try {
      const response = await fetch('/api/article');
      if (!response.ok) throw new Error('Échec de la requête');
      const json: Article[] = await response.json();
      json.sort((a, b) => a.order - b.order);
      console.log(json);

      setAllArticles(json);
      setFilteredArticles(json); // initial display

      const subCatIdToName: { [id: string]: string } = {};

      for (const article of json) {
        const parent = article.pageParent;

        if (!Object.values(subCatIdToName).includes(parent)) {
          const res = await fetch(`/api/subcategories?parent=${parent}`);
          const data = await res.json();

          for (const d of data) {
            subCatIdToName[d.id] = d.name;
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!selectedPageParent) {
      setFilteredArticles(allArticles);
    } else {
      setFilteredArticles(
        allArticles.filter((a) => a.pageParent === selectedPageParent)
      );
    }
  }, [selectedPageParent, allArticles]);
  async function moveArticleOrder({
    articleId,
    direction,
  }: {
    articleId: string;
    direction: 'up' | 'down';
  }) {
    await fetch(`/api/article/${articleId}/order`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction }),
    });
  }

  return (
    <div className="px-5">
      <div className="py-40 relative  max-w-7xl mx-auto">
        <div className="fixed bg-marcbluedark rounded-3xl p-5 shadow-2xl lg:bottom-20 lg:right-20 max-lg:top-5 right-5">
          <Link
            href={'/admin/new'}
            className="flex gap-2 font-semibold text-lg text-white items-center justify-center"
          >
            <IconNewSection />
            Nouveau
          </Link>
        </div>
        <h1 className="text-4xl text-center font-bold mb-10">
          Liste des articles
        </h1>

        {/* Menu de filtre */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {pageParentOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedPageParent(opt.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
                ${
                  selectedPageParent === opt.value
                    ? 'bg-marcblue text-white border-marcblue'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <ul className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 relative lg:grid-cols-4">
          {filteredArticles.map((article, idx) => (
            <li key={article.id} className="relative flex flex-col">
              {selectedPageParent !== '' && (
                <div className="absolute right-4  top-4 flex z-10 flex-col gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await moveArticleOrder({
                        articleId: article.id,
                        direction: 'up',
                      });
                      await getData();
                    }}
                    className="px-2 py-1 bg-gray-200 rounded-full disabled:opacity-50"
                    title="Monter"
                  >
                    ↑
                  </button>
                  <button
                    disabled={idx === filteredArticles.length - 1}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await moveArticleOrder({
                        articleId: article.id,
                        direction: 'down',
                      });
                      await getData();
                    }}
                    className="px-2 py-1 bg-gray-200 rounded-full disabled:opacity-50"
                    title="Descendre"
                  >
                    ↓
                  </button>
                </div>
              )}

              <Link
                href={`/admin/article/${article.id}`}
                className="group relative bg-white rounded-[3rem] border border-marcblue/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all p-8 min-h-[190px] flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-2 h-8 bg-gradient-to-b from-marcblue/80 to-marcblue/20 rounded-full"></span>
                  <IconFileText className="text-marcblue" size={24} />
                </div>
                <h2 className="text-xl font-bold mb-2 text-marcbluedark group-hover:text-marcblue transition-colors">
                  {article.title}
                </h2>
                <div className="text-sm text-gray-400 mb-3">
                  {formatDate(article.createdAt)}
                </div>
                <span className="flex items-center gap-2 mt-auto text-marcblue font-semibold group-hover:translate-x-2 transition">
                  Modifier l&apos;article <IconChevronRight size={18} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
