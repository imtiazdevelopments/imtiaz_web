
import InnerComponents from "../components/layout/InnerComponents";

const menuResponse = await fetch(`${process.env.BASE_URL}/api/menu_communities_properties.php`, {
  next: { revalidate: 60 },
})

const menuData = await menuResponse.json();

export const dynamic = "force-dynamic";

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { unlock } = useLenis();

  // useEffect(() => {
  //   unlock();
  // }, [unlock]);
  

  return (
    <>
      <InnerComponents menuData={menuData.data.listing}>
        {children}
        </InnerComponents>
    </>
  );
}
