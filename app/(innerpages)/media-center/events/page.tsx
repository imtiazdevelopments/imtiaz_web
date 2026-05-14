import Index from '@/app/components/events/Index'

const page = async() => {
  const response = await fetch(`${process.env.BASE_URL}/api/events.php?lang=en`, {
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