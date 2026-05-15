import Index from "@/app/components/our-story/Index";

export default async function Page() {

  const response = await fetch(`${process.env.BASE_URL}/api/our_story.php?lang=en`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  console.log(data, "Abt");

  return (
    <>
      <Index data={data.data}/>
    </>
  );
}
