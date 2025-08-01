"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import SvgWithImage from "@/components/svg/Paths/SvgWithImage";

const PublicAd = ({ posts }) => {
  return (
    <div
      data-aos="fade-up"
      className="sectionPaddingB sectionPaddingX flex flex-col gap-20"
    >
      {posts?.map((post, index) => {
        const gallery = post?.gallery || [];
        const prevRef = useRef(null);
        const nextRef = useRef(null);

        return (
          <div key={index} className="flex items-start gap-6 max-lg:flex-col">
            <div className={`flex flex-col gap-8 text-black lg:w-1/2`}>
              {post?.basic_data?.title && (
                <h2
                  className="fontSpectral titleH2 !text-left"
                  dangerouslySetInnerHTML={{ __html: post?.basic_data?.title }}
                />
              )}
              {post?.basic_data?.description && (
                <div
                  className="prose max-w-full !text-left leading-tight xl:text-lg"
                  dangerouslySetInnerHTML={{
                    __html: post?.basic_data?.description,
                  }}
                />
              )}
              {post.documents?.length > 0 && (
                <div className="flex flex-col gap-2">
                  {post.documents.map((document, index) => {
                    return (
                      <a
                        href={document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                        key={index}
                      >
                        Dokument {index + 1}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="relative mx-auto w-full md:w-1/2">
              {gallery.length > 0 ? (
                <>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    loop
                    slidesPerView={1}
                    navigation={{
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    breakpoints={{
                      0: { slidesPerView: 1 },
                    }}
                  >
                    {gallery.map((img, i) => (
                      <SwiperSlide key={i}>
                        <SvgWithImage image={img} alt={`banner-${i}`} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {gallery.length > 1 && (
                    <div
                      className={`absolute -bottom-3 left-1/2 z-50 flex -translate-x-1/2 justify-center gap-4 ${gallery.length < 1 && "!hidden"}`}
                    >
                      <button
                        ref={prevRef}
                        className="clipPathLeftArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white 3xl:h-[120px] 3xl:w-[120px]"
                      >
                        <Image
                          src="/icons/arrow.svg"
                          alt="arrow"
                          width={40}
                          height={40}
                          className="h-[40px] w-[40px] rotate-180 3xl:h-[60px] 3xl:w-[60px]"
                        />
                      </button>
                      <button
                        ref={nextRef}
                        className="clipPathRightArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white 3xl:h-[120px] 3xl:w-[120px]"
                      >
                        <Image
                          src="/icons/arrow.svg"
                          alt="arrow"
                          width={40}
                          height={40}
                          className="h-[40px] w-[40px] 3xl:h-[60px] 3xl:w-[60px]"
                        />
                      </button>
                    </div>
                  )}
                </>
              ) : gallery.length === 1 ? (
                <Image
                  src={gallery[0].url}
                  alt={`banner-${index}`}
                  width={840}
                  height={740}
                  className="clipPathImage aspect-square w-full object-cover"
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PublicAd;
