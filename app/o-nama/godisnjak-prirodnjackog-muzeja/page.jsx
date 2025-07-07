import StaticHero from "@/components/StaticHero/StaticHero";
import Yearbook from "./components/Yearbook";

import { get, list } from "@/api/api";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const getAllPosts = async () => {
  return await list(`/news/category/list/godisnjak-prirodnjackog-muzeja`).then(
    (res) => {
      return res?.payload?.items;
    },
  );
};

const getCategoryData = async () => {
  return await get(
    `/news/categories/details/godisnjak-prirodnjackog-muzeja`,
  ).then((res) => {
    return res?.payload;
  });
};

const GodisnjakPrirodnjackogMuzeja = async () => {
  const posts = await getAllPosts();
  const categoryData = await getCategoryData();

  return (
    <>
      <StaticHero data={categoryData} />
      <BreadcrumbsStatic
        breadcrumbs={[
          { name: "O nama" },
          { name: "Godisnjak Prirodnjačkog muzeja" },
        ]}
      />
      <Yearbook posts={posts} />
    </>
  );
};

export default GodisnjakPrirodnjackogMuzeja;

export const metadata = {
  title: "Godisnjak prirodnjačkog muzeja | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
