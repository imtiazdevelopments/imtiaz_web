import InnerHeroBanner from '../common/InnerHeroBanner'
import { bannerData } from './data'
import EventsSection from './sections/EventsSection'
import { Suspense } from 'react'

const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxW='max-w-[394px]' />
      <Suspense fallback={<div>Loading...</div>}>
        <EventsSection />  
      </Suspense>
    </>
  )
}

export default Index