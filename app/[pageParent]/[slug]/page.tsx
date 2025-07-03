import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

type Block =
  | { type: 'h1' | 'h2' | 'h3' | 'paragraph'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

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

      {blocks.map((block, idx) => {
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
          case 'h3':
            return (
              <h3 key={idx} className="text-xl font-medium my-3">
                {block.content}
              </h3>
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
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case 'table':
            return (
              <div key={idx} className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      {block.headers.map((header, i) => (
                        <th
                          key={i}
                          className="border border-gray-300 px-4 py-2 bg-gray-100 text-left"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="border border-gray-300 px-4 py-2"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
