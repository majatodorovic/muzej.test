"use client";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { get as GET } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const LoadingSkeleton = () => (
  <div className="group relative col-span-1 flex !h-full animate-pulse flex-col">
    <div className="!relative !overflow-hidden">
      <div className="clipPathImage aspect-square !h-auto !w-full bg-gray-200" />
    </div>
    <div className="fontForum mt-4 h-[56px] w-full bg-gray-200"></div>
    <div className="mx-auto mt-2 h-6 w-1/2 bg-gray-200"></div>
  </div>
);

const ThumbByViewport = ({ id, apiLink }) => {
  const [isInView, setIsInView] = useState(false);
  const thumbRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 },
      );

      if (thumbRef.current) {
        observer.observe(thumbRef.current);
      }

      return () => {
        if (thumbRef.current) {
          observer.unobserve(thumbRef.current);
        }
      };
    }
  }, []);

  const { data: product, isLoading } = useQuery({
    queryKey: ["productThumbByViewport", id],
    queryFn: async () => {
      return await GET(apiLink).then((res) => {
        return res?.payload;
      });
    },
    enabled: isInView,
    refetchOnWindowFocus: false,
  });

  const renderDiscountPercentage = ({
    price: {
      discount: { campaigns },
    },
  }) => (
    <div className="absolute right-2 top-2 z-[5] flex flex-col gap-2 text-sm text-white">
      {campaigns?.map(({ calc: { original, price } }, index) => {
        const discount = Math.round(
          ((Number(original) - Number(price)) / Number(original)) * 100,
        );
        return (
          <p key={index} className="w-fit rounded-lg bg-green px-5 py-2">
            - {discount}%
          </p>
        );
      })}
    </div>
  );

  const renderStickers = ({ stickers }) => (
    <div className="absolute left-2 top-2 z-[5] flex flex-col gap-2 text-sm text-white">
      {stickers?.map(({ name }, i) => (
        <p key={`sticker-${i}`} className="w-fit rounded-lg bg-green px-5 py-2">
          {name}
        </p>
      ))}
    </div>
  );

  if (!isInView) {
    return <div ref={thumbRef} className="h-full" />;
  }

  if (isLoading || !product) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="group relative col-span-1 flex !h-full flex-col">
      {product?.price?.discount?.active &&
        renderDiscountPercentage({ price: product?.price })}
      {product?.stickers?.length > 0 &&
        renderStickers({ stickers: product?.stickers })}

      <div className="!relative !overflow-hidden">
        <Swiper
          rewind={product?.image?.length > 1}
          className="categoryImageSwiper !relative !overflow-hidden"
        >
          {product?.image_data?.length > 0 ? (
            product.image_data.map(
              (
                { url, descriptions: { alt }, file_data: { height, width } },
                index,
              ) => (
                <SwiperSlide key={index} className="!relative !overflow-hidden">
                  <Link
                    href={`/${product?.link?.link_path}`}
                    className="flex-1"
                  >
                    <Image
                      loading="lazy"
                      src={convertHttpToHttps(url ?? "")}
                      alt={alt ?? product?.basic_data?.name}
                      sizes="100vw"
                      width={width ?? 0}
                      height={height ?? 0}
                      className="clipPathImage aspect-square !h-auto !w-full transition-all duration-500"
                    />
                  </Link>
                </SwiperSlide>
              ),
            )
          ) : (
            <SwiperSlide className="!relative !overflow-hidden">
              <Link href={`/${product?.link?.link_path}`} className="flex-1">
                <Image
                  loading="lazy"
                  src="/images/placeholder.svg"
                  alt={product?.basic_data?.name ?? "Placeholder image"}
                  sizes="100vw"
                  width={500}
                  height={500}
                  className="clipPathImage aspect-square !h-auto !w-full transition-all duration-500"
                />
              </Link>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      <Link
        href={`/${product?.link?.link_path}`}
        className="fontForum notranslate mt-4 line-clamp-2 h-[56px] text-center text-xl"
      >
        {product?.basic_data?.name}
      </Link>
      <div className="mx-auto -mt-2.5">
        <ProductPrice
          price={product?.price}
          inventory={product?.inventory}
          is_details={false}
        />
      </div>
    </div>
  );
};

export default ThumbByViewport;
