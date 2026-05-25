import Index from "@/app/components/community-details/Index";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/community_detail.php?lang=en&slug=${slug}`,
    { next: { revalidate: 60 } },
  );
  const data = await response.json();

  const communitiesResponse = await fetch(
    `${process.env.BASE_URL}/api/communities.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  const communitiesData = await communitiesResponse.json();

  return (
    <>
      <Index data={data.data} communitiesData={communitiesData.data} />
    </>
  );
};

export default page;
