import InnerHeroBanner from "../common/InnerHeroBanner"
import PaymentForm from "./PaymentSection"
import { bannerData } from "./data"

const Index = () => {
  return (
    <>
    <InnerHeroBanner {...bannerData} maxW="max-w-[641px]" />
    <PaymentForm />
    </>
  )
}

export default Index