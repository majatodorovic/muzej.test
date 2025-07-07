import { get, get as GET } from "@/api/api";
import { headers } from "next/headers";
import SinglePost from "./components/SinglePost";

const getBlogPost = async (slug) => {
  return await GET(`/news/details/${slug}`).then((res) => res?.payload);
};

const BlogPostDetails = async ({ params: { slug } }) => {
  const post = await getBlogPost(slug);
  // const formatText = (text) => {
  //   const sentence = text.replace(/-/g, " ").toLowerCase();
  //   return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  // };

  return (
    <>
      {/* <BreadcrumbsStatic
        breadcrumbs={[
          { name: "Zbirke", url: "/zbirke" },
          { name: formatText(slug) ,class:'notranslate'},
        ]}
      /> */}
      <div className="sectionPaddingX sectionPaddingY">
        <SinglePost post={post} />
      </div>
    </>
  );
};

export default BlogPostDetails;

const getSEO = (slug) => {
  return get(`/news/details/seo/${slug}`).then((response) => response?.payload);
};

export const generateMetadata = async ({ params: { slug } }) => {
  const data = await getSEO(slug);
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | Prirodnjački muzej",
    description:
      data?.meta_description ?? "Dobrodošli na Prirodnjački muzej",
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
        data?.social?.share_description ??
        "Dobrodošli na Prirodnjački muzej",
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
