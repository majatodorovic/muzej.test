"use client";
import { useRecommendedProducts } from "@/hooks/cartData.hooks";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/ecommerce.hooks";
import { CartLoader } from "@/components/Cart/cart-loader";
import { CartNoItems } from "@/components/Cart/cart-no-items";
import RecommendedProducts from "@/components/ProductSliders/RecommendedProducts";
import CartContainer from "@/components/Cart/CartContainer";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

export default function CartPage() {
  const { data: recommendedProducts } = useRecommendedProducts();

  //fetchujemo sve artikle iz korpe
  const { data: cartData, refetch: refreshCart, isFetching } = useCart();
  const [successfullyFetched, setSuccessfullyFetched] = useState(false);
  useEffect(() => {
    if (!isFetching) {
      setSuccessfullyFetched(true);
    }
  }, [isFetching]);

  const renderCart = () => {
    switch (true) {
      case !successfullyFetched:
        return <CartLoader />;
      case cartData?.items?.length > 0 && successfullyFetched:
        return <CartContainer refreshCart={refreshCart} cartData={cartData} />;
      case cartData?.items?.length === 0 && successfullyFetched:
        return <CartNoItems />;
      default:
        return <CartLoader />;
    }
  };

  return (
    <>
      <BreadcrumbsStatic
        breadcrumbs={[{ name: "Korpa" }]}
      />
      {renderCart()}
      {recommendedProducts?.length > 0 && (
        <RecommendedProducts
          recommendedProducts={recommendedProducts}
          action4={`Gledali ste i ove modele`}
        />
      )}
    </>
  );
}
