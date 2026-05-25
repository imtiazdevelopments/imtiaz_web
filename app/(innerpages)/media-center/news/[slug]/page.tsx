import Index from "@/app/components/news-details/Index";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/news_detail.php?lang=en&slug=${slug}`,
    { next: { revalidate: 60 } }
  );
  const data = await response.json();
          console.log(data, " our story");

  const allNewsResponse = await fetch(
    `${process.env.BASE_URL}/api/news.php?lang=en`,
    { next: { revalidate: 60 } }
  );
  const allNewsData = await allNewsResponse.json();

  return (
    <Index data={data.data} allNewsData={allNewsData.data}/>
  )
}

export default page