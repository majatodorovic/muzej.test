"use client";

import { useState } from "react";
import Exhibitions from "./Exibitions";
import { list } from "@/api/api";
import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";

const POSTS_PER_PAGE = 3;

const ExibitionsPaginations = ({ initialPosts, totalPages }) => {
  const [allPosts, setAllPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    if (currentPage >= totalPages) return;

    setLoading(true);
    try {
      const res = await list(
        `/news/category/list/izlozbe?page=${currentPage + 1}&limit=${POSTS_PER_PAGE}`,
      );
      const newPosts = res?.payload?.items || [];
      setAllPosts((prev) => [...prev, ...newPosts]);
      setCurrentPage((prev) => prev + 1);
    } catch (e) {
      console.error("Greška prilikom učitavanja još izložbi", e);
    }
    setLoading(false);
  };

  return (
    <>
      <Exhibitions posts={allPosts} />
      {currentPage < totalPages && (
        <div className="mt-16 flex justify-center">
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="relative"
            >
              <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />
              <div className="buttonText">
                {loading ? (
                  <i
                    className={`fas fa-spinner fa-spin text-xl text-white`}
                  ></i>
                ) : (
                  "Učitaj još"
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExibitionsPaginations;
