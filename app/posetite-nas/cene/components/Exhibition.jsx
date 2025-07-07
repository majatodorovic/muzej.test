"use client";

import { useState } from "react";
import { Modal } from "@/_components/shared/modal";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";

const PostThumb = ({ post, onClick }) => {
  return (
    <div className="relative flex h-[350px] flex-col justify-between rounded-lg bg-lightGreen pb-6 pt-[200px] max-md:h-[330px] max-md:pt-[180px] 3xl:h-[420px] 3xl:pt-[250px]">
      <Image
        alt={post?.basic_data?.title}
        src={post?.images?.thumb_image ?? "/images/placeholder.svg"}
        width={250}
        height={250}
        className="clipPathImage absolute left-1/2 top-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-[50px] object-cover max-md:h-[180px] max-md:w-[180px] 3xl:h-[250px] 3xl:w-[250px]"
      />
      <div className="notranslate fontForum line-clamp-2 px-8 text-center text-2xl text-white 3xl:text-3xl">
        {post?.basic_data?.title}
      </div>
      <button className="relative" onClick={() => onClick(post)}>
        <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />
        <div className="buttonText">Saznaj više</div>
      </button>
    </div>
  );
};

const Exhibition = ({ posts }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const columns3 = [[], [], []];
  posts?.forEach((item, i) => {
    columns3[i % 3].push(item);
  });

  const columns2 = [[], []];
  posts?.forEach((item, i) => {
    columns2[i % 2].push(item);
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full">
        {/* GRID: 3 kolone */}
        <div className="hidden grid-cols-3 gap-x-4 gap-y-20 px-5 sm:px-14 2xl:grid">
          {columns3.map((column, idx) => (
            <div
              key={idx}
              className={`${idx === 0 || idx === 2 ? "mt-[200px]" : ""} flex flex-col gap-x-4 gap-y-20`}
            >
              {column.map((item) => (
                <PostThumb
                  key={item.id}
                  post={item}
                  onClick={handleOpenModal}
                />
              ))}
            </div>
          ))}
        </div>

        {/* GRID: 2 kolone */}
        <div className="hidden grid-cols-2 gap-x-4 gap-y-20 max-2xl:grid max-lg:hidden">
          {columns2.map((column, idx) => (
            <div
              key={idx}
              className={`${idx === 1 ? "mt-[200px]" : ""} flex flex-col gap-x-4 gap-y-20`}
            >
              {column.map((item) => (
                <PostThumb
                  key={item.id}
                  post={item}
                  onClick={handleOpenModal}
                />
              ))}
            </div>
          ))}
        </div>

        {/* GRID: 1 kolona */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-20 max-lg:grid lg:hidden">
          {posts?.map((item) => (
            <PostThumb key={item.id} post={item} onClick={handleOpenModal} />
          ))}
        </div>
      </div>

      <Modal
        show={showModal}
        handleOpen={handleCloseModal}
        title={selectedPost?.basic_data?.title}
        type="custom"
      >
        <div
          className="prose mt-10 max-w-full"
          dangerouslySetInnerHTML={{
            __html: selectedPost?.basic_data?.short_description,
          }}
        />
        <div className="relative mx-auto">
          {selectedPost?.gallery?.length > 0 ? (
            <>
              {selectedPost?.gallery?.length > 1 && (
                <div className="absolute -bottom-6 left-1/2 z-50 flex -translate-x-1/2 justify-center gap-4">
                  <button
                    id="prevButton"
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
                    id="nextButton"
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
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                loop
                slidesPerView={1}
                navigation={{
                  prevEl: "#prevButton",
                  nextEl: "#nextButton",
                }}
              >
                {selectedPost?.gallery.map((img, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={img}
                      alt={`slide-${i}`}
                      width={850}
                      height={750}
                      className="clipPathImage aspect-square w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : selectedPost?.gallery?.length === 1 ? (
            <Image
              src={selectedPost.gallery[0]}
              alt="gallery image"
              width={850}
              height={750}
              className="clipPathImage aspect-square w-full object-cover"
            />
          ) : null}
        </div>
        <div
          className="prose mt-14 max-w-full"
          dangerouslySetInnerHTML={{
            __html: selectedPost?.basic_data?.description,
          }}
        />
      </Modal>
    </div>
  );
};

export default Exhibition;
