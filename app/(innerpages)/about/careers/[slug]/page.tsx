import Index from '@/app/components/careers-details/Index'

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/career_detail.php?lang=en&slug=${slug}`,
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