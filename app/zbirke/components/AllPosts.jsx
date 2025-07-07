"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { list } from "@/api/api";
import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";

const POSTS_PER_PAGE = 6;

const PostThumb = ({ post }) => {
  return (
    <div className="relative flex h-[350px] flex-col justify-between rounded-lg bg-lightGreen pb-6 pt-[200px] max-md:h-[330px] max-md:pt-[180px] 3xl:h-[420px] 3xl:pt-[250px]">
      <Image
        alt={post.basic_data.title}
        src={post.gallery[0] ?? "/images/placeholder.svg"}
        width={250}
        height={250}
        className="clipPathImage absolute left-1/2 top-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-[50px] object-cover max-md:h-[180px] max-md:w-[180px] 3xl:h-[250px] 3xl:w-[250px]"
      />
      <div className="fontForum line-clamp-2 px-8 text-center text-2xl text-white 3xl:text-3xl">
        {post.basic_data.title}
      </div>
      <Link href={`/zbirke/${post.slug}`} className="relative">
        <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />
        <div className="buttonText">Saznaj više</div>
      </Link>
    </div>
  );
};

const AllPosts = ({ initialPosts, totalPages }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadMorePosts = async () => {
    if (loading || currentPage >= totalPages) return;

    setLoading(true);
    try {
      const res = await list(
        `/news/category/list/zbirke?page=${currentPage + 1}&limit=${POSTS_PER_PAGE}`,
      );
      const newPosts = res?.payload?.items || [];
      setPosts((prev) => [...prev, ...newPosts]);
      setCurrentPage((prev) => prev + 1);
    } catch (e) {
      console.error("Greška prilikom učitavanja još postova", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (inView && !loading) {
      loadMorePosts();
    }
  }, [inView]);

  // 3 kolone
  const columns3 = [[], [], []];
  posts.forEach((item, i) => {
    columns3[i % 3].push(item);
  });

  // 2 kolone
  const columns2 = [[], []];
  posts.forEach((item, i) => {
    columns2[i % 2].push(item);
  });

  return (
    <div className="mt-[100px] w-full xl:mt-[180px]">
      {/* GRID: 3 kolone */}
      <div className="hidden grid-cols-3 gap-x-4 gap-y-20 px-5 sm:px-14 2xl:grid">
        <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
          {columns3[0].map((post, index) => (
            <Suspense
              key={`col1-${post.id}-${index}`}
              fallback={
                <div className="aspect-square h-full w-full animate-pulse bg-slate-300" />
              }
            >
              <PostThumb post={post} />
            </Suspense>
          ))}
        </div>
        <div className="flex flex-col gap-x-4 gap-y-20">
          {columns3[1].map((post, index) => (
            <Suspense
              key={`col2-${post.id}-${index}`}
              fallback={
                <div className="aspect-square h-full w-full animate-pulse bg-slate-300" />
              }
            >
              <PostThumb post={post} />
            </Suspense>
          ))}
        </div>
        <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
          {columns3[2].map((post, index) => (
            <Suspense
              key={`col3-${post.id}-${index}`}
              fallback={
                <div className="aspect-square h-full w-full animate-pulse bg-slate-300" />
              }
            >
              <PostThumb post={post} />
            </Suspense>
          ))}
        </div>
      </div>

      {/* GRID: 2 kolone */}
      <div className="hidden grid-cols-2 gap-x-4 gap-y-20 max-2xl:grid max-lg:hidden">
        <div className="flex flex-col gap-x-4 gap-y-20">
          {columns2[0].map((post, index) => (
            <Suspense
              key={`col2-1-${post.id}-${index}`}
              fallback={
                <div className="aspect-square h-full w-full animate-pulse bg-slate-300" />
              }
            >
              <PostThumb post={post} />
            </Suspense>
          ))}
        </div>
        <div className="mt-[200px] flex flex-col gap-x-4 gap-y-20">
          {columns2[1].map((post, index) => (
            <Suspense
              key={`col2-2-${post.id}-${index}`}
              fallback={
                <div className="aspect-square h-full w-full animate-pulse bg-slate-300" />
              }
            >
              <PostThumb post={post} />
            </Suspense>
          ))}
        </div>
      </div>

      {/* GRID: 1 kolona (mobilni) */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-20 max-lg:grid lg:hidden">
        {posts.map((post, index) => (
          <Suspense
            key={`mobile-${post.id}-${index}`}
            fallback={
              <div className="aspect-square h-full w-full animate-pulse bg-slate-300" />
            }
          >
            <PostThumb post={post} />
          </Suspense>
        ))}
      </div>

      {/* Infinite scroll trigger */}
      {currentPage < totalPages && (
        <div ref={ref} className="mt-20 h-10 w-full text-center">
          <i className={`fas fa-spinner fa-spin text-xl text-primary`}></i>
        </div>
      )}
    </div>
  );
};

export default AllPosts;
