import InnerHeroBanner from '../common/InnerHeroBanner'
import { bannerData } from './data'
import CommunitiesSection from './sections/CommunitySection'

const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxW='max-w-[805px]' />
      <CommunitiesSection />  
    </>
  )
}

export default Index