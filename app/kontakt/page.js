import Contact from "@/components/Contact/Contact";
import { headers } from "next/headers";
import { list } from "@/api/api";
import Locations from "./components/Locations";
import StaticHero from "@/components/StaticHero/StaticHero";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const getData = () => {
  return list("/static-pages/content/kontakt").then((res) => {
    return res?.payload;
  });
};

const Kontakt = async ({ searchParams }) => {
  const data = await getData();
  const staticData = data?.items?.map((items) => items);

  const { proizvodIme, proizvodId, atribut } = searchParams;

  const defaultMessage =
    proizvodIme && proizvodId
      ? `Poštovani, \n\nMolim Vas da na datu e-mail adresu pošaljete ponudu za proizvod ${proizvodIme} - ${proizvodId}. ${
          atribut ? atribut : ""
        }.\n\nHvala.`
      : null;

  return (
    <>
      <StaticHero data={{ name: "Kontakt" ,
        image:"/images/museum.png" 
      }} />
      <BreadcrumbsStatic breadcrumbs={[{ name: "Kontakt" }]} />
      <section data-aos="fade-up" className="sectionPaddingX sectionPaddingB">
        <Contact staticData={staticData} defaultMessage={defaultMessage} />
      </section>
      <Locations />
    </>
  );
};

export default Kontakt;

export const generateMetadata = async () => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: `Kontakt | Prirodnjački muzej`,
    description: "Dobrodošli na Prirodnjački muzej",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Kontakt | Prirodnjački muzej`,
      description: "Dobrodošli na Prirodnjački muzej",
      type: "website",
      images: [
        {
          url: "https://api.fashiondemo.croonus.com/croonus-uploads/config/b2c/logo-c36f3b94e6c04cc702b9168481684f19.webp",
          width: 800,
          height: 600,
          alt: "Prirodnjački muzej",
        },
      ],
      locale: "sr_RS",
    },
  };
};
