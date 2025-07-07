"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumb } from "@/components/Thumb/Thumb";
import Image from "next/image";

const ThumbSkeleton = () => (
  <div className="col-span-1 flex animate-pulse flex-col">
    <div className="aspect-square w-full rounded-md bg-gray-200"></div>
    <div className="mx-auto mt-4 h-[56px] w-3/4 rounded-md bg-gray-200"></div>
    <div className="mx-auto mt-2 h-5 w-1/2 rounded-md bg-gray-200"></div>
  </div>
);

const RecommendedProducts = ({ recommendedProducts, action4 }) => {
  const [products, setProducts] = useState(recommendedProducts);
  const [showArrows, setShowArrows] = useState(false);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (recommendedProducts) {
      setLoading(false);
      setProducts(recommendedProducts);
    }
  }, [recommendedProducts]);

  useEffect(() => {
    const updateShowArrows = () => {
      const screenWidth = window.innerWidth;
      let slidesPerView = 1;

      if (screenWidth >= 1680) slidesPerView = 4;
      else if (screenWidth >= 1024) slidesPerView = 3;
      else if (screenWidth >= 640) slidesPerView = 2;

      setShowArrows(products?.length > slidesPerView);
    };

    if (products) {
      updateShowArrows();
      window.addEventListener("resize", updateShowArrows);
    }

    return () => window.removeEventListener("resize", updateShowArrows);
  }, [products]);

  if (loading) return null;

  return (
    <div className="sectionPaddingX mb-20">
      <h2 className="fontForum text-4xl">{action4}</h2>
      <div className="relative mt-5 md:mt-12">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          modules={[Navigation]}
          loop={products?.length < 4 ? false : true}
          className="mySwiper3 w-full select-none"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
              loop: products?.length < 4 ? false : true,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
              loop: products?.length < 5 ? false : true,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
              loop: products?.length < 8 ? false : true,
            },
            1680: {
              slidesPerView: 4,
              spaceBetween: 10,
              loop: products?.length < 10 ? false : true,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {products?.map(({ id }) => (
            <SwiperSlide key={id} className="hoveredColor">
              <Suspense fallback={<ThumbSkeleton />}>
                <Thumb id={id} slug={id} />
              </Suspense>
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

export default RecommendedProducts;
