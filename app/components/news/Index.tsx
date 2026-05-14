import InnerHeroBanner from '../common/InnerHeroBanner'
import { bannerData, NewsListingResponse } from './data'
import NewsSection from './sections/NewsSection'
import { Suspense } from 'react'

const Index = ({data}:{data:NewsListingResponse['data']}) => {
  return (
    <>
      <InnerHeroBanner 
      title={data.page_banner_title}
      description={data.page_banner_caption}
      image={data.page_banner_desktop}
      maxW='max-w-[580px]' />
      <Suspense fallback={<div>Loading...</div>}>
        <NewsSection data={data}/>
      </Suspense>
    </>
  )
}

export default Index