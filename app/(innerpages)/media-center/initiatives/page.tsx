import Index from "@/app/components/initiatives/Index";

export default async function Page() {

  const response = await fetch(`${process.env.BASE_URL}/api/initiatives.php`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  return (
    <>
      <Index data={data.data}/>
    </>
  );
}
