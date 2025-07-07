import { useRouter } from "next/navigation";
import { useAddToCart } from "@/hooks/ecommerce.hooks";
import {
  checkIsAddableToCart,
  cartTextBySelectedVariant,
} from "./helpers/addToCart";
import SvgButtonOne from "../svg/Paths/SvgButtonOne";

const AddToCart = ({
  displayComponent,
  selectedOptions,
  productQuantity,
  productVariant,
  product,
  tempError,
  setTempError,
}) => {
  if (!displayComponent) return <></>;
  const router = useRouter();
  const { mutate: addToCart, isPending } = useAddToCart();

  const productItem = product?.data?.item;

  const isAddableToCart = checkIsAddableToCart({
    price: productVariant?.id ? productVariant?.price : productItem?.price,
    inventory: productVariant?.id
      ? productVariant?.inventory
      : productItem?.inventory,
  });

  const handleAddToCart = () => {
    switch (product?.product_type) {
      case "single": {
        let is_addable = checkIsAddableToCart({
          price: productItem?.price,
          inventory: productItem?.inventory,
        });
        if (is_addable?.addable) {
          addToCart({
            id: productItem?.basic_data?.id_product,
            quantity: productQuantity,
          });
          return true;
          // pushToDataLayer("add_to_cart", productItem, productQuantity);
        } else {
          router.push(
            `/kontakt?proizvodIme=${productItem?.basic_data.name}&proizvodId=${productItem?.id}`,
          );
        }
        break;
      }
      case "variant": {
        if (productVariant?.id) {
          let is_addable = checkIsAddableToCart({
            price: productVariant?.price,
            inventory: productVariant?.inventory,
          });

          if (is_addable?.addable) {
            addToCart({
              id: productVariant?.id,
              quantity: productQuantity,
            });
            return true;
            // pushToDataLayer("add_to_cart", productVariant, productQuantity);
          } else {
            router.push(
              `/kontakt?proizvodIme=${productItem?.basic_data.name}&proizvodId=${productVariant?.id}&atribut=${productVariant?.basic_data.attributes_text}`,
            );
          }
        } else {
          let text = cartTextBySelectedVariant({ selectedOptions, product });
          setTempError(text);
        }
        break;
      }
      default:
        break;
    }
    return false;
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-start 2xl:flex-row 2xl:items-center">
      <button
        onClick={() => {
          handleAddToCart();
        }}
        className="relative"
      >
        <SvgButtonOne className="h-[52px] w-[250px]" fill="#fff" />
        <div className="buttonText !text-primary">
          {isPending
            ? "Dodajem..."
            : tempError
              ? tempError
              : isAddableToCart?.text}
        </div>
      </button>

      {isAddableToCart?.addable && !tempError && (
        <button
          onClick={() => {
            if (handleAddToCart()) {
              router.push("/korpa");
            }
          }}
          className="relative"
        >
          <SvgButtonOne className="h-[52px] w-[250px] rotate-180" />
          <div className="buttonText">Kupi odmah</div>
        </button>
      )}
    </div>
  );
};

export default AddToCart;
