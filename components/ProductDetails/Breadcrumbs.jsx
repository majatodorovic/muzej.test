"use client";
import Link from "next/link";
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/api/api";
import { Suspense } from "react";

const Breadcrumbs = ({ id, categoryId }) => {
  const { data: breadcrumbs } = useSuspenseQuery({
    queryKey: ["breadcrumbs", id],
    queryFn: async () => {
      return await get(
        `/product-details/breadcrumbs/${id}?categoryId=${categoryId ?? "*"}`,
      ).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Suspense
      fallback={<div className={`h-2 w-full animate-pulse bg-slate-300`} />}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/`}
          className={`text-[0.95rem] font-normal text-[#191919]`}
        >
          Početna
        </Link>{" "}
        {(breadcrumbs?.steps ?? [])?.map((breadcrumb, index, arr) => {
          return (
            <div className="flex items-center gap-2" key={breadcrumb?.id}>
              <Link
                href={`/${breadcrumb?.link?.link_path}`}
                className="text-[0.95rem] font-normal text-[#000]"
              >
                {breadcrumb?.name}
              </Link>
              {index !== arr.length - 1 && <>/</>}
            </div>
          );
        })}
        <>/</>
        <h1 className="text-[0.95rem] font-normal text-[#000]">
          {breadcrumbs?.end?.name}
        </h1>
      </div>
    </Suspense>
  );
};

export default Breadcrumbs;
