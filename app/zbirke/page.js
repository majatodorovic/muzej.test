import { list } from "@/api/api";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";
import AllPosts from "./components/AllPosts";

async function fetchExhibitions(page = 1) {
  const res = await list(`/news/category/list/zbirke?page=${page}&limit=12`);
  return res;
}

const Blog = async () => {
  const data = await fetchExhibitions(1);
  const allPosts = data.payload.items || [];
  const totalPages = data.payload.pagination?.total_pages || 1;

  return (
    <>
      <BreadcrumbsStatic breadcrumbs={[{ name: "Zbirke" }]} />
      <div data-aos="fade-up" className={`sectionPaddingX sectionPaddingB`}>
        <h2 className="fontForum titleH2">Zbirke</h2>
        <AllPosts initialPosts={allPosts} totalPages={totalPages} />
      </div>
    </>
  );
};

export default Blog;

export const revalidate = 30;

export const metadata = {
  title: "Zbirke | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
