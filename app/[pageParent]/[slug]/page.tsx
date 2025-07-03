import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

type Block =
  | { type: 'h1' | 'h2' | 'h3' | 'paragraph'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

// 👇 voici la bonne signature
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
    <div className="max-w-6xl mx-auto relative py-40 px-5">
      <div
        className={cn(
          'absolute w-full h-full inset-0  z-0',
          '[background-size:20px_20px]',
          '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]'
        )}
      />
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <h1 className="md:text-5xl sm:text-4xl text-3xl text-center text-marcbluedark z-10 relative font-bold mb-16">
        {article.title}
      </h1>

      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1
                key={idx}
                className="md:text-4xl sm:text-3xl text-2xl text-marcblue relative z-10 font-bold my-7"
              >
                {block.content}
              </h1>
            );
          case 'h2':
            return (
              <h2
                key={idx}
                className="md:text-3xl sm:text-2xl text-xl relative text-marcblue z-10 font-semibold my-6"
              >
                {block.content}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={idx}
                className="md:text-2xl sm:text-xl text-lg text-marcblue relative z-10 font-medium mt-7 mb-5"
              >
                {block.content}
              </h3>
            );
          case 'paragraph':
            return (
              <p
                key={idx}
                className=" z-10 md:text-lg text-md relative leading-relaxed"
              >
                {block.content}
              </p>
            );
          case 'list':
            return (
              <ul
                key={idx}
                className="list-disc z-10 md:text-lg relative list-inside mb-4 mt-1"
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case 'table':
            return (
              <div
                key={idx}
                className="overflow-x-auto text-lg relative z-10 mb-6"
              >
                <table className="w-full rounded-3xl border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      {block.headers.map((header, i) => (
                        <th
                          key={i}
                          className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-100 text-left"
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
                            className="border rounded-xl border-gray-300 px-4 py-2"
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
