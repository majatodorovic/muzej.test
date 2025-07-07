import StaticHero from "@/components/StaticHero/StaticHero";
import MuseumHistory from "./components/MuseumHistory";
import { get } from "@/api/api";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const getCategoryData = async () => {
  return await get(
    `/news/categories/details/glasnik-prirodnjackog-muzeja`,
  ).then((res) => {
    return res?.payload;
  });
};
const getTreeWithParent = async () => {
  return await get(
    `/news/categories/tree?parent=glasnik-prirodnjackog-muzeja`,
  ).then((res) => {
    return res?.payload;
  });
};

const GlasnikPrirodnjackogMuzeja = async () => {
  const categoryData = await getCategoryData();
  const dataWithParent = await getTreeWithParent();

  return (
    <>
      <StaticHero data={categoryData} />
      <BreadcrumbsStatic
        breadcrumbs={[
          { name: "Istražite" },
          { name: "Glasnik Prirodnjačkog muzeja" },
        ]}
      />
      <MuseumHistory categoryData={categoryData} categories={dataWithParent} />
    </>
  );
};

export default GlasnikPrirodnjackogMuzeja;

export const metadata = {
  title: "Glasnik prirodnjačkog muzeja | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
