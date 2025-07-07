"use client";

import {
  useProductDescription,
  useProductSpecification,
} from "@/hooks/ecommerce.hooks";
import React, { useState } from "react";

const Specifications = ({ id }) => {
  const { data: specification } = useProductSpecification({ slug: id });
  const { data: desc } = useProductDescription({ slug: id });

  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="mt-10 flex flex-col">
      <div className="flex items-center">
        <div
          onClick={() =>
            setActiveTab(activeTab === "description" ? null : "description")
          }
          className="flex cursor-pointer items-center gap-2 py-3"
        >
          <span
            className={`text-lg font-medium ${
              activeTab === "description" ? "font-semibold" : "font-normal"
            }`}
          >
            Opis
          </span>
        </div>

        {specification?.length > 0 && (
          <>
            {specification?.map((item) => (
              <React.Fragment key={item?.set?.id}>
                <div className="px-4 text-gray-300">|</div>
                <div
                  onClick={() =>
                    setActiveTab(
                      activeTab === item?.set?.id ? null : item?.set?.id,
                    )
                  }
                  className="flex cursor-pointer items-center gap-2 py-3"
                >
                  <span
                    className={`text-lg font-medium ${activeTab === item?.set?.id ? "font-semibold" : "font-normal"}`}
                  >
                    {item?.groups[0]?.attributes[0]?.attribute.name}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </>
        )}
      </div>

      <div className="w-full">
        {activeTab === "description" && (
          <div className="customScroll w-full overflow-y-auto p-2">
            <div
              className="prose max-w-none text-sm"
              dangerouslySetInnerHTML={{ __html: desc?.description }}
            />
          </div>
        )}

        {specification?.map(
          (item) =>
            activeTab === item?.set?.id && (
              <div
                key={item?.set?.id}
                className="customScroll w-full overflow-y-auto p-2"
              >
                <div className="space-y-2">
                  {item?.groups[0]?.attributes[0]?.values?.map((val) => (
                    <p className="text-sm" key={val?.id}>
                      - {val?.name}
                    </p>
                  ))}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default Specifications;
