"use client";
import { useContext, useEffect, useState } from "react";
import {
  useBillingAddresses,
  useCheckout,
  useGetAddress,
  useIsLoggedIn,
  useGetAccountData,
} from "@/hooks/ecommerce.hooks";
import { handleCreditCard, handleSetData } from "@/components/Cart/functions";
import { useRouter } from "next/navigation";
import { PromoCode } from "@/components/Cart/PromoCode";
import CheckoutUserInfo from "@/components/Cart/CheckoutUserInfo";
import CheckoutOptions from "@/components/Cart/CheckoutOptions";
import CheckoutTotals from "@/components/Cart/CheckoutTotals";
import CheckoutItems from "@/components/Cart/CheckoutItems";
import Spinner from "@/components/UI/Spinner";
import { userContext } from "@/context/userContext";
import CheckoutButton from "@/components/Cart/CheckoutButton";
import FreeDeliveryScale from "@/components/Cart/FreeDeliveryScale";
import NoStockModal from "@/components/Cart/NoStockModal";
import GeneralTermsOfUseField from "@/components/Cart/GeneralTermsOfUseField";
import { filterOutProductsOutOfStock } from "@/components/Cart/helper/outOfStock";

export const CheckoutData = ({
  payment_options,
  delivery_options,
  summary,
  items,
  refreshCart,
  refreshSummary,
  dataTmp,
  setDataTmp,
  errorsTmp,
  setErrorsTmp,
}) => {
  const router = useRouter();
  const [selected, setSelected] = useState({
    id: null,
    use_same_data: true,
  });

  const { loggedIn: userLoggedIn } = useContext(userContext);

  const { data: loggedIn } = useIsLoggedIn();

  const { data: billing_addresses } = userLoggedIn ? useBillingAddresses() : [];

  const { data: user_billing_addresses } = userLoggedIn
    ? useGetAccountData({ api: `/customers/billing-address`, method: "list" })
    : [];

  const { data: form, isLoading } = useGetAddress(
    billing_addresses?.length > 1 && selected?.id
      ? selected?.id
      : billing_addresses?.[0]?.id,
    "billing",
    loggedIn && Boolean(billing_addresses?.length),
  );

  const [postErrors, setPostErrors] = useState({
    fields: [],
  });

  const [isClosed, setIsClosed] = useState(false);

  const {
    data: checkOutData,
    mutate: checkOutMutate,
    isPending,
    isSuccess: isCheckoutSuccess,
  } = useCheckout({
    formData: dataTmp,
    setPostErrors: setPostErrors,
  });

  useEffect(() => {
    const defaultAddress = user_billing_addresses?.items?.find(
      (address) => address.set_default === 1,
    );
    if (defaultAddress) {
      const { id: billing_id } = defaultAddress;
      setSelected((prev) => ({
        ...prev,
        id: billing_id,
      }));
    }
  }, [user_billing_addresses?.items]);

  useEffect(() => {
    if (items && !isClosed) {
      const productOutOfStock = filterOutProductsOutOfStock(items);

      setPostErrors((prevErrors) => ({
        ...prevErrors,
        fields: productOutOfStock,
      }));
    }
  }, [items]);

  useEffect(() => {
    if (isCheckoutSuccess && checkOutData) {
      const { credit_card } = checkOutData;
      switch (true) {
        case credit_card === null:
          return router.push(
            `/korpa/kupovina/${checkOutData?.order?.order_token}`,
          );
        case credit_card !== null:
          return handleCreditCard(checkOutData);
        default:
          break;
      }
    }
  }, [isCheckoutSuccess, checkOutData, router]);

  useEffect(
    () => {
      if (!isLoading) {
        handleSetData("default_data", form, dataTmp, setDataTmp);
      }
    },
    [selected?.id, form?.[0]],
    isLoading,
  );

  useEffect(() => {
    if (selected?.use_same_data) {
      return handleSetData("same_data", form, dataTmp, setDataTmp);
    } else {
      return handleSetData("different_data", form, dataTmp, setDataTmp);
    }
  }, [selected?.id, selected?.use_same_data]);

  return (
    <div className={`grid grid-cols-6 gap-10 2xl:grid-cols-5 2xl:gap-16`}>
      <div className={`col-span-6 flex flex-col lg:col-span-3`}>
        <CheckoutUserInfo
          errors={errorsTmp}
          selected={selected}
          setErrors={setErrorsTmp}
          setFormData={setDataTmp}
          formData={dataTmp}
        />
        <CheckoutOptions
          errors={errorsTmp}
          setErrors={setErrorsTmp}
          delivery_options={delivery_options}
          payment_options={payment_options}
          setFormData={setDataTmp}
          formData={dataTmp}
        />
      </div>

      <div
        className={`col-span-6 flex flex-col gap-4 md:col-span-6 lg:col-span-3 2xl:col-span-2`}
      >
        <h2 className="mb-3 text-xl">Proizvodi u korpi</h2>
        <div
          className={`customScroll mb-16 flex max-h-[400px] flex-col gap-5 overflow-y-auto pr-2 sm:mb-10`}
        >
          {(items ?? [])?.map(({ product, cart }, index) => (
            <CheckoutItems
              product={product}
              cart={cart}
              key={index}
              refreshCart={refreshCart}
              isClosed={isClosed}
              refreshSummary={refreshSummary}
            />
          ))}
        </div>
        <PromoCode />
        <CheckoutTotals summary={summary} />
        <GeneralTermsOfUseField
          dataTmp={dataTmp}
          setDataTmp={setDataTmp}
          errorsTmp={errorsTmp}
          setErrorsTmp={setErrorsTmp}
        />
        <CheckoutButton
          isPending={isPending}
          dataTmp={dataTmp}
          setErrorsTmp={setErrorsTmp}
          checkOutMutate={checkOutMutate}
          selected={selected}
        />
        <div className="w-full xl:block">
          <FreeDeliveryScale summary={summary} />
        </div>
      </div>
      <NoStockModal
        postErrors={postErrors}
        setPostErrors={setPostErrors}
        setIsClosed={setIsClosed}
        refreshSummary={refreshSummary}
        refreshCart={refreshCart}
      />
      {isCheckoutSuccess && checkOutData?.credit_card === null && (
        <div
          className={`fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500`}
        >
          <Spinner className={`!scale-125`} />
        </div>
      )}
    </div>
  );
};
