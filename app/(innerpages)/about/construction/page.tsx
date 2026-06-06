import Index from "@/app/components/construction/Index";

export default async function Page() {
  const response = await fetch(`${process.env.BASE_URL}/api/home.php?lang=en`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return (
    <>
      <Index data={data.data} />
    </>
  );
}
