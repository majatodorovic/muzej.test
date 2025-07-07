import SvgWithImage from "@/components/svg/Paths/SvgWithImage";

const GalleryDetails = ({ data }) => {
  return (
    <div
      data-aos="fade-up"
      className="sectionPaddingX sectionPaddingB flex gap-20 max-lg:flex-col max-lg:gap-10"
    >
      <div className={`flex flex-col gap-8 text-black lg:w-1/2`}>
        {data?.name && (
          <h2
            className="fontForum titleH2 !text-left !leading-tight"
            dangerouslySetInnerHTML={{ __html: data.name }}
          />
        )}
        {data?.description && (
          <div
            className="!text-left leading-tight xl:text-lg"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}
      </div>
      <div className="mx-auto md:w-1/2">
        <SvgWithImage image={data?.image} alt={data?.name} />
      </div>
    </div>
  );
};

export default GalleryDetails;
