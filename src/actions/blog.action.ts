"use server";

import { blogService } from "@/services/blog.service";
import { BlogData } from "@/types";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogService.getBlogPost();
};


export const createBlogPost=async (blogData:BlogData)=>{

  const res= await blogService.createBlogPost(blogData)

  updateTag("blogPost")


  return res


}
