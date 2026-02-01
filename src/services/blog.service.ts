import { env } from "@/env";

const API_URL = env.API_URL;

interface getBlogParams {
  isFeatured?: boolean;
  search?: string;
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

  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);

      const data = await res.json();

      if (data.success) {
        return { data: data, error: null };
      }
      return { data: null, error: "Something Went wrong!" };
    } catch (err) {
      return { data: null, error: "Something Went wrong!" };
    }
  },
};
