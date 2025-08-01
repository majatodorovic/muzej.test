"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/_components/shared/modal";
import SvgButtonThree from "@/components/svg/Paths/SvgButtonThree";

const ListItems = ({ posts }) => {
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

  return (
    <div data-aos="fade-up">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex cursor-pointer flex-col items-center text-center"
            onClick={() => handleOpenModal(post)}
          >
            <div className="relative flex h-[280px] w-full max-w-[280px] items-end justify-center">
              {post.documents?.[0] && (
                <Image
                  alt="download"
                  src={"/icons/download.png"}
                  width={32}
                  height={32}
                  className="buttonText !bottom-6 !top-auto"
                />
              )}
              <SvgButtonThree />
            </div>
            <div className="mt-4 max-w-xs text-black">
              <h3 className="line-clamp-2 text-lg font-semibold">
                {post.basic_data.title}
              </h3>
            </div>
          </div>
        ))}
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
            __html: selectedPost?.basic_data?.description,
          }}
        />
        <div className="mt-10 flex flex-col gap-6">
          {selectedPost?.documents_data?.map((document, index) => (
            <a
              key={index}
              href={document.file.path}
              className="notranslate text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {document?.doc_info?.title ?? document.file.path}
            </a>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ListItems;
