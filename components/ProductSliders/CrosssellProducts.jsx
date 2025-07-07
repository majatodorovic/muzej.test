"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCrossSellProducts } from "@/hooks/ecommerce.hooks";
import ThumbByViewport from "@/components/Thumb/ThumbByViewport";
import Image from "next/image";

const ThumbSkeleton = () => (
  <div className="col-span-1 flex animate-pulse flex-col">
    <div className="aspect-square w-full rounded-md bg-gray-200"></div>
    <div className="mx-auto mt-4 h-[56px] w-3/4 rounded-md bg-gray-200"></div>
    <div className="mx-auto mt-2 h-5 w-1/2 rounded-md bg-gray-200"></div>
  </div>
);

const CrossSellProducts = ({ text = "Možda će Vam biti potrebno", id }) => {
  const { data: productDetails } = useCrossSellProducts({ id });
  const [showArrows, setShowArrows] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === "undefined") return;

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

  if (!productDetails?.items?.length) return null;

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
          loop={productDetails?.items?.length > 1}
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
          {productDetails?.items?.map(({ id }, index) => (
            <SwiperSlide key={index} className="hoveredColor">
              <Suspense fallback={<ThumbSkeleton />}>
                <ThumbByViewport
                  id={id}
                  apiLink={`/product-details/thumb/${id}?categoryId=*`}
                />
              </Suspense>
            </SwiperSlide>
          ))}
        </Swiper>

        {showArrows && productDetails?.items?.length > 1 && (
          <>
            <button
              className="absolute left-0 top-1/2 z-50 flex h-[40px] w-[40px] -translate-y-1/2 transform items-center justify-center p-2"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <Image
                src="/icons/chevron.svg"
                alt="Previous"
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
                alt="Next"
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

export default CrossSellProducts;
