import Index from '@/app/components/construction-progress/Index'

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/construction_progress_detail.php?slug=${slug}`,
    { next: { revalidate: 60 } }
  );
  const data = await response.json();

  return (
    <>
      <Index data={data.data}/>
    </>
  )
}

export default page