export default function Page({
  params,
}: {
  params: { pageParent: string; slug: string };
}) {
  return (
    <div>
      {params.pageParent} / {params.slug}
    </div>
  );
}
