export const revalidate = 30;
import { list } from "@/api/api";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";
import SvgWithImage from "../../../components/svg/Paths/SvgWithImage";

const getData = () => {
  return list("/static-pages/content/o-muzeju").then((res) => {
    return res?.payload;
  });
};

const Omuzeju = async () => {
  const data = await getData();

  const staticData = data?.items?.map((items) => {
    return items;
  });

  const keyGenerator = (prefix) => {
    return `${prefix}-${Math.random().toString(36)}`;
  };

  return (
    <>
      {/* Breadcrumb navigacija */}
      <BreadcrumbsStatic
        breadcrumbs={[
          { name: "O nama" },
       
          { name: "O muzeju" },
        ]}
      />

<div className="sectionPaddingX sectionPaddingB flex flex-col gap-10">
      {staticData?.map((item) => {
        switch (item?.type) {
          case "multiple_images":
            return (
              <div
                key={keyGenerator("multiple_images")}
                className={`mx-auto grid w-full !max-w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4`}
              >
                {item?.content?.map((image) => {
                  return (
                    <div
                      key={keyGenerator("image")}
                      className={`relative col-span-1 flex justify-center`}
                    >
                      <div className="w-full">
                        <SvgWithImage
                          image={image?.file}
                          alt={`${image?.file}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );

          case "html_editor":
            return (
              <div
                key={keyGenerator("html")}
                className={`prose mx-auto w-full !max-w-full`}
                dangerouslySetInnerHTML={{ __html: item?.content }}
              ></div>
            );

          case "textarea":
            return (
              <div
                key={keyGenerator("textarea")}
                className={`prose mx-auto w-full !max-w-full`}
                dangerouslySetInnerHTML={{ __html: item?.content }}
              ></div>
            );
        }
      })}
    </div>

    </>
  );
};
export default Omuzeju;
