import InnerHeroBanner from '../common/InnerHeroBanner'
import { bannerData } from './data'
import InvestorFaq from './sections/InvestorFaq'
import ImtiazProperties from './sections/ImtiazProperties'
import ImtiazCommunities from './sections/ImtiazCommunities'
import Reasons from './sections/Reasons'
import InvestmentSection from './sections/InvestmentSection'

const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxW='max-w-[690px]' />
      <Reasons />
      <InvestmentSection />
      <ImtiazCommunities />
      <ImtiazProperties />
      <InvestorFaq />
    </>
  )
}

export default Index