import { get, list } from "@/api/api";
import SpecialEditionsPagination from "./components/SpecialEditionsPagination";
import SpecialEditionsBanner from "./components/SpecialEditionsDetails";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const POSTS_PER_PAGE = 5;
const category = "posebna-izdanja-prirodnjackog-muzeja";

async function fetchExhibitions(page = 1) {
  const res = await list(
    `/news/category/list/${category}?page=${page}&limit=${POSTS_PER_PAGE}`,
  );
  return res;
}

const getCategoryData = async () => {
  return await get(`/news/categories/details/${category}`).then((res) => {
    return res?.payload;
  });
};

const PosebnaIzdanjaPrirodnjackogMuzeja = async () => {
  const data = await fetchExhibitions(1);
  const allPosts = data.payload.items || [];
  const totalPages = data.payload.pagination?.total_pages || 1;
  const categoryData = await getCategoryData();

  return (
    <>
      <BreadcrumbsStatic
        breadcrumbs={[
          { name: "Istražite" },
          { name: "Posebna izdanja Prirodnjačkog muzeja" },
        ]}
      />
      <SpecialEditionsBanner data={categoryData} />
      <SpecialEditionsPagination
        initialPosts={allPosts}
        totalPages={totalPages}
        category={category}
      />
    </>
  );
};

export default PosebnaIzdanjaPrirodnjackogMuzeja;

export const metadata = {
  title: "Posebna izdanja prirodnjačkog muzeja | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
