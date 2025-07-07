"use client";

import { useState } from "react";
import { list } from "@/api/api";
import SpecialEditions from "./SpecialEditions";
import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";

const POSTS_PER_PAGE = 5;

const SpecialEditionsPagination = ({ initialPosts, totalPages, category }) => {
  const [allPosts, setAllPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    if (currentPage >= totalPages) return;

    setLoading(true);
    try {
      const res = await list(
        `/news/category/list/${category}?page=${currentPage + 1}&limit=${POSTS_PER_PAGE}`,
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
    <section
      data-aos="fade-up"
      className="sectionPaddingY sectionPaddingX bg-secondary"
    >
      <h2 className="fontForum titleH2 mx-auto mb-[100px] max-w-[1200px] !leading-tight xl:mb-[160px]">
        Najstarije sveske Posebnih izdanja objavljene do početka{" "}
        <span className="notranslate">II</span> Svetskog rata moguće je
        pogledati na sledećim linkovima
      </h2>
      <SpecialEditions posts={allPosts} />
      {currentPage < totalPages && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="relative"
          >
            <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />

            <div className="buttonText">
              {loading ? (
                <i className={`fas fa-spinner fa-spin text-xl text-white`}></i>
              ) : (
                "Učitaj još"
              )}
            </div>
          </button>
        </div>
      )}
    </section>
  );
};

export default SpecialEditionsPagination;
