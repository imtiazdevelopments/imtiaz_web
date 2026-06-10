export const dynamic = "force-dynamic";
import Index from '@/app/components/off-plan-properties/Index'

const page = async() => {

  const response = await fetch(`${process.env.BASE_URL}/api/trending_search_detail.php?slug=off-plan-properties`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  return (
    <>
      <Index data={data.data}/>
    </>
  )
}

export default page