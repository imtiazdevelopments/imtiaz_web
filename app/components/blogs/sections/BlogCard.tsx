import Image from "next/image";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

interface BlogCardProps {
blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {

const formatted = (date: string) => {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${month}-${day}-${year}`;
};

  return (
    <Link href={`/media-center/blog/${blog.slug}`} className="group block">
      <div className="relative w-full h-[340px] lg:h-[522px] overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {/* Overlay */}
        <div
          className="hidden md:block absolute inset-0"
          style={{background: "linear-gradient(182.34deg, rgba(0, 0, 0, 0) 29.48%, #000000 98.07%)"}}
        />

                <div
          className="md:hidden absolute inset-0"
          style={{background: "linear-gradient(182.34deg, rgba(0, 0, 0, 0) 15.48%, #000000 98.07%)"}}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end items-center py-40 px-50">
          <p className="text-white/80 font-[avenirHeavy] text-16 mb-20 leading-[1.54] capitalize">
            {blog.category} - {formatted(blog.date)}
          </p>
          <h3 className="text-white uppercase text-25 leading-[1.5] md:leading-[1.4] mb-40 text-center">
            {blog.title}
          </h3>
          <span className="text-white font-[avenirHeavy] text-19 leading-[100%] border-b border-white/40 group-hover:border-white transition-all duration-300">
            Read More
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
