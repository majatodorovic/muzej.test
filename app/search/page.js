import SearchPage from "@/app/search/components/SearchPage";
import { Suspense } from "react";
import { headers } from "next/headers";

const Search = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default Search;

export const generateMetadata = async ({ searchParams: { search } }) => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: `Pretraga: ${search} | Prirodnjački muzej`,
    description: "Dobrodošli na Prirodnjački muzej",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `Pretraga: ${search} | Prirodnjački muzej`,
      description: "Dobrodošli na Prirodnjački muzej",
      type: "website",
      locale: "sr_RS",
    },
  };
};
