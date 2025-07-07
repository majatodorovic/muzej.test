"use client";
import { Suspense, useState } from "react";
import { useIsLoggedIn } from "@/hooks/ecommerce.hooks";
import Specifications from "@/components/ProductDetails/Specifications";
import AddToCart from "@/components/ProductDetails/AddToCart";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { getDataFromCurrentProduct } from "@/components/ProductDetails/helpers/productInfo";
import { ProductGallery } from "@/components/ProductDetails/ProductGallery";

export const ProductInfo = ({ id, product, productGallery }) => {
  const { data: loggedIn } = useIsLoggedIn();
  const itemBasicData = product?.data?.item?.basic_data;
  const productVariant = null;
  const [tempError, setTempError] = useState(null);

  const { behaviours, inventory, selectedProduct, sku, price } =
    getDataFromCurrentProduct({
      productVariant,
      product,
    });

  return (
    <div className="sectionPaddingX sectionPaddingB grid grid-cols-4 gap-10 2xl:gap-x-[100px]">
      <ProductGallery productGallery={productGallery} />
      <div className="mt-[2rem] max-lg:col-span-4 lg:col-span-2">
        <div className="mt-3 flex flex-col">
          <Suspense fallback={<Loader />}>
            <h1 className="fontForum notranslate text-4xl">
              {itemBasicData?.name}
            </h1>
            <h2 className="mt-2 text-lg">
              {selectedProduct && sku ? `Šifra artikla: ${sku}` : <>&nbsp;</>}
            </h2>
            <ProductPrice
              selectedProduct={selectedProduct}
              displayComponent={
                loggedIn ||
                behaviours?.customer_settings?.product_price?.display_to_guest
              }
              is_details
              price={price}
              inventory={inventory}
              className={
                price?.discount?.active
                  ? `py-0.5 text-[21px] font-bold`
                  : `py-0.5 text-[1.172rem] font-bold`
              }
            />
            <div className="my-5 h-[2px] w-full bg-lightGreen" />
            <p className={`max-w-full text-base`}>
              {itemBasicData?.short_description}
            </p>
          </Suspense>
        </div>
        <AddToCart
          displayComponent={
            loggedIn ||
            behaviours?.customer_settings?.purchase?.allow_purchase_to_guest
          }
          product={product}
          tempError={tempError}
          setTempError={setTempError}
          productQuantity={1}
        />

        <Specifications id={id} />
      </div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className={`mt-5`}>
      <div className={`h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-10 h-2 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-10 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
    </div>
  );
};
