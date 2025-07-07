"use client";

import Image from "next/image";

const WorldBanner = ({ banners }) => {
  const sortedBanners = [...banners].sort((a, b) => b.id - a.id).slice(0, 1);

  return (
    <div
      data-aos="fade-up"
      className="sectionPaddingX bg-primary pt-20 xl:pt-[120px]"
    >
      {sortedBanners.length > 0 &&
        sortedBanners.map((banner, index) => {
          return (
            <div
              key={index}
              className="mb-[100px] flex justify-between gap-10 text-white max-lg:flex-col xl:items-center"
            >
              {banner?.title && (
                <h2
                  className="fontSpectral titleH2 !text-left lg:w-1/2"
                  dangerouslySetInnerHTML={{ __html: banner.title }}
                />
              )}
              {banner?.text && (
                <div
                  className="lg:w-1/2 xl:text-lg"
                  dangerouslySetInnerHTML={{ __html: banner.text }}
                />
              )}
            </div>
          );
        })}
      <Image
        alt="planet"
        src={"/images/planet.png"}
        width={1000}
        height={400}
        className="mx-auto"
      />
    </div>
  );
};

export default WorldBanner;
