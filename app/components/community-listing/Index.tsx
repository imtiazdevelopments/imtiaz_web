import InnerHeroBanner from '../common/InnerHeroBanner'
import { bannerData,eventDetails } from './data'
import DubaiResidence from './sections/DubaiResidence'
import EverythingWithinReach from './sections/EverythingWithinReach'
import CommunitySlider from './sections/CommunitySlider'
import Amenities from './sections/Amenities'
import LandpropertyCards from './sections/LandpropertyCards'
const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxTitle='max-w-[73ch]' />
      <DubaiResidence />  
      <EverythingWithinReach />
      <CommunitySlider images={eventDetails[0].signatureImages} />
      <Amenities />
      <LandpropertyCards />
    </>
  )
}

export default Index