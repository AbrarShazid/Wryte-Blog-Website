import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const { data, error } = await blogService.getBlogPost(
    {
      isFeatured: false,
    },
    {
      cache: "no-store",
    },
  );
  console.log(data);

  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-2 gap-3">
      {data.data.data.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post}></BlogCard>
      ))}
    </div>
  );
}
