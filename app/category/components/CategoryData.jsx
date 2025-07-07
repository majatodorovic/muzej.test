"use client";

import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useCategoryProducts, useProductThumb } from "@/hooks/ecommerce.hooks";
import Link from "next/link";
import Image from "next/image";
import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const ProductThumb = ({ slug }) => {
  const { data: product } = useProductThumb({
    slug: slug,
    id: slug,
    categoryId: "*",
  });

  return (
    <div className="relative flex h-[350px] flex-col justify-between rounded-lg bg-lightGreen pb-6 pt-[200px] max-md:h-[330px] max-md:pt-[180px] 3xl:h-[420px] 3xl:pt-[250px]">
      <Image
        alt={product?.basic_data?.name}
        src={product?.image[0] ?? "/images/placeholder.svg"}
        width={250}
        height={250}
        className="clipPathImage absolute left-1/2 top-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-[50px] object-cover max-md:h-[180px] max-md:w-[180px] 3xl:h-[250px] 3xl:w-[250px]"
      />
      <div className="notranslate fontForum line-clamp-2 px-8 text-center text-2xl text-white 3xl:text-3xl">
        {product?.basic_data.name}
      </div>
      {product?.slug_path && (
        <Link href={product?.slug_path} className="relative">
          <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />
          <div className="buttonText">Dodaj u korpu</div>
        </Link>
      )}
    </div>
  );
};

const CategoryData = ({ slug }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCategoryProducts({
      slug,
      limit: 3,
      sort: "_",
      filterKey: null,
      render: false,
    });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allItems = data?.pages?.flatMap((page) => page?.items) || [];

  // 3 kolone
  const columns3 = [[], [], []];
  allItems.forEach((item, i) => {
    columns3[i % 3].push(item);
  });

  // 2 kolone
  const columns2 = [[], []];
  allItems.forEach((item, i) => {
    columns2[i % 2].push(item);
  });

  return (
    <>
      <BreadcrumbsStatic breadcrumbs={[{ name: "Prodavnica" }]} />
      <div
        data-aos="fade-up"
        className="sectionPaddingB sectionPaddingX flex w-full flex-col items-center justify-center"
      >
        <h2 className="fontForum titleH2 xl:mb-20">Prodavnica</h2>
        <div className="mt-[100px] w-full px-5 sm:px-14">
          {/* GRID: 3 kolone */}
          <div className="hidden grid-cols-3 gap-x-4 gap-y-20 2xl:grid">
            <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
              {columns3[0].map((item) => (
                <ProductThumb key={item.id} slug={item.id} />
              ))}
            </div>
            <div className="flex flex-col gap-x-4 gap-y-20">
              {columns3[1].map((item) => (
                <ProductThumb key={item.id} slug={item.id} />
              ))}
            </div>
            <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
              {columns3[2].map((item) => (
                <ProductThumb key={item.id} slug={item.id} />
              ))}
            </div>
          </div>

          {/* GRID: 2 kolone */}
          <div className="hidden grid-cols-2 gap-x-4 gap-y-20 max-2xl:grid max-lg:hidden">
            <div className="flex flex-col gap-x-4 gap-y-20">
              {columns2[0].map((item) => (
                <ProductThumb key={item.id} slug={item.id} />
              ))}
            </div>
            <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
              {columns2[1].map((item) => (
                <ProductThumb key={item.id} slug={item.id} />
              ))}
            </div>
          </div>

          {/* GRID: 1 kolona (mobilni) */}
          <div className="grid grid-cols-1 gap-x-4 gap-y-20 max-lg:grid lg:hidden">
            {allItems.map((item) => (
              <div key={item.id}>
                <ProductThumb slug={item.id} />
              </div>
            ))}
          </div>
        </div>

        {/* Trigger sentinel for infinite scroll */}
        {hasNextPage && (
          <div ref={ref} className="mt-20 h-10 w-full text-center">
            <i className={`fas fa-spinner fa-spin text-xl text-primary`}></i>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryData;
