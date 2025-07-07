import StaticHero from "@/components/StaticHero/StaticHero";
import { get, list } from "@/api/api";
import ListItemsWithPagination from "../components/ListItemsWithPagination";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const POSTS_PER_PAGE = 10;
const category = "normativna-akta";

async function fetchPosts(page = 1) {
  const res = await list(
    `/news/category/list/${category}?page=${page}&limit=${POSTS_PER_PAGE}`,
  );
  return res?.payload || { items: [], pagination: { total_pages: 1 } };
}

const getCategoryData = async () => {
  return await get(`/news/categories/details/${category}`).then((res) => {
    return res?.payload;
  });
};

const NormativnaAkta = async () => {
  const data = await fetchPosts(1);
  const allPosts = data.items || [];
  const totalPages = data.pagination?.total_pages || 1;
  const categoryData = await getCategoryData();

  return (
    <>
      <StaticHero data={categoryData} />
      <BreadcrumbsStatic
        breadcrumbs={[
          { name: "O nama" },
          { name: "Javno poslovanje" },
          { name: "Normativna akta" },
        ]}
      />
      <ListItemsWithPagination
        initialPosts={allPosts}
        initialTotalPages={totalPages}
        postsPerPage={POSTS_PER_PAGE}
        category={category}
      />
    </>
  );
};

export default NormativnaAkta;

export const metadata = {
  title: "Normativna akta | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
