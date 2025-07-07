"use client";

import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";
import Image from "next/image";
import Link from "next/link";

const ProductThumb = ({ item }) => {
  return (
    <div className="relative h-[350px] rounded-lg bg-lightGreen pt-[200px] max-md:h-[330px] max-md:pt-[180px] 3xl:h-[400px] 3xl:pt-[250px]">
      <Image
        alt={item.name}
        src={item.image}
        width={250}
        height={250}
        className="clipPathImage absolute left-1/2 top-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-[50px] object-cover max-md:h-[180px] max-md:w-[180px] 3xl:h-[250px] 3xl:w-[250px]"
      />
      <div className="notranslate fontForum line-clamp-2 h-[64px] px-8 text-center text-2xl text-white 3xl:h-[72px] 3xl:text-3xl">
        {item.name}
      </div>
      <Link
        href={`/istrazite/bulletin-of-the-natural-history-museum-in-belgrade/${item.slug}`}
        className="relative"
      >
        <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />
        <div className="buttonText">Saznaj više</div>
      </Link>
    </div>
  );
};

const BulletinList = ({ dataWithParent }) => {
  const columns3 = [[], [], []];
  dataWithParent.forEach((item, i) => {
    columns3[i % 3].push(item);
  });

  const columns2 = [[], []];
  dataWithParent.forEach((item, i) => {
    columns2[i % 2].push(item);
  });

  return (
    <div
      data-aos="fade-up"
      className="sectionPaddingX sectionPaddingY flex w-full flex-col items-center justify-center bg-secondary"
    >
      <div className="w-full px-5 sm:px-14">
        {/* GRID: 3 kolone */}
        <div className="hidden grid-cols-3 gap-x-4 gap-y-20 2xl:grid">
          <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
            {columns3[0].map((item) => (
              <ProductThumb key={item.id} item={item} />
            ))}
          </div>
          <div className="flex flex-col gap-x-4 gap-y-20">
            {columns3[1].map((item) => (
              <ProductThumb key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
            {columns3[2].map((item) => (
              <ProductThumb key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* GRID: 2 kolone */}
        <div className="hidden grid-cols-2 gap-x-4 gap-y-20 max-2xl:grid max-lg:hidden">
          <div className="flex flex-col gap-x-4 gap-y-20">
            {columns2[0].map((item) => (
              <ProductThumb key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
            {columns2[1].map((item) => (
              <ProductThumb key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* GRID: 1 kolona (mobilni) */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-20 max-lg:grid lg:hidden">
          {dataWithParent.map((item) => (
            <div key={item.id}>
              <ProductThumb item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BulletinList;
