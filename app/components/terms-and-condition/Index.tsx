import InnerHeroBanner from '../common/InnerHeroBanner'
import FooterContent from '../common/FooterContent'
import { termsContent } from './data'

const Index = () => {
  return (
    <>
    <InnerHeroBanner title="Terms & Conditions" image="/images/privacy.jpg"  />
    <FooterContent content={termsContent} title="Imtiaz Terms & Conditions" />
    </>
  )
}

export default Index