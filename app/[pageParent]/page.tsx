import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Page(props: {
  params: Promise<{ pageParent: string; slug: string }>;
}) {
  const { pageParent, slug } = await props.params;

  const articles = await prisma.article.findMany({ where: { pageParent } });
  if (articles.length === 0) return notFound();

  return (
    <div className="py-40 max-w-5xl mx-auto px-5">
      <h1 className="text-5xl text-center mb-20 font-bold capitalize">
        {pageParent}
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
