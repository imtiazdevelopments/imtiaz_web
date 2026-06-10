import InnerHeroBanner from '../common/InnerHeroBanner'
import FooterContent from '../common/FooterContent'
import { content } from './data'

const Index = () => {
  return (
    <>
    <InnerHeroBanner title="Privacy Policy" image="/images/privacy.jpg"  />
    <FooterContent content={content} title="Imtiaz Privacy Policy" />
    </>
  )
}

export default Index