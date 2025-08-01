"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import SvgWithImage from "@/components/svg/Paths/SvgWithImage";

const SinglePost = ({ post }) => {
  console.log("SinglePost post prop:", post);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const blogGallery = [
    ...(post?.images?.thumb_image ? [post.images.thumb_image] : []),
    ...(Array.isArray(post?.gallery) ? post.gallery : []),
  ];

  return (
    <div className="flex items-start gap-6 max-lg:flex-col">
      <div className={`flex flex-col gap-8 text-black lg:w-1/2`}>
        {post?.basic_data?.title && (
          <h2
            className="fontSpectral titleH2 !text-left"
            dangerouslySetInnerHTML={{ __html: post?.basic_data?.title }}
          />
        )}
        {post?.basic_data?.short_description && (
          <div className="prose max-w-full !text-left leading-tight xl:text-lg">
            {post?.basic_data?.short_description}
          </div>
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
        {blogGallery.length > 0 ? (
          <>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              loop
              slidesPerView={1}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
              }}
            >
              {blogGallery.map((img, i) => (
                <SwiperSlide key={i}>
                  <SvgWithImage image={img} alt={`blog-${i}`} />
                </SwiperSlide>
              ))}
            </Swiper>

            {blogGallery.length > 1 && (
              <div
                className={`absolute bottom-0 left-1/2 z-50 flex -translate-x-1/2 justify-center gap-4 ${blogGallery.length < 1 && "!hidden"}`}
              >
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
            )}
          </>
        ) : blogGallery.length === 1 ? (
          <SvgWithImage image={blogGallery[0]} alt={post?.basic_data?.title} />
        ) : null}
      </div>
    </div>
  );
};

export default SinglePost;
