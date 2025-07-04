import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { IconFileText, IconChevronRight } from '@tabler/icons-react';

export default async function Page(props: {
  params: Promise<{ pageParent: string; slug: string }>;
}) {
  const { pageParent } = await props.params;

  const articles = await prisma.article.findMany({
    where: { pageParent },
    orderBy: { createdAt: 'desc' },
  });

  const subCategories = await prisma.subCategory.findMany({
    where: { parent: pageParent },
    orderBy: { name: 'asc' },
  });

  if (!articles.length) return notFound();

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

  const articlesSansSousCat = articles.filter((a) => !a.subCategoryId);
  const articlesParSousCat: { [key: string]: typeof articles } = {};
  for (const sub of subCategories) {
    articlesParSousCat[sub.id] = articles.filter(
      (a) => a.subCategoryId === sub.id
    );
  }

  return (
    <div className="py-40 max-w-6xl mx-auto px-5">
      <div className="mb-20 max-w-3xl mx-auto space-y-4">
        <h1 className="text-5xl text-center font-black capitalize tracking-tight text-marcblue">
          {pageParent}
        </h1>
        <p className="text-lg text-center">
          Retrouvez tous nos articles classés par thématique.
        </p>
      </div>
      {articlesSansSousCat.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {articlesSansSousCat.map((article) => (
            <Link
              key={article.id}
              href={`/${article.pageParent}/${article.slug}`}
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
                Lire l&apos;article <IconChevronRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      )}

      {subCategories.map((subCat) => {
        const articlesDeLaSousCat = articlesParSousCat[subCat.id];
        if (!articlesDeLaSousCat?.length) return null;
        return (
          <div key={subCat.id} className="mb-14">
            <h2 className="text-3xl font-bold mb-8 mt-10 text-marcblue/90 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-marcblue/50 rounded-full" />
              {subCat.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {articlesDeLaSousCat.map((article) => (
                <Link
                  key={article.id}
                  href={`/${article.pageParent}/${article.slug}`}
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
                    Lire l&apos;article <IconChevronRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
