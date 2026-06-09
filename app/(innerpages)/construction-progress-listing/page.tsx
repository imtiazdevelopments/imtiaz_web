import Index from '@/app/components/construction-progress-listing/Index'


const page = async() => {

  const response = await fetch(`${process.env.BASE_URL}/api/construction.php`, {
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