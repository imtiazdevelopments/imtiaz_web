import { pressItems } from '../../news/data'
import BlogCard from '../../blogs/sections/BlogCard'
import CustomOutlineButton from '../../common/CustomOutlineButton'

const OtherEvents = () => {
  return (
    <section className='pb-120 3xl:pb-160 container' data-header="dark">
        <div className='border-t border-black/10 pt-50'>
            <h2 className='text-heading text-center uppercase'>Other Events</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-40 mt-50'>
                {pressItems.slice(0, 2).map((item) => (
                    <BlogCard key={item.id} blog={item} />
                ))}
            </div>
            <div className='flex justify-center mt-50'>
              <CustomOutlineButton variant="dark" text='View All' borderColor='border-primary-2' textColor='text-foreground-light' px='px-[26px] 3xl:px-[37px]' />
            </div>
        </div>
    </section>
  )
}

export default OtherEvents