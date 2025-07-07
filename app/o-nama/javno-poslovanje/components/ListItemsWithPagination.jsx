"use client";

import { useState } from "react";
import ListItems from "./ListItems"; // tvoj postojeći ListItems client komponent
import Pagination from "@/components/Pagination/Pagination";
import { list } from "@/api/api";

const ListItemsWithPagination = ({
  initialPosts,
  initialTotalPages,
  postsPerPage,
  category,
}) => {
  const [posts, setPosts] = useState(initialPosts);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const res = await list(
        `/news/category/list/${category}?page=${page}&limit=${postsPerPage}`,
      );
      setPosts(res.payload.items || []);
      setTotalPages(res.payload.pagination?.total_pages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error("Greška prilikom dohvatanja postova", err);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchPosts(page);
    }
  };

  return (
    <div className="sectionPaddingX sectionPaddingB">
      {loading && <p>Učitavanje...</p>}
      <ListItems
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ListItemsWithPagination;
