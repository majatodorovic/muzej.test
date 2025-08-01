import StaticHero from "@/components/StaticHero/StaticHero";
import { get, list } from "@/api/api";
import PublicAd from "./components/PublicAd";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const category = "javni-poziv";

const getAllPosts = async () => {
  return await list(`/news/category/list/${category}`).then(
    (res) => res?.payload?.items,
  );
};

const getCategoryData = async () => {
  return await get(`/news/categories/details/${category}`).then((res) => {
    return res?.payload;
  });
};
const JavniPoziv = async () => {
  const posts = await getAllPosts();
  const categoryData = await getCategoryData();

  return (
    <>
      <StaticHero data={categoryData} />
      <BreadcrumbsStatic
        breadcrumbs={[
          { name: "O nama" },
       
          { name: "Javni poziv" },
        ]}
      />
      <PublicAd posts={posts} />
    </>
  );
};

export default JavniPoziv;

export const metadata = {
  title: "Javni poziv | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
