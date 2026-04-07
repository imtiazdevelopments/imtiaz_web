import InnerHeroBanner from '../common/InnerHeroBanner'
import { bannerData, projectsData } from './data'
import Main from './sections/Main'
import ProjectList from './sections/ProjectList'

const Index = () => {
    return (
        <>
            <InnerHeroBanner {...bannerData} maxW='max-w-[805px]' />
            <Main />
            {/* <ProjectList projects={projectsData}/> */}
        </>
    )
}

export default Index