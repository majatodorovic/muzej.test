"use client";

import { useState, useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";
import { Modal } from "@/_components/shared/modal";
import SvgButtonThree from "@/components/svg/Paths/SvgButtonThree";

const SubCategoryList = ({ categories }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <>
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
            <Image src="/icons/arrow.svg" alt="arrow" width={40} height={40} />
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
          {categories?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <button
                  onClick={() => openModal(item)}
                  className="group flex w-full flex-col items-center text-center"
                >
                  <div className="relative flex h-[280px] w-[280px] items-center justify-center">
                    <Image
                      alt="document"
                      src="/icons/document.png"
                      width={90}
                      height={90}
                      className="buttonText"
                    />
                    <SvgButtonThree />
                  </div>
                  <div className="max-w-xs text-black">
                    <h2 className="fontForum text-2xl">
                      {item?.basic_data?.title}
                    </h2>
                    <h3 className="text-lg font-semibold">
                      {item?.basic_data?.short_description}
                    </h3>
                  </div>
                  <div className="relative mt-6">
                    <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />
                    <div className="buttonText">Saznaj više</div>
                  </div>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <Modal
        show={isModalOpen}
        handleOpen={closeModal}
        title={selectedItem?.basic_data?.title}
        type="custom"
      >
        <div
          className="prose mt-10 max-w-full"
          dangerouslySetInnerHTML={{
            __html: selectedItem?.basic_data?.short_description,
          }}
        />
        <div
          className="prose mt-10 max-w-full"
          dangerouslySetInnerHTML={{
            __html: selectedItem?.basic_data?.description,
          }}
        />
        {selectedItem?.documents?.length > 0 && (
          <div className="mt-6 flex flex-col gap-2">
            {selectedItem?.documents_data.map((document, index) => {
              return (
                <a
                  href={document.file.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                  key={index}
                >
                  {document.doc_info.title}
                </a>
              );
            })}
          </div>
        )}
      </Modal>
    </>
  );
};

export default SubCategoryList;
