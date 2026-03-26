import BlogContent from "./sections/BlogContent";
import BlogHero from "./sections/BlogHero";
import { blogDetails } from "./data";
import RelatedBlogs from "./sections/RelatedBlogs";

const Index = () => {
  return (
    <>
      <BlogHero blog={blogDetails[0]} />
      <BlogContent content={blogDetails[0].content} />
      <RelatedBlogs />
    </>
  );
};

export default Index;
