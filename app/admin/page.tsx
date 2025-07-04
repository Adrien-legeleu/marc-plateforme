'use client';
import {
  IconChevronRight,
  IconFileText,
  IconNewSection,
} from '@tabler/icons-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { formatDate } from '../[pageParent]/page';

type Article = {
  id: string;
  title: string;
  slug: string;
  pageParent: string;
  subCategory?: string;
  subCategoryId: string;
  createdAt: Date;
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
              key={article.id}
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
          ))}
        </ul>
      </div>
    </div>
  );
}
