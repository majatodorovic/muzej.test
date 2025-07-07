"use client";

import Image from "next/image";

const StaticHero = ({ data }) => {
  return (
    <div
      data-aos="fade-up"
      className="relative h-[700px] bg-secondary lg:h-[800px] xl:h-[850px]"
    >
      {data?.image && (
        <Image
          src={data.image}
          alt={"Hero"}
          width={1920}
          height={600}
          className="clipPathSlider h-[550px] w-full object-cover lg:h-[600px]"
        />
      )}
      <div className="absolute left-0 top-0 z-[49] h-full w-full">
        <div className="sectionPaddingX absolute bottom-[50px] left-0 flex w-full items-center justify-between gap-6 text-left max-md:flex-col max-md:items-start lg:bottom-[100px]">
          <div className="flex items-stretch gap-2 xl:gap-3">
            <h1
              className="fontSpectral prose max-w-full text-4xl leading-tight text-black lg:text-5xl xl:text-7xl"
              dangerouslySetInnerHTML={{ __html: data?.name }}
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default StaticHero;
