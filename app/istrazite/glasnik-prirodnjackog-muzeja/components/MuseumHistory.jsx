"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";
import SvgButtonThree from "@/components/svg/Paths/SvgButtonThree";

const MuseumHistory = ({ categoryData, categories }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div data-aos="fade-up" className="sectionPaddingB">
      <div className="sectionPaddingX">
        <div
          dangerouslySetInnerHTML={{ __html: categoryData?.description }}
          className="prose mb-[100px] max-w-full 2xl:w-2/3"
        />
        <div className="relative">
          <div className="absolute -top-[86px] right-0 z-50 flex gap-4">
            <button
              ref={prevRef}
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
              ref={nextRef}
              className="clipPathRightArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white"
            >
              <Image
                src="/icons/arrow.svg"
                alt="arrow"
                width={40}
                height={40}
              />
            </button>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            loop
            slidesPerView={3}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1360: { slidesPerView: 4 },
              1620: { slidesPerView: 5 },
            }}
            className="mx-auto [&>div]:flex [&>div]:justify-between"
          >
            {categories.map((item) => (
              <SwiperSlide key={item.id}>
                <a
                  href={`/istrazite/glasnik-prirodnjackog-muzeja/${item.slug}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative h-[280px] w-[280px]">
                    <Image
                      alt="document"
                      src="/icons/document.png"
                      width={90}
                      height={90}
                      className="buttonText"
                    />
                    <SvgButtonThree />
                  </div>
                  <div className="mt-4 max-w-xs text-black">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                  </div>
                  <div className="relative mt-10 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                    <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />{" "}
                    <div className="buttonText">Saznaj više</div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MuseumHistory;
