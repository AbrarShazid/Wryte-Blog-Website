import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export default function CreateBlogFormServer() {
  const createBlog = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;

    const blogData = {
      title,
      content,
      tags: tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };

    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(blogData),
    });

    // console.log(JSON.stringify(blogData));

    // console.log(res);

    // if (res.status) {
          // revalidateTag("blogPost","max")
      // updateTag("blogPost");
    // }
  };

  return (
    <div>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create A Blog</CardTitle>
          <CardDescription>Write your thoughts..</CardDescription>
        </CardHeader>

        <CardContent>
          <form id="blog-form" action={createBlog}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  placeholder="Blog Title"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="content">Content</FieldLabel>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
                <Input id="tags" name="tags" placeholder="nextjs, web" />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            form="blog-form"
            type="submit"
            className="mx-auto min-w-[60%] "
          >
            Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
