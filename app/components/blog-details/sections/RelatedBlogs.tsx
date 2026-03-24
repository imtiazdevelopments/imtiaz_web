import { blogs } from '../../blogs/data'
import BlogCard from '../../blogs/sections/BlogCard'
import CustomOutlineButton from '../../common/CustomOutlineButton'

const RelatedBlogs = () => {
  return (
    <section className='pb-160 container'>
        <div className='border-t border-black/10 pt-50'>
            <h2 className='text-heading text-center uppercase'>Related Blogs</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-40 mt-50'>
                {blogs.slice(0, 2).map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
            <div className='flex justify-center mt-50'>
              <CustomOutlineButton text='View All' borderColor='border-primary-2' textColor='foreground-light' px='px-[37px]' />
            </div>
        </div>
    </section>
  )
}

export default RelatedBlogs