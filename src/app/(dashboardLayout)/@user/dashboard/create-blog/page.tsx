import { CreateBlogFormClient } from "@/components/modules/user/createBlog/CreateBlogFormClient";
import CreateBlogFormServer from "@/components/modules/user/createBlog/CreateBlogFormServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function CreateBlog() {
  const { data } = await blogService.getBlogPost();

  return (
    <div>
      <div>
        {data.data.data.map((item: BlogPost) => (
          <h1 key={item.id}>{item.title} </h1>
        ))}
      </div>
      <CreateBlogFormClient></CreateBlogFormClient>

      {/* <CreateBlogFormServer></CreateBlogFormServer> */}
    </div>
  );
}
