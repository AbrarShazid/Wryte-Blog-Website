import { env } from "@/env";
import { BlogData } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface getBlogParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
}
interface getServiceOption {
  cache?: RequestCache;
  revalidate?: number;
}

export const blogService = {
  getBlogPost: async function (
    params?: getBlogParams,
    options?: getServiceOption,
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const serviceConfig: RequestInit = {};
      if (options?.cache) {
        serviceConfig.cache = options.cache;
      }

      if (options?.revalidate) {
        serviceConfig.next = { revalidate: options.revalidate };
      }
      //revalidation er part
      serviceConfig.next = { ...serviceConfig.next, tags: ["blogPost"] };

      const res = await fetch(url, serviceConfig);

      const data = await res.json();

      if (data.success) {
        return { data: data, error: null };
      }
      return { data: null, error: { message: "Something Went Wrong!" } };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong!" } };
    }
  },

  // getting individual   post
  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);

      const data = await res.json();

      if (data.success) {
        return { data: data, error: null };
      }
      return { data: null, error: "Something Went wrong!" };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong!" } };
    }
  },

  //creating blog post
  createBlogPost: async (blogData: BlogData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Something Went wrong" },
        };
      }
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong!" } };
    }
  },
};
