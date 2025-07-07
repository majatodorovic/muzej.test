"use client";

import { Modal } from "@/_components/shared/modal";
import { useState } from "react";

const HistoryList = ({ items }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <ul className="space-y-4">
        {items?.map((item) => (
          <>
            <li key={item.id}>
              <h2
                onClick={handleOpenModal}
                className="cursor-pointer font-semibold"
              >
                {item.basic_data.title}
              </h2>
            </li>
            <Modal
              show={showModal}
              handleOpen={handleCloseModal}
              title={item?.basic_data?.title}
              type="custom"
            >
              <div
                className="prose mt-10 max-w-full"
                dangerouslySetInnerHTML={{
                  __html: item?.basic_data?.description,
                }}
              />
              {item.documents?.length > 0 && (
                <div className="mt-6 flex flex-col gap-2">
                  {item.documents_data.map((document, index) => {
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
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
