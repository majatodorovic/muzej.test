"use client";
import Image from "next/image";
import {
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "@/hooks/ecommerce.hooks";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/helpers/functions";
import Link from "next/link";
import SvgButtonTwo from "../svg/Paths/SvgButtonTwo";

const CheckoutItems = ({
  product,
  cart,
  refreshCart,
  refreshSummary,
  isClosed,
}) => {
  const { mutate: removeFromCart, isSuccess: isRemoved } = useRemoveFromCart();
  const { mutate: updateCart, isSuccess: isUpdated } = useUpdateCartQuantity();

  const {
    basic_data: { name, sku },
    price,
    inventory,
    image,
    link: { link_path: slug_path },
  } = product;

  const { quantity, cart_item_id } = cart;

  const [productQuantity, setProductQuantity] = useState(Number(quantity));

  useEffect(() => {
    if (Number(quantity) !== productQuantity) {
      updateCart({
        id: cart_item_id,
        quantity: productQuantity,
      });
    }
  }, [productQuantity]);

  useEffect(() => {
    setProductQuantity(Number(quantity));
  }, [quantity]);

  useEffect(() => {
    if (isUpdated || isRemoved) {
      refreshCart();
      refreshSummary();
    }
  }, [isRemoved, isUpdated]);

  return (
    <>
      <div
        className={`relative grid grid-cols-[110px_1fr] items-start justify-start gap-5 sm:grid-cols-[150px_1fr]`}
      >
        <button
          className={`absolute right-0 top-0 z-10 w-8 cursor-pointer ${
            isClosed && !inventory?.inventory_defined && "text-white"
          } text-lg hover:text-red-500`}
          onClick={() => {
            removeFromCart({ id: cart_item_id });
          }}
        >
          <i className="fas fa-times text-2xl"></i>
        </button>
        <Link href={`/${slug_path}`} className="w-full">
          <Image
            src={image?.[0] ?? "/images/placeholder.svg"}
            alt={`Comr`}
            width={0}
            height={0}
            className={`clipPathImage h-[100px] w-full bg-gray-100 sm:h-[160px]`}
          />
        </Link>
        <div className={`mb-auto ml-2 flex flex-col items-start gap-1 pt-4`}>
          <h4
            className={`fontForum mb-3 pr-9 text-lg leading-tight sm:text-xl`}
          >
            {name}
          </h4>
          <p className="max-sm:text-sm">Šifra:&nbsp;{sku}</p>
          <div className="flex items-center max-sm:text-sm">
            <div>Ukupan iznos:&nbsp;</div>
            <div className={`relative -ml-[36px] w-fit font-bold text-white`}>
              <SvgButtonTwo className="mx-auto h-[62px] w-fit" />
              <div className="buttonText">
                {currencyFormat(price?.per_item?.total)}
              </div>
            </div>
          </div>
        </div>
        {isClosed && !inventory?.inventory_defined && (
          <div
            className={`absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black/40`}
          ></div>
        )}
      </div>
    </>
  );
};

export default CheckoutItems;
