import InnerHeroBanner from '../common/InnerHeroBanner'
import FooterContent from '../common/FooterContent'
import { cookieContent } from './data'

const Index = () => {
  return (
    <>
    <InnerHeroBanner title="Cookie Policy" image="/images/privacy.jpg"  />
    <FooterContent content={cookieContent} title="Imtiaz Cookie Policy" />
    </>
  )
}

export default Index