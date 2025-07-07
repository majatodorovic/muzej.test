"use client";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRelatedProducts } from "@/hooks/ecommerce.hooks";
import ThumbByViewport from "@/components/Thumb/ThumbByViewport";
import Image from "next/image";

const RelatedProducts = ({ text = "Pogledaj slične proizvode", id }) => {
  const { data: productDetails } = useRelatedProducts({ id });
  const [showArrows, setShowArrows] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const updateShowArrows = () => {
      const screenWidth = window.innerWidth;
      let slidesPerView = 1;

      if (screenWidth >= 1440) slidesPerView = 4;
      else if (screenWidth >= 1024) slidesPerView = 3;
      else if (screenWidth >= 640) slidesPerView = 2;

      setShowArrows(productDetails?.items?.length > slidesPerView);
    };

    if (productDetails?.items) {
      updateShowArrows();
      window.addEventListener("resize", updateShowArrows);
    }

    return () => window.removeEventListener("resize", updateShowArrows);
  }, [productDetails?.items]);

  if (productDetails?.items?.length === 0) {
    return null;
  }

  return (
    <div className="sectionPaddingX mb-20">
      <div className="flex w-full items-center justify-between">
        <h5 className="fontForum text-4xl">{text}</h5>
      </div>
      <div className="relative mt-5 md:mt-8">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          modules={[Navigation]}
          loop={true}
          className="mySwiper3 w-full select-none"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1680: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {productDetails.items.map(({ id }, index) => (
            <SwiperSlide key={index} className="hoveredColor">
              <ThumbByViewport
                id={id}
                apiLink={`/product-details/thumb/${id}?categoryId=*`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {showArrows && (
          <>
            <button
              className="absolute left-0 top-1/2 z-50 flex h-[40px] w-[40px] -translate-y-1/2 transform items-center justify-center p-2"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <Image
                src="/icons/chevron.svg"
                alt="Arrow"
                width={24}
                height={24}
                className="rotate-180"
              />
            </button>
            <button
              className="absolute right-0 top-1/2 z-10 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center p-2"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <Image
                src="/icons/chevron.svg"
                alt="Arrow"
                width={24}
                height={24}
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
