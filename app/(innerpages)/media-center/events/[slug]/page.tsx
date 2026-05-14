import Index from "@/app/components/event-details/Index";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/event_detail.php?lang=en&slug=${slug}`,
    { next: { revalidate: 60 } }
  );
  const data = await response.json();

  const allEventsResponse = await fetch(
    `${process.env.BASE_URL}/api/events.php?lang=en`,
    { next: { revalidate: 60 } }
  );
  const allEventsData = await allEventsResponse.json();

  return <Index data={data.data} allEventsData={allEventsData.data}/>;
};

export default page;
