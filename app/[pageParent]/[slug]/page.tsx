import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

type Block =
  | { type: 'h1' | 'h2' | 'paragraph'; content: string }
  | { type: 'list'; items: string[] };

export default async function ArticlePage({
  params,
}: {
  params: { pageParent: string; slug: string };
}) {
  const article = await prisma.article.findFirst({
    where: {
      pageParent: params.pageParent,
      slug: params.slug,
    },
  });

  if (!article) return notFound();
  const blocks = article.content as Block[];
  return (
    <div className="max-w-3xl mx-auto py-40 px-5">
      <h1 className="text-4xl font-bold mb-10">{article.title}</h1>

      {blocks.map((block: any, idx: number) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1 key={idx} className="text-3xl font-bold my-6">
                {block.content}
              </h1>
            );
          case 'h2':
            return (
              <h2 key={idx} className="text-2xl font-semibold my-4">
                {block.content}
              </h2>
            );
          case 'paragraph':
            return (
              <p key={idx} className="mb-4 leading-relaxed">
                {block.content}
              </p>
            );
          case 'list':
            return (
              <ul key={idx} className="list-disc list-inside mb-4">
                {block.items?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
