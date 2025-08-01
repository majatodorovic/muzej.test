import { get } from "@/api/api";

import Ticketss from "./components/Ticketss";
import WorkingHourss from "./components/WorkingHourss";
import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

import GalleryDetailss from "./components/GalleryDetailss";

const getCategoryData = async () => {
  return await get(
    `/news/categories/details/galerija-prirodnjackog-muzeja`,
  ).then((res) => {
    return res?.payload;
  });
};

const GalerijaPrirodnjackogMuzeja = async () => {
  const categoryData = await getCategoryData();

  return (
    <>
      <BreadcrumbsStatic
       breadcrumbs={[{ name: "Galerija" }]}
      />
      <GalleryDetailss data={categoryData} />
      <div data-aos="fade-up" className="bg-secondary">
        <div className="sectionPaddingX flex gap-14 py-20 max-md:flex-col xl:gap-20">
          <div>
            <button className="relative mb-10">
              <SvgButtonOne className="h-[52px] w-[250px]" fill="#fff" />
              <div className="buttonText w-[250px] !text-primary">
                Radno vreme
              </div>
            </button>
            <WorkingHourss />
          </div>
          <div>
            <button className="relative mb-10">
              <SvgButtonOne className="h-[52px] w-[250px] rotate-180" />
              <div className="buttonText w-[250px]">Cene ulaznica</div>
            </button>
            <Ticketss />
          </div>
        </div>
      </div>
    </>
  );
};

export default GalerijaPrirodnjackogMuzeja;

export const metadata = {
  title: "Galerija prirodnjačkog muzeja | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
