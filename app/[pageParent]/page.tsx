import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import type { Article } from '@prisma/client';

export default async function Page({
  params,
}: {
  params: { pageParent: string };
}) {
  const articles: Article[] = await prisma.article.findMany({
    where: { pageParent: params.pageParent },
  });

  if (!articles.length) return notFound();

  return (
    <div className="py-40 max-w-5xl mx-auto px-5">
      <h1 className="text-5xl text-center mb-20 font-bold capitalize">
        {params.pageParent}
      </h1>
      <ul className="space-y-6 flex flex-wrap items-center justify-center gap-10">
        {articles.map((article) => (
          <li key={article.id}>
            <Link
              href={`/${article.pageParent}/${article.slug}`}
              className="text-2xl w-full max-w-xs block py-10 px-5 text-center rounded-3xl border shadow-2xl font-medium text-marcblue"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
