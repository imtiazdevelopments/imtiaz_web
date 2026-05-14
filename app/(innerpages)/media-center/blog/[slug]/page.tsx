import Index from "@/app/components/blog-details/Index";

const page = async({ params }: { params: Promise<{ slug: string }> }) => {

  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/blog_detail.php?lang=en&slug=${slug}`,
    { next: { revalidate: 60 } }
  );
  const data = await response.json();

  const allBlogsResponse = await fetch(
    `${process.env.BASE_URL}/api/blogs.php?lang=en`,
    { next: { revalidate: 60 } }
  );
  const allBlogsData = await allBlogsResponse.json();

  return (
    <Index data={data.data} allBlogsData={allBlogsData.data}/>
  )
}

export default page