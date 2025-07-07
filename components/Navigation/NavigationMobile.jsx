"use client";
import { list } from "@/api/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { currencyFormat } from "@/helpers/functions";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useCartBadge, useCategoryTree } from "@/hooks/ecommerce.hooks";
import Translate from "../Translate/Translate";

const NavigationMobile = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: categories } = useCategoryTree();
  const { data: cartCount, refetch } = useCartBadge();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMenus, setExpandedMenus] = useState({});

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm?.length >= 3) {
      router.push(`/search?search=${searchTerm}`);
      setSearchOpen(false);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    const handleBodyOverflow = () => {
      if (menuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    handleBodyOverflow();
  }, [menuOpen]);

  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const handleScrollIconDisappear = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300) {
        setSearchVisible(true);
      } else {
        setSearchVisible(false);
      }
    };

    window.addEventListener("scroll", handleScrollIconDisappear);
    return () => {
      window.removeEventListener("scroll", handleScrollIconDisappear);
    };
  }, []);

  useEffect(() => {
    if (pathname?.includes("/korpa/")) {
      refetch();
      router?.refresh();
    }
  }, [pathname]);

  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data: searchData, isFetching } = useQuery({
    queryKey: ["searchData", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch?.length >= 3) {
        return await list(`/products/search/list`, {
          search: debouncedSearch,
        }).then((res) => {
          return res?.payload;
        });
      }
    },
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const categoriesMain = [
    {
      name: "Posetite nas",
      slug: "/posetite-nas",
      isCategory: false,
      children: [
        {
          id: 1,
          name: "Galerija Prirodnjačkog muzeja",
          link: { link_path: "posetite-nas/galerija-prirodnjackog-muzeja" },
        },
        {
          id: 2,
          name: "Izložba u galeriji",
          link: { link_path: "posetite-nas/izlozba-u-galeriji" },
        },
      ],
    },
    ...(categories ? categories : []),
    {
      name: "O nama",
      slug: "/o-nama",
      isCategory: false,
      children: [
        {
          id: 1,
          name: "Organizacija",
          link: { link_path: "o-nama/organizacija" },
        },
        {
          id: 2,
          name: "Godišnjak prirodnjačkog muzeja",
          link: { link_path: "o-nama/godisnjak-prirodnjackog-muzeja" },
        },
        {
          id: 3,
          name: "Javno poslovanje",
          link: { link_path: "o-nama/javno-poslovanje/javne-nabavke" },
          children: [
            {
              id: 1,
              name: "Javne nabavke",
              link: {
                link_path: "o-nama/javno-poslovanje/javne-nabavke",
              },
            },
            {
              id: 2,
              name: "Javni poziv",
              link: { link_path: "o-nama/javno-poslovanje/javni-poziv" },
            },
            {
              id: 3,
              name: "Normativna akta",
              link: { link_path: "o-nama/javno-poslovanje/normativna-akta" },
            },
            {
              id: 4,
              name: "Planovi i izveštaji",
              link: {
                link_path: "o-nama/javno-poslovanje/planovi-i-izvestaji",
              },
            },
          ],
        },
      ],
    },
    {
      name: "Istražite",
      slug: "/istrazite",
      isCategory: false,
      children: [
        {
          id: 1,
          name: "Centar za markiranje životinja",
          link: { link_path: "istrazite/centar-za-markiranje-zivotinja" },
        },
        {
          id: 2,
          name: "Bulletin of the Natural History Museum in Belgrade",
          className: "notranslate",
          link: {
            link_path:
              "istrazite/bulletin-of-the-natural-history-museum-in-belgrade",
          },
        },
        {
          id: 3,
          name: "Glasnik Prirodnjačkog muzeja",
          link: { link_path: "istrazite/glasnik-prirodnjackog-muzeja" },
        },
        {
          id: 4,
          name: "Posebna izdanja Prirodnjačkog muzeja",
          link: { link_path: "istrazite/posebna-izdanja-prirodnjackog-muzeja" },
        },
      ],
    },
    { name: "Kontakt", slug: "kontakt", isCategory: false },
  ];

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  return (
    <>
      <div className="sticky top-0 z-[2000] w-full bg-white bg-opacity-90 backdrop-blur-md xl:hidden">
        <div className="mx-auto flex w-[95%] items-center justify-between py-3">
          <div onClick={() => setMenuOpen(true)}>
            <Image
              alt={`HAMBURGER ICON`}
              src={"/icons/hamburger.png"}
              width={30}
              height={30}
            />
          </div>
          <Link href="/">
            <div className="relative">
              <Image
                alt={`logo`}
                src={"/images/logo/logo.gif"}
                width={150}
                height={33}
                className="h-auto w-36 transform invert"
              />
            </div>
          </Link>
          <div className="relative flex items-center gap-4">
            {" "}
            {pathname === "/" ? (
              <div
                className={
                  searchVisible
                    ? `visible opacity-100 transition-all duration-500`
                    : `invisible opacity-0 transition-all duration-500`
                }
              >
                <Image
                  src="/icons/search.png"
                  alt="search icon"
                  id="search"
                  width={22}
                  height={22}
                  onClick={() => setSearchOpen(true)}
                />
              </div>
            ) : (
              <div>
                <Image
                  src={"/icons/search.png"}
                  alt="search icon"
                  id="search"
                  width={22}
                  height={22}
                  onClick={() => setSearchOpen(true)}
                />
              </div>
            )}
            <Link href="/korpa">
              <div className="relative">
                <Image
                  alt="cart icon"
                  className="h-auto w-7"
                  src={"/icons/trolley.svg"}
                  width={21}
                  height={21}
                />
                {cartCount > 0 && (
                  <span className="absolute -right-1 top-0 rounded-full bg-primary px-1 py-0 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={
          searchVisible
            ? `text-white ${
                pathname === "/" ? `flex items-center justify-center` : `hidden`
              } invisible sticky top-[110px] z-[4000] bg-transparent opacity-0 transition-all duration-500 md:hidden`
            : `text-white ${
                pathname === "/" ? `flex items-center justify-center` : `hidden`
              } visible sticky top-[110px] z-[4000] bg-transparent opacity-100 transition-all duration-500 md:hidden`
        }
      >
        <form
          className="absolute mx-auto mt-12 flex h-12 w-[95%] items-center py-2"
          onClick={() => setSearchOpen(true)}
        >
          <div
            type="text"
            className="h-full w-full rounded-lg border border-white bg-transparent py-2 pl-8 text-xs text-white mix-blend-difference placeholder:text-xs placeholder:text-white focus:border-white focus:outline-none focus:ring-0"
            placeholder="Pretraga"
            onChange={(e) => setSearchTerm(e.target.value)}
            onMouseDown={() => setSearchOpen(true)}
          />
          <p className="absolute left-8 text-sm">Pretraga</p>
          <i className="fa-solid fa-search absolute left-2 top-5 text-xs text-white"></i>
        </form>
      </div>
      <div
        className={
          menuOpen
            ? `fixed left-0 top-0 z-[5000] flex h-screen w-full translate-x-0 flex-col bg-white transition-all duration-500`
            : `fixed left-0 top-0 z-[5000] flex h-screen w-full -translate-x-full flex-col bg-white transition-all duration-500`
        }
      >
        <div className="mx-auto flex w-[95%] items-center justify-between py-3.5">
          <Image
            src="/images/logo/logo.gif"
            width={150}
            height={150}
            alt="logo"
            className="h-auto w-36 transform invert"
          />
          <i
            className="fas fa-times text-2xl"
            onClick={() => setMenuOpen(false)}
          ></i>
        </div>
        <div className="mx-auto w-[95%] flex-1 overflow-y-auto">
          <div className="flex flex-col space-y-4 py-6">
            {categoriesMain.map((category, index) => (
              <div key={index} className="border-b border-gray-100 pb-4">
                {category.children ? (
                  <div>
                    <div
                      className="flex cursor-pointer items-center justify-between"
                      onClick={() => toggleMenu(category.slug)}
                    >
                      <span className="text-lg font-medium">
                        {category.name}
                      </span>
                      <i
                        className={`fas fa-chevron-${expandedMenus[category.slug] ? "up" : "down"} text-sm`}
                      ></i>
                    </div>
                    {expandedMenus[category.slug] && (
                      <div className="ml-4 mt-3 flex flex-col space-y-3">
                        {category.children.map((child) => (
                          <div key={child.id} className="flex flex-col">
                            {child.children ? (
                              <div>
                                <div
                                  className="flex cursor-pointer items-center justify-between"
                                  onClick={() =>
                                    toggleMenu(`${category.slug}-${child.id}`)
                                  }
                                >
                                  <span className="text-base">
                                    {child.name}
                                  </span>
                                  <i
                                    className={`fas fa-chevron-${expandedMenus[`${category.slug}-${child.id}`] ? "up" : "down"} text-sm`}
                                  ></i>
                                </div>
                                {expandedMenus[
                                  `${category.slug}-${child.id}`
                                ] && (
                                  <div className="ml-4 mt-2 flex flex-col space-y-2">
                                    {child.children.map((subchild) => (
                                      <Link
                                        key={subchild.id}
                                        href={`/${subchild.link.link_path}`}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-sm text-gray-600"
                                      >
                                        {subchild.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <Link
                                href={`/${child.link.link_path}`}
                                onClick={() => setMenuOpen(false)}
                                className={`text-base ${child.className || ""}`}
                              >
                                {child.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={`/${category.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg font-medium"
                  >
                    {category.name}
                  </Link>
                )}
              </div>
            ))}
            <Translate />
          </div>
        </div>
      </div>
      {menuOpen && (
        <div
          className="fixed left-0 top-0 z-[4000] h-screen w-screen bg-black bg-opacity-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      {searchOpen && (
        <div className="fixed left-0 top-0 z-[10000] h-screen w-screen bg-white">
          <div className="mx-auto mt-6 flex w-[95%] items-center gap-2">
            <form onSubmit={handleSearch} className="relative w-[90%]">
              <input
                type="text"
                className="w-full rounded-lg border border-[#191919] pl-10 placeholder:text-base focus:border-[#191919] focus:outline-none focus:ring-0"
                placeholder="Unesite pojam za pretragu "
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 transform text-sm text-[#191919]"></i>
              {searchTerm?.length >= 1 && searchTerm?.length < 3 ? (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 py-2">
                  <span className={`text-[0.8rem] font-normal text-red-500`}>
                    Unesite najmanje 3 karaktera.
                  </span>
                </div>
              ) : null}
            </form>
            <p
              className="text-xs"
              onClick={() => {
                setSearchOpen(false);
                setSearchTerm("");
              }}
            >
              Otkaži
            </p>
          </div>
          {searchData?.items?.length > 0 && searchTerm?.length > 0 && (
            <div className="mx-auto mt-5 w-[95%]">
              <p className="text-[1rem] font-normal">Rezultati pretrage</p>
              <div className="mt-3 flex flex-col gap-5">
                {searchData?.items?.slice(0, 6)?.map((item) => {
                  return (
                    <Link
                      key={item?.id}
                      href={`/${item?.link?.link_path}`}
                      onClick={(e) => {
                        setSearchOpen(false);
                        handleSearch(e);
                        setSearchTerm("");
                      }}
                    >
                      <div className="flex flex-row items-center gap-5">
                        <div className="relative h-[60px] w-[60px] min-w-[60px]">
                          <Image
                            src={item.image[0]}
                            alt={``}
                            fill
                            sizes="100vw"
                            className={`rounded-full object-cover`}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="notranslate text-[0.9rem] font-normal">
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
                {searchData?.items?.length > 6 && (
                  <Link
                    href={`/search?search=${searchTerm}`}
                    className={`mx-auto mt-4 w-[95%] rounded-lg bg-primary py-3 text-center text-[0.9rem] font-normal text-white`}
                    onClick={(e) => {
                      setSearchOpen(false);
                      handleSearch(e);
                      setSearchTerm("");
                    }}
                  >
                    {`Pogledaj sve rezultate ( još ${
                      searchData?.pagination?.total_items -
                      (searchData?.items?.length > 6
                        ? 6
                        : searchData?.items?.length)
                    } )`}
                  </Link>
                )}
              </div>
            </div>
          )}
          {isFetching && (
            <div className={`mx-auto mt-5 w-[95%] text-center`}>
              <i className={`fas fa-spinner fa-spin text-xl text-black`}></i>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavigationMobile;
