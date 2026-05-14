import Index from "@/app/components/sustainability/Index";

export default async function Page() {

  const response = await fetch(`${process.env.BASE_URL}/api/sustainability.php?lang=en`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  return (
    <>
      <Index data={data.data}/>
    </>
  );
}
