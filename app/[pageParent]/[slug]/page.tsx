import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ pageParent: string; slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { pageParent, slug } = await params;

  const article = await prisma.article.findFirst({
    where: { pageParent, slug },
  });

  if (!article) return notFound();

  return (
    <div className="max-w-5xl mx-auto relative py-40 px-5">
      <div
        className={cn(
          'absolute w-full h-full inset-0 z-0',
          '[background-size:20px_20px]',
          '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]'
        )}
      />
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <h1 className="md:text-5xl sm:text-4xl text-3xl text-center text-marcbluedark z-10 relative font-bold mb-16">
        {article.title}
      </h1>

      <div
        className="relative z-10 space-y-6 prose prose-lg text-lg article-content max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content || '' }}
      />
    </div>
  );
}
