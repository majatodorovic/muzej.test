import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";
import OrganizationalStructure from "./components/OrganizationalStructure";
import { get } from "@/api/api";

const getWorldBanner = () => {
  return get("/banners/banner_4").then((res) => res?.payload);
};

const OrganizacionaStruktura = async () => {
  const worldBanner = await getWorldBanner();

  return (
    <>
      <BreadcrumbsStatic
        breadcrumbs={[
          { name: "O nama" },
          { name: "Organizacija" },
        ]}
      />
      <OrganizationalStructure banners={worldBanner} />
    </>
  );
};
export default OrganizacionaStruktura;

export const metadata = {
  title: "Organizaciona struktura | Prirodnjački muzej",
  description: "Prirodnjački muzej",
  robots: {
    index: true,
    follow: true,
  },
};
