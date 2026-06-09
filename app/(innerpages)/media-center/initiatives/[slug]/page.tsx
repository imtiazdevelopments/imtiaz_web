import Index from "@/app/components/initiative-details/Index";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/initiative_detail.php?slug=${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  return (
    <>
      <Index data={data.data}/>
    </>
  );
}
