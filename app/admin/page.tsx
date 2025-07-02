'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState<any[]>([]); // mets un type plus précis si tu connais la forme

  const getData = async () => {
    try {
      const response = await fetch('/api/article', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Échec de la requête');
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="py-40 px-10">
      <h1 className="text-2xl font-bold mb-4">Liste des articles</h1>
      <ul className="space-y-4">
        {data.map((article, index) => (
          <Link
            href={`/admin/article/${article.id}`}
            key={index}
            className="p-4 border flex flex-col max-w-sm rounded shadow-sm bg-white"
          >
            <p className="font-semibold">Titre : {article.title}</p>
            <p className="text-sm text-gray-600">Slug : {article.slug}</p>
            <p className="text-sm text-gray-500">Page : {article.pageParent}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
}
