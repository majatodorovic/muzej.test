"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SvgWithSmallImage from "@/components/svg/Paths/SvgWithSmallImage";

const items = [
  {
    name: "Dinosaurusi",
    image: "/images/research-fields/dinosaurusi.png",
  },
  {
    name: "Bube",
    image: "/images/research-fields/bube.png",
  },
  {
    name: "Lekovite biljke",
    image: "/images/research-fields/lekovite-biljke.png",
  },
  {
    name: "Evolucija čoveka",
    image: "/images/research-fields/evolucija-coveka.png",
  },
  {
    name: "Fosili",
    image: "/images/research-fields/fosili.png",
  },
  {
    name: "Fosili2",
    image: "/images/research-fields/fosili.png",
  },
];

const ResearchFields = () => {
  const prevRefDesktop = useRef(null);
  const nextRefDesktop = useRef(null);
  const prevRefMobile = useRef(null);
  const nextRefMobile = useRef(null);

  return (
    <div data-aos="fade-up" className="sectionPaddingX sectionPaddingY">
      <div className="flex w-full items-center justify-center sm:justify-between">
        <h2 className="fontForum titleH2 sm:!text-left">Polja istraživanja</h2>
        <div className="flex gap-4 max-sm:hidden">
          <button
            ref={prevRefDesktop}
            className="clipPathLeftArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white 3xl:h-[120px] 3xl:w-[120px]"
          >
            <Image
              src="/icons/arrow.svg"
              alt="arrow"
              width={60}
              height={60}
              className="h-[40px] w-[40px] rotate-180 3xl:h-[60px] 3xl:w-[60px]"
            />
          </button>
          <button
            ref={nextRefDesktop}
            className="clipPathRightArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white 3xl:h-[120px] 3xl:w-[120px]"
          >
            <Image
              src="/icons/arrow.svg"
              alt="arrow"
              width={60}
              height={60}
              className="h-[40px] w-[40px] 3xl:h-[60px] 3xl:w-[60px]"
            />
          </button>
        </div>
      </div>

      <div className="mt-14 sm:mt-20">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          loop
          slidesPerView={3}
          onInit={(swiper) => {
            // Odredi koje strelice su trenutno vidljive
            const isDesktop = window.innerWidth >= 640;

            swiper.params.navigation.prevEl = isDesktop
              ? prevRefDesktop.current
              : prevRefMobile.current;
            swiper.params.navigation.nextEl = isDesktop
              ? nextRefDesktop.current
              : nextRefMobile.current;

            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1360: {
              slidesPerView: 4,
            },
            1620: {
              slidesPerView: 5,
            },
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <SvgWithSmallImage image={item.image} />
              <div className="text-center text-xl font-semibold">
                {item.name}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mx-auto mt-8 flex w-full justify-center gap-4 sm:hidden">
        <button
          ref={prevRefMobile}
          className="clipPathLeftArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white"
        >
          <Image
            src="/icons/arrow.svg"
            alt="arrow"
            width={40}
            height={40}
            className="rotate-180"
          />
        </button>
        <button
          ref={nextRefMobile}
          className="clipPathRightArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white"
        >
          <Image src="/icons/arrow.svg" alt="arrow" width={40} height={40} />
        </button>
      </div>
    </div>
  );
};

export default ResearchFields;
