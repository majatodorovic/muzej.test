import Contact from "@/components/Contact/Contact";
import StaticHero from "@/components/StaticHero/StaticHero";
import { Suspense } from "react";
import CenterForMarkAnimals from "./components/CenterForMarkAnimals";
import { get, list } from "@/api/api";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const category = "centar-za-markiranje-zivotinja";

const getCategoryData = async () => {
  return await get(`/news/categories/details/${category}`).then((res) => {
    return res?.payload;
  });
};
const getAllPosts = async () => {
  return await list(`/news/category/list/${category}`).then(
    (res) => res?.payload?.items,
  );
};

const CentarZaMarkiranjeZivotinja = async () => {
  const posts = await getAllPosts();
  const categoryData = await getCategoryData();

  return (
    <>
      <StaticHero data={categoryData} />
      <BreadcrumbsStatic
        breadcrumbs={[
          { name: "Istražite" },
          { name: "Centar za markiranje životinja" },
        ]}
      />
      <CenterForMarkAnimals posts={posts} />
      <div data-aos="fade-up" className="bg-secondary">
        <div className="sectionPaddingY sectionPaddingX">
          <Suspense fallback={<div>Učitavanje kontakt forme...</div>}>
            <Contact />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default CentarZaMarkiranjeZivotinja;

export const metadata = {
  title: "Centar za markiranje životinja | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
