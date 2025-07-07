"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { useProductThumb } from "@/hooks/ecommerce.hooks";

export const Thumb = ({ slug, categoryId = () => {} }) => {
  const { data: product } = useProductThumb({
    slug: slug,
    id: slug,
    categoryId: categoryId ?? "*",
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

  if (!product) return null;

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
