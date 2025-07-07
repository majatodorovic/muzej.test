import { get } from "@/api/api";
import BulletinDetails from "./components/BulletinDetails";
import BulletinList from "./components/BulletinList";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const getTreeWithParent = async () => {
  return await get(
    `/news/categories/tree?parent=bulletin-of-the-natural-history-museum-in-belgrade`,
  ).then((res) => {
    return res?.payload;
  });
};

const getCategoryData = async () => {
  return await get(
    `/news/categories/details/bulletin-of-the-natural-history-museum-in-belgrade`,
  ).then((res) => {
    return res?.payload;
  });
};

const BulletinOfTheNaturalHistoryMuseumInBelgrade = async () => {
  const categoryData = await getCategoryData();
  const dataWithParent = await getTreeWithParent();

  return (
    <>
      <BreadcrumbsStatic
        breadcrumbs={[
          { name: "Istražite" },
          {
            name: "Bulletin of the Natural History Museum in Belgrade",
            class: "notranslate",
          },
        ]}
      />
      <BulletinDetails data={categoryData} />
      <BulletinList dataWithParent={dataWithParent} />
    </>
  );
};

export default BulletinOfTheNaturalHistoryMuseumInBelgrade;

export const metadata = {
  title:
    "Bulletin of the Natural History Museum in Belgrade | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
