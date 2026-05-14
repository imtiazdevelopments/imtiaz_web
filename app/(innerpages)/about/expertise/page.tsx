import Index from "@/app/components/expertise/Index";

export default async function Page() {

  const response = await fetch(`${process.env.BASE_URL}/api/expertise.php?lang=en`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  return (
    <>
      <Index data={data.data}/>
    </>
  );
}
