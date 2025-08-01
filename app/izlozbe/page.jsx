import SinglesExhibitions from "./components/SinglesExibitions";
import ExhibitionsPaginations from "./components/ExibitionsPaginations";
import { list } from "@/api/api";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const POSTS_PER_PAGE = 6;

async function fetchExhibitions(page = 1) {
  const res = await list(
    `/news/category/list/izlozbe?page=${page}&limit=${POSTS_PER_PAGE}`,
  );
  return res;
}

const IzlozbaUGaleriji = async () => {
  const data = await fetchExhibitions(1);
  const allPosts = data.payload.items || [];
  const totalPages = data.payload.pagination?.total_pages || 1;

  return (
    <>
      <BreadcrumbsStatic
       breadcrumbs={[{ name: "Izložbe" }]}
      />
      <section data-aos="fade-up" className="sectionPaddingB sectionPaddingX">
        <SinglesExhibitions post={allPosts[0]} />
      </section>
      <section
        data-aos="fade-up"
        className="sectionPaddingY sectionPaddingX bg-secondary"
      >
        <h2 className="fontForum titleH2 mb-[120px]">Ostale izložbe:</h2>
        <br/>
        <br/>
        <br/>
        <br/>
        <ExhibitionsPaginations initialPosts={allPosts} totalPages={totalPages} />
      </section>
    </>
  );
};

export default IzlozbaUGaleriji;

export const metadata = {
  title: "Izložbe | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
