import SvgWithImage from "@/components/svg/Paths/SvgWithImage";

const NormalBanner = ({ banners }) => {
  const sortedBanners = [...banners].sort((a, b) => b.id - a.id).slice(0, 1);

  return (
    <section data-aos="fade-up">
      {sortedBanners.length > 0 &&
        sortedBanners.map((banner, index) => {
          return (
            <div
              key={index}
              className="sectionPaddingX sectionPaddingY flex gap-6 max-lg:flex-col"
            >
              <div className={`flex flex-col gap-8 text-black lg:w-1/2`}>
                {banner?.title && (
                  <h2
                    className="fontSpectral titleH2 !text-left !leading-tight"
                    dangerouslySetInnerHTML={{ __html: banner.title }}
                  />
                )}
                {banner?.text && (
                  <div
                    className="!text-left leading-tight xl:text-lg"
                    dangerouslySetInnerHTML={{ __html: banner.text }}
                  />
                )}
              </div>
              <div className="mx-auto w-full md:w-2/3 lg:w-1/2">
                {banner?.image && <SvgWithImage image={banner?.image} />}
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default NormalBanner;
