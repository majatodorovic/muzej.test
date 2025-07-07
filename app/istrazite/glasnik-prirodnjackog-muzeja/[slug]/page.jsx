import StaticHero from "@/components/StaticHero/StaticHero";
import HistoryList from "./components/HistoryList";
import { get, list } from "@/api/api";

const getCategoryData = async (slug) => {
  const res = await get(`/news/categories/details/${slug}`);
  return res.payload;
};

const getAllPosts = async (slug) => {
  return await list(`/news/category/list/${slug}`).then((res) => {
    return res?.payload?.items;
  });
};

const GlasnikPrirodnjackogMuzejaDetaljno = async ({ params }) => {
  const { slug } = params;
  const categoryData = await getCategoryData(slug);
  const posts = await getAllPosts(slug);
  // const formatText = (text) => {
  //   const sentence = text.replace(/-/g, " ").toLowerCase();
  //   return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  // };
  return (
    <>
      {/* <BreadcrumbsStatic
        breadcrumbs={[
          { name: "Istražite", url: "/istrazite" },
          {
            name: "Glasnik Prirodnjačkog muzeja",
            url: "/istrazite/glasnik-prirodnjackog-muzeja",
          },
          { name: formatText(slug) },
        ]}
      /> */}
      <StaticHero data={categoryData} />
      <div data-aos="fade-up" className="sectionPaddingY sectionPaddingX">
        <HistoryList items={posts} />
      </div>
    </>
  );
};

export default GlasnikPrirodnjackogMuzejaDetaljno;

export const metadata = {
  title: "Glasnik prirodnjačkog muzeja | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
