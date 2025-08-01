"use client";

import { useState, useRef } from "react";
import { Modal } from "@/_components/shared/modal";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";
import SvgWithImage from "@/components/svg/Paths/SvgWithImage";

const SinglesExhibitions = ({ post }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-1 flex-col gap-10">
          <h1 className="fontForum titleH2 mb-10 !text-left">
            Trenutna izložba:
          </h1>
          <h2 className="fontForum text-3xl xl:text-5xl">
            {post?.basic_data?.title}
          </h2>
          <div
            className="prose w-full max-w-full 2xl:w-2/3"
            dangerouslySetInnerHTML={{
              __html: post?.basic_data?.short_description,
            }}
          />
          <button onClick={handleOpenModal} className="relative w-[250px]">
            <SvgButtonOne className="h-[52px] w-[250px]" />
            <div className="buttonText">Saznaj više</div>
          </button>
        </div>
        <div className="flex-1">
          <div className="mx-auto w-full">
            <SvgWithImage
              image={post?.images?.thumb_image}
              alt={post?.basic_data?.title}
            />
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        handleOpen={handleCloseModal}
        title={post?.basic_data?.title}
        type="custom"
      >
        <div
          className="prose mt-10 max-w-full"
          dangerouslySetInnerHTML={{
            __html: post?.basic_data?.short_description,
          }}
        />

        <div className="relative mx-auto my-10 w-full max-w-4xl">
          {post?.gallery?.length > 0 ? (
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
              >
                {post.gallery.map((img, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={img}
                      alt={`slide-${i}`}
                      className="clipPathImage aspect-square w-full object-cover"
                      width={850}
                      height={750}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {post?.gallery?.length > 1 && (
                <div className="absolute -bottom-6 left-1/2 z-50 flex -translate-x-1/2 justify-center gap-4">
                  <button
                    ref={prevRef}
                    className="clipPathLeftArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white"
                  >
                    <Image
                      src="/icons/arrow.svg"
                      alt="Previous"
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
                      alt="Next"
                      width={40}
                      height={40}
                    />
                  </button>
                </div>
              )}
            </>
          ) : null}
        </div>

        <div
          className="prose mt-14 max-w-full"
          dangerouslySetInnerHTML={{
            __html: post?.basic_data?.description,
          }}
        />
      </Modal>
    </div>
  );
};

export default SinglesExhibitions;
