import { get, list } from "@/api/api";
import SubCategoryList from "./components/SubCategoryList";
import SvgWithImage from "@/components/svg/Paths/SvgWithImage";

const getCategoryData = async (slug) => {
  const res = await get(`/news/categories/details/${slug}`);
  return res.payload;
};

const getAllPosts = async (slug) => {
  return await list(`/news/category/list/${slug}`).then((res) => {
    return res?.payload?.items;
  });
};

const BulletinOfTheNaturalHistoryMuseumInBelgradeDetails = async ({
  params,
}) => {
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
            name: "Bulletin of the Natural History Museum in Belgrade",
            url: "/istrazite/bulletin-of-the-natural-history-museum-in-belgrade",
          },
          { name: formatText(slug) },
        ]}
      /> */}
      <div data-aos="fade-up" className="sectionPaddingX sectionPaddingB">
        <div className="mx-auto w-full md:w-1/2 2xl:w-1/3">
          <SvgWithImage image={categoryData?.image} alt={categoryData?.name} />
          <div>
            <h1 className="titleH2 fontForum mt-4">{categoryData?.name}</h1>
          </div>
        </div>
        <div className="mt-[140px]">
          <SubCategoryList categories={posts} />
        </div>
      </div>
    </>
  );
};
export default BulletinOfTheNaturalHistoryMuseumInBelgradeDetails;

export const metadata = {
  title:
    "Bulletin of the Natural History Museum in Belgrade | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
