"use client"
import { getBlogs } from "@/actions/blog.action";

import { useEffect, useState } from "react";

export default function ContactPage() {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await getBlogs();
      setData(data);
    })();
  },[]);

  console.log(data);
  

  return <div>Contact</div>;
}
