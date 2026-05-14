import Index from '@/app/components/three-d-tour/Index'


const page = async () => {

  const response = await fetch(`${process.env.BASE_URL}/api/3dtour.php?lang=en`, {
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