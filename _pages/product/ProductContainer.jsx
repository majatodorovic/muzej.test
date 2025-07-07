"use client";

import { useEffect } from "react";
import { ProductInfo } from "@/components/ProductDetails/ProductInfo";
import CrosssellProducts from "@/components/ProductSliders/CrosssellProducts";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const ProductContainer = ({
  digitalProduct,
  basic_data,
  product_gallery,
  path,
  id,
}) => {
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);
  console.log(basic_data?.data?.item?.basic_data?.name);
  return (
    <>
      <BreadcrumbsStatic
        breadcrumbs={[
          { name: "Prodavnica", url: "/prodavnica" },
          { name: basic_data?.data?.item?.basic_data?.name },
        ]}
      />
      <ProductInfo
        productGallery={product_gallery}
        path={path?.[path?.length - 1]}
        id={id}
        product={basic_data}
        digitalProduct={digitalProduct}
      />
      <CrosssellProducts id={id} />
    </>
  );
};

export default ProductContainer;
