"use client";

import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";
import Image from "next/image";

const PostThumb = ({ post }) => {
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
      {post?.documents.length > 0 && (
        <a
          href={post.documents[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="relative"
        >
          <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />
          <div className="buttonText">Saznaj više</div>
        </a>
      )}
    </div>
  );
};

const ListYearbook = ({ posts }) => {
  // 3 kolone
  const columns3 = [[], [], []];
  posts?.forEach((item, i) => {
    columns3[i % 3].push(item);
  });

  // 2 kolone
  const columns2 = [[], []];
  posts?.forEach((item, i) => {
    columns2[i % 2].push(item);
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full px-5 sm:px-14">
        {/* GRID: 3 kolone */}
        <div className="hidden grid-cols-3 gap-x-4 gap-y-20 2xl:grid">
          <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
            {columns3[0].map((item) => (
              <PostThumb key={item.id} post={item} />
            ))}
          </div>
          <div className="flex flex-col gap-x-4 gap-y-20">
            {columns3[1].map((item) => (
              <PostThumb key={item.id} post={item} />
            ))}
          </div>
          <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
            {columns3[2].map((item) => (
              <PostThumb key={item.id} post={item} />
            ))}
          </div>
        </div>

        {/* GRID: 2 kolone */}
        <div className="hidden grid-cols-2 gap-x-4 gap-y-20 max-2xl:grid max-lg:hidden">
          <div className="flex flex-col gap-x-4 gap-y-20">
            {columns2[0].map((item) => (
              <PostThumb key={item.id} post={item} />
            ))}
          </div>
          <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
            {columns2[1].map((item) => (
              <PostThumb key={item.id} post={item} />
            ))}
          </div>
        </div>

        {/* GRID: 1 kolona (mobilni) */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-20 max-lg:grid lg:hidden">
          {posts?.map((item) => (
            <PostThumb key={item.id} post={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListYearbook;
