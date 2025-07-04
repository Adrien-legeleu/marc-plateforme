'use client';
import { IconNewSection } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Article = {
  id: string;
  title: string;
  slug: string;
  pageParent: string;
  subCategory?: string;
  subCategoryId: string;
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
  const [subcategoriesMap, setSubcategoriesMap] = useState<{
    [id: string]: string;
  }>({});

  const getData = async () => {
    try {
      const response = await fetch('/api/article');
      if (!response.ok) throw new Error('Échec de la requête');
      const json = await response.json();
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
      console.log(subCatIdToName);

      setSubcategoriesMap(subCatIdToName);
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

        {/* Grille des articles */}
        <ul className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredArticles.map((article) => (
            <Link
              href={`/admin/article/${article.id}`}
              key={article.id}
              className="p-5 border rounded-[3rem] shadow-sm bg-white flex flex-col gap-5 transition hover:shadow-md"
            >
              <h3 className="font-semibold text-2xl text-center">
                {article.title}
              </h3>

              <div className="flex flex-col items-center gap-2">
                {subcategoriesMap[article.subCategoryId] && (
                  <p className="text-md bg-marcblue rounded-full px-3 py-1 text-white">
                    {subcategoriesMap[article.subCategoryId]}
                  </p>
                )}

                <p className="text-sm bg-marcblue rounded-full px-3 py-1 text-white">
                  /{article.pageParent}/{article.slug}
                </p>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
