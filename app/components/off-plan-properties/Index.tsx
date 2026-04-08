import OffPlanBanner from './sections/OffPlanBanner'
import { offPlanBannerData } from './data'
import OffplanFaq from './sections/OffplanFaq'
import WhyInvest from './sections/WhyInvest'

const Index = () => {
  return (
    <>
    <OffPlanBanner {...offPlanBannerData} maxW='max-w-[352px]' />
    <WhyInvest />
    <OffplanFaq />
    </>
  )
}

export default Index