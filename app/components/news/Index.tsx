import InnerHeroBanner from '../common/InnerHeroBanner'
import { bannerData } from './data'
import NewsSection from './sections/NewsSection'
import { Suspense } from 'react'

const Index = () => {
  return (
    <>
      <InnerHeroBanner {...bannerData} maxW='max-w-[580px]' />
      <Suspense fallback={<div>Loading...</div>}>
        <NewsSection />
      </Suspense>
    </>
  )
}

export default Index