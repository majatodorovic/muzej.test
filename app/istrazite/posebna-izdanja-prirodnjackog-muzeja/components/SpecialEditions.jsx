"use client";

import SvgButtonThree from "@/components/svg/Paths/SvgButtonThree";
import Image from "next/image";

const SpecialEditions = ({ posts }) => {
  return (
    <div className="flex flex-col items-start justify-start gap-10 max-md:justify-center">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex w-full items-center gap-4 max-md:flex-col max-md:text-center"
        >
          <div className="relative h-[160px] w-[160px] min-w-[160px]">
            {post.documents?.[0] && (
              <a
                href={post.documents[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt="download"
                  src={"/icons/document.png"}
                  width={40}
                  height={40}
                  className="buttonText"
                />
              </a>
            )}
            <SvgButtonThree />
          </div>
          <div className="flex w-full flex-col gap-2 text-black">
            <h3 className="w-full text-lg font-semibold">
              {post.basic_data.title}
            </h3>
            {post.basic_data.short_description && (
              <p className="text-sm font-light">
                {post.basic_data.short_description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecialEditions;
