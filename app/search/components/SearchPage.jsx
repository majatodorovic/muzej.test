"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Thumb } from "../../../components/Thumb/Thumb";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "@/hooks/ecommerce.hooks";
import SvgButtonOne from "../../../components/svg/Paths/SvgButtonOne";

const SearchPage = () => {
  const params = useSearchParams();

  const search = params.get("search");

  const { data: returnedProducts, isFetching: loading } = useSearch({
    searchTerm: search,
    isSearchPage: true,
  });

  return (
    <>
      {returnedProducts?.length > 0 && !loading ? (
        <div className="sectionPaddingB sectionPaddingX pt-14">
          <h2 className="fontForum mb-20 !text-left text-4xl xl:text-5xl">
            Rezultati pretrage za termin &quot;{search}&quot;
          </h2>
          <div className="mx-auto grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 md:gap-y-[20px] lg:grid-cols-3 2xl:grid-cols-4">
            {returnedProducts.map((product, index) => (
              <Suspense
                key={index}
                fallback={
                  <div
                    className={`aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
                  />
                }
              >
                <Thumb slug={product?.id} key={product?.id} />
              </Suspense>
            ))}
          </div>
        </div>
      ) : (
        !loading && (
          <>
            <div className="sectionPaddingY sectionPaddingX flex items-center justify-center">
              <div className="flex flex-col items-center justify-center rounded-3xl border border-primary p-10 shadow-lg">
                <div className="mx-auto">
                  <Image
                    src={"/icons/no-results.png"}
                    alt="404"
                    width={130}
                    height={130}
                  />
                </div>
                <div className="mt-10">
                  <p className="text-lg font-medium">
                    Vaša pretraga nije dala nikakve rezultate.
                  </p>
                  <p className="text-sm">
                    Trenutno ne postoji rezultat za Vašu pretragu &quot;{search}
                    &quot;.
                  </p>
                  <p className="mt-4 text-lg font-medium">Pomoć u pretrazi:</p>
                  <ul className="text-sm">
                    <li className="mt-2">• Proverite greške u kucanju.</li>
                    <li className="mt-2">
                      • Koristite više generčkih termina za pretragu.
                    </li>
                    <li className="mt-2">
                      • Proizvod ili kategorija koju tražite možda nisu još uvek
                      dostupni na našoj online prodavnici.
                    </li>
                    <li className="mt-2">
                      • Ukoliko Vam je potrebna pomoć, u svakom trenutku nas
                      možete kontaktirati pozivom na broj call centra
                    </li>
                  </ul>
                </div>
                <div className="mx-auto mt-10 text-center">
                  <Link href="/" className="relative w-full max-w-[350px]">
                    <SvgButtonOne className="h-[62px] w-full max-sm:h-[52px]" />
                    <div className="buttonText !left-0 !w-[300px] !px-0 max-sm:!text-sm">
                      Vrati se na početnu stranu
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default SearchPage;
