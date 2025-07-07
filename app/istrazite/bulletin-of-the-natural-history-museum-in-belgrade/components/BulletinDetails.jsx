import SvgWithImage from "@/components/svg/Paths/SvgWithImage";

const BulletinDetails = ({ data }) => {
  return (
    <div
      data-aos="fade-up"
      className="sectionPaddingX sectionPaddingB flex items-start gap-20 max-lg:flex-col max-lg:gap-10"
    >
      <div className={`flex flex-col gap-8 text-black lg:w-1/2`}>
        <div className="fontForum text-5xl xl:text-7xl">Trenutno izdanje:</div>
        {data?.name && (
          <h2
            className="fontForum titleH2 notranslate !text-left"
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
      <div className="mx-auto w-full md:w-1/2">
        <SvgWithImage image={data?.image} alt={data?.name} />
      </div>
    </div>
  );
};

export default BulletinDetails;
