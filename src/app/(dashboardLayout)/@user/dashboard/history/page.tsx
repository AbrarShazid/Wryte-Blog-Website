import HistoryTable from "@/components/modules/user/history/HistoryTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { blogService } from "@/services/blog.service";

export default async function History({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  // console.log(page);

  const response = await blogService.getBlogPost({
    page: page,
  });

  //   console.log(response.data.data.data);
  const pagination = response.data.data.pagination;
  //  console.log(response.data.data.pagination);

  const allPosts = response.data?.data?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Post History</h1>

      <HistoryTable posts={allPosts} />

      <PaginationControls meta={pagination}></PaginationControls>
    </div>
  );
}
