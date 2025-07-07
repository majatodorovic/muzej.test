"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { list } from "@/api/api";
import Link from "next/link";
import { currencyFormat } from "@/helpers/functions";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";

const SearchProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const [searchTermFocused, setSearchTermFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data: searchData, isFetching } = useQuery({
    queryKey: ["searchData", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch?.length >= 3) {
        return await list(`/products/search/list`, {
          search: debouncedSearch,
        }).then((res) => {
          setLoading(false);
          return res?.payload;
        });
      }
      return [];
    },
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm?.length >= 3) {
      router.push(`/search?search=${searchTerm}`);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm("");
        setSearchTermFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchRef}
      className={`relative py-4 transition-all duration-300 ${
        searchTermFocused ? "w-[300px]" : "w-[150px]"
      }`}
      onFocus={() => setSearchTermFocused(true)}
    >
      <form onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          placeholder="Pretraži"
          className="absolute left-0 top-0 h-full w-full border-0 bg-transparent pl-10 pr-1 text-lg font-normal text-white placeholder:text-white focus:outline-none focus:ring-0 3xl:text-xl"
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setLoading(true);
          }}
          onFocus={() => setSearchTermFocused(true)}
          value={searchTerm}
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 py-2">
          <Image
            src={"/icons/search.png"}
            width={26}
            height={26}
            className="whiteFilter object-cover"
            alt="search"
          />
        </div>
        {searchTerm?.length >= 1 && searchTerm?.length < 3 && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 py-2">
            <span className={`text-sm text-red-500`}>
              Unesite najmanje 3 karaktera.
            </span>
          </div>
        )}
        <div
          ref={dropdownRef}
          className={`${
            debouncedSearch?.length >= 3 && searchTermFocused
              ? `hidescrollbar absolute right-0 top-[32px] z-50 flex h-[420px] w-full flex-col overflow-y-auto rounded-b-lg border bg-white`
              : `hidden`
          } `}
        >
          {searchData?.items?.length > 0 && debouncedSearch?.length >= 3 ? (
            <div className="mx-auto mt-5 w-[95%]">
              <p>Rezultati pretrage</p>
              <div className="mt-3 flex flex-col gap-5 pb-5">
                {searchData?.items?.slice(0, 6)?.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={`/${item?.link?.link_path}`}
                      onClick={() => {
                        setSearchTerm("");
                      }}
                    >
                      <div className="flex flex-row items-center gap-5">
                        <div className="relative h-[60px] w-[60px] min-w-[60px]">
                          <Image
                            src={item?.image[0] ?? "/"}
                            alt={``}
                            fill
                            sizes="100vw"
                            className={`rounded-full object-cover`}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="notranslate line-clamp-2 text-[0.9rem] font-normal">
                            {item?.basic_data?.name}
                          </p>
                          <div className="flex w-fit gap-3 text-left text-[0.9rem] font-semibold">
                            {item?.price?.min?.price_defined &&
                            item?.price?.max?.price_defined ? (
                              item.price.min.price.discount ===
                                item.price.max.price.discount &&
                              item.price.min.price.original ===
                                item.price.max.price.original ? (
                                // Ako su min i max potpuno isti (bilo da su discount ili original), prikazi samo jednu cenu
                                item.price.min.price.discount ? (
                                  <>
                                    {currencyFormat(
                                      item.price.min.price.discount,
                                    )}
                                    <del>
                                      {currencyFormat(
                                        item.price.min.price.original,
                                      )}
                                    </del>
                                  </>
                                ) : (
                                  currencyFormat(item.price.min.price.original)
                                )
                              ) : item.price.max.price.discount ? (
                                // Ako postoji discount, prikazi opseg za discount i original
                                <div className="flex flex-col gap-1">
                                  {currencyFormat(
                                    item.price.min.price.discount,
                                  )}{" "}
                                  -{" "}
                                  {currencyFormat(
                                    item.price.max.price.discount,
                                  )}
                                  <del>
                                    {currencyFormat(
                                      item.price.min.price.original,
                                    )}{" "}
                                    -{" "}
                                    {currencyFormat(
                                      item.price.max.price.original,
                                    )}
                                  </del>
                                </div>
                              ) : item.price.min.price.original ===
                                item.price.max.price.original ? (
                                // Ako su originalne cene iste, prikazi samo jednu cenu
                                currencyFormat(item.price.min.price.original)
                              ) : (
                                // Inace, prikazi opseg originalnih cena
                                <>
                                  {currencyFormat(
                                    item.price.min.price.original,
                                  )}{" "}
                                  -{" "}
                                  {currencyFormat(
                                    item.price.max.price.original,
                                  )}
                                </>
                              )
                            ) : item?.price?.price?.discount ? (
                              // Ako postoji pojedinacna cena sa discount-om
                              <>
                                <del>
                                  {currencyFormat(item.price.price.original)}
                                </del>
                                {currencyFormat(item.price.price.discount)}
                              </>
                            ) : (
                              // Ako postoji samo originalna pojedinacna cena
                              currencyFormat(item?.price?.price?.original)
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            !isFetching && (
              <div className={`mx-auto mt-5 w-[95%]`}>
                <span>Nema rezultata pretrage</span>
              </div>
            )
          )}
          {loading && (
            <div className={`mx-auto mt-5 w-[95%] text-center`}>
              <i className={`fas fa-spinner fa-spin text-xl text-black`}></i>
            </div>
          )}
          {!loading && searchData?.items?.length > 0 && (
            <div
              className={`sticky bottom-0 mt-auto w-full bg-primary py-2 text-center`}
            >
              <button
                onClick={(e) => {
                  handleSearch(e);
                  setSearchTermFocused(false);
                }}
                className={`h-full w-full text-center font-light text-white`}
              >
                Prikaži sve rezultate (
                {searchData?.pagination?.total_items > 10
                  ? `još ${searchData?.pagination?.total_items - 10}`
                  : `Pretraži`}
                )
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchProducts;
