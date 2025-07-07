import { get, list } from "@/api/api";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";
import Slider from "./homepage/components/Slider/Slider";
import NormalBanner from "./homepage/components/NormalBanner/NormalBanner";
import ResearchFields from "./homepage/components/ResearchFields/ResearchFields";
import WorldBanner from "./homepage/components/WorldBanner/WorldBanner";
import NewsLetter from "@/app/homepage/components/NewsLetter/NewsLetter";
import NewPosts from "./homepage/components/NewPosts/NewPosts";

const getSliders = () => {
  return get("/banners/index_slider").then((res) => res?.payload);
};
const getMobileSliders = () => {
  return get("/banners/index_slider_mobile").then((res) => res?.payload);
};
const getNormalBanner = () => {
  return get("/banners/banner_1").then((res) => res?.payload);
};
const getAllBlogPosts = async () => {
  return await list(`/news/category/list/zbirke`).then(
    (res) => res?.payload?.items,
  );
};
const getWorldBanner = () => {
  return get("/banners/banner_3").then((res) => res?.payload);
};

const Home = async () => {
  const sliders = await getSliders();
  const mobileSliders = await getMobileSliders();
  const normalBanner = await getNormalBanner();
  const worldBanner = await getWorldBanner();
  const posts = await getAllBlogPosts();

  let all_headers = headers();
  let base_url = all_headers.get("x-base_url");

  let schema = generateOrganizationSchema(base_url);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="relative block overflow-hidden">
        <div className="relative block" id="slider">
          <Slider banners={sliders} mobileBanners={mobileSliders} />
        </div>
        <NormalBanner banners={normalBanner} />
        <ResearchFields />
        <NewPosts posts={posts} />
        <WorldBanner banners={worldBanner} />
        <NewsLetter />
      </div>
    </>
  );
};

export default Home;

export const revalidate = 30;

const getSEO = () => {
  return get("/homepage/seo").then((response) => response?.payload);
};

export const generateMetadata = async () => {
  const data = await getSEO();
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | Prirodnjački muzej",
    description: data?.meta_description ?? "Dobrodošli na Prirodnjački muzej",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Početna | Prirodnjački muzej",
      description:
        data?.social?.share_description ?? "Dobrodošli na Prirodnjački muzej",
      type: "website",
      images: [
        {
          url: data?.social?.share_image ?? "",
          width: 800,
          height: 600,
          alt: "Prirodnjački muzej",
        },
      ],
      locale: "sr_RS",
    },
  };
};
