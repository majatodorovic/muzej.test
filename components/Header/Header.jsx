"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCategoryTree } from "@/hooks/ecommerce.hooks";
import HeaderIcons from "./HeaderIcons";
import { useRouter } from "next/navigation";
import SvgButtonOne from "../svg/Paths/SvgButtonOne";

const Header = () => {
  const { data: categories } = useCategoryTree();
  const pathname = usePathname();
  const [hoveredChildId, setHoveredChildId] = useState(null);
  const router = useRouter();

  // Filtriramo hook kategorije da ne dupliraju statičke stavke
  const dynamicCategories = categories?.filter(
    (cat) =>
      !["prodavnica", "zbirke", "o-muzeju"].includes(
        cat.slug.replace(/^\/+/, "")
      )
  ) || [];

  const categoriesMain = [
    { name: "Naslovna", slug: "/", isCategory: false },
    { name: "Prodavnica", slug: "/prodavnica", isCategory: false },
    { name: "Zbirke", slug: "/zbirke", isCategory: false },
    {
      name: "Posetite nas",
      slug: "/posetite-nas",
      isCategory: false,
      children: [
        { id: 1, name: "Radno vreme", link: { link_path: "posetite-nas/radno-vreme" } },
        { id: 2, name: "Cene", link: { link_path: "posetite-nas/cene" } },
      ],
    },
    ...dynamicCategories,
    {
      name: "O nama",
      slug: "/o-muzeju",
      isCategory: false,
      children: [
        { id: 0, name: "O muzeju", link: { link_path: "o-nama/o-muzeju" } },
        { id: 1, name: "Organizacija", link: { link_path: "o-nama/organizacija" } },
        { id: 2, name: "Javne nabavke", link: { link_path: "o-nama/javne-nabavke" } },
        { id: 3, name: "Javni poziv", link: { link_path: "o-nama/javni-poziv" } },
        { id: 4, name: "Normativna akta", link: { link_path: "o-nama/normativna-akta" } },
        { id: 5, name: "Planovi i izveštaji", link: { link_path: "o-nama/planovi-i-izvestaji" } },
      ],
    },
    { name: "Izložbe", slug: "/izlozbe", isCategory: false },
    {
      name: "Istražite",
      slug: "/istrazite",
      isCategory: false,
      children: [
        { id: 1, name: "Centar za markiranje životinja", link: { link_path: "istrazite/centar-za-markiranje-zivotinja" } },
        { id: 2, name: "Bulletin", className: "notranslate", link: { link_path: "istrazite/bulletin-of-the-natural-history-museum-in-belgrade" } },
        { id: 3, name: "Glasnik", link: { link_path: "istrazite/glasnik-prirodnjackog-muzeja" } },
        { id: 4, name: "Posebna izdanja", link: { link_path: "istrazite/posebna-izdanja-prirodnjackog-muzeja" } },
      ],
    },
    { name: "Kontakt", slug: "/kontakt", isCategory: false },
  ];

  const [visible, setVisible] = useState("");
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY < 40) return setVisible("sticky top-0 translate-y-0 transition-all duration-500");
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) setVisible("sticky top-0 -translate-y-full transition-all duration-500");
      else setVisible("sticky top-0 translate-y-0 transition-all duration-500");
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (slug) => {
    if (slug === "/") return pathname === "/";
    return pathname.startsWith(slug.startsWith("/") ? slug : `/${slug}`);
  };

  const isDropdownActive = (category) => {
    if (!category.children || category.children.length === 0) return isActive(category.slug);
    return category.children.some(child => pathname.startsWith(`/${child.link.link_path}`));
  };

  return (
    <header className={`max-xl:hidden ${visible} relative z-[10000] w-full bg-secondary`} id="header">
      <HeaderTop />
      <div className="sectionPaddingX flex h-[150px] items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo/logo.gif" width={170} height={95} alt="logo" className="transform invert" />
        </Link>
        <div className="flex items-stretch gap-4 md:mr-[20px] 3xl:gap-8">
          {categoriesMain.map((category, index) => {
            const isDropdown = category.children && category.children.length > 0;

            if (isDropdown) {
              return (
                <div key={index} className="group relative h-full">
                  <div className="h-full cursor-default">
                    <span className={`relative flex h-full w-fit items-center text-lg text-black 3xl:text-xl ${isDropdownActive(category) ? "activeCategory" : ""}`}>
                      {category.name}
                    </span>
                  </div>
                  <div className="invisible absolute left-0 top-full z-[1001] w-max min-w-[250px] rounded-xl bg-primary py-5 opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100">
                    {category.children.map(child => (
                      <div key={child.id} className="relative flex flex-col"
                           onMouseEnter={() => setHoveredChildId(child.id)}
                           onMouseLeave={() => setHoveredChildId(null)}>
                        <Link href={`/${child.link.link_path}`} className={`relative my-1.5 flex items-center justify-between pl-6 pr-10 text-lg text-white 3xl:text-xl ${child.className || ""}`}>
                          {child.name}
                        </Link>
                        {child.children && hoveredChildId === child.id && (
                          <div className="absolute left-full top-0 z-[102] w-max min-w-[250px] rounded-xl bg-primary px-6 py-5 text-lg shadow-md 3xl:text-xl">
                            {child.children.map(subchild => (
                              <Link key={subchild.id} href={`/${subchild.link.link_path}`} className="my-1.5 block text-white">
                                {subchild.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link key={index} href={category.slug.startsWith("/") ? category.slug : `/${category.slug}`} className="h-full">
                <span className={`activeCategoryHover relative flex h-full w-fit items-center text-lg text-black 3xl:text-xl ${isActive(category.slug) ? "activeCategory" : ""}`}>
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-5">
          <HeaderIcons />
          <button onClick={() => router.push("/posetite-nas/galerija-prirodnjackog-muzeja?tickets=true")} className="relative">
            <SvgButtonOne className="h-[52px] w-[250px]" />
            <div className="buttonText">Kupite karte</div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
