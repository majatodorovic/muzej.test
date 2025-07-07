import { currencyFormat } from "@/helpers/functions";
import SvgButtonTwo from "../svg/Paths/SvgButtonTwo";

/**
 * Returns
 * status
 * of
 * the
 * price
 * @param {object} price -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {string}
 *     -
 *     The
 *     status
 *     of
 *     the
 *     price.
 */
export const getPriceStatus = (price) => {
  let status = "default";

  if (price?.discount?.active && price?.rebate?.active) {
    status = "discount_rebates";
  }
  if (price?.discount?.active && !price?.rebate?.active) {
    status = "discount";
  }
  if (price?.rebate?.active && !price?.discount?.active) {
    status = "rebates";
  }

  return status;
};

/**
 * Returns
 * are
 * prices
 * equal
 * @param {object} price -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {boolean}
 *     -
 *     Are
 *     prices
 *     equal.
 */
export const getArePricesEqual = (price) => {
  return price?.min?.price?.original === price?.max?.price?.original;
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} inventory -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     inventory
 *     data.
 * @returns {boolean}
 *     -
 *     The
 *     status
 *     of
 *     the
 *     inventory
 *     -
 *     is
 *     in
 *     stock
 *     or
 *     not.
 */
export const checkIsInStock = (inventory) => {
  return inventory?.inventory_defined && Number(inventory?.amount) > 0;
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} price -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {object}
 *     -
 *     The
 *     status
 *     of
 *     the
 *     price
 *     -
 *     is
 *     it
 *     defined
 *     and
 *     is
 *     it
 *     the
 *     range
 *     of
 *     prices.
 */
export const checkPrices = (price) => {
  let data = {};

  data.price_defined = !!(price?.price_defined && price?.price?.original > 0);

  data.price_range =
    price?.min?.price?.original > 0 && price?.max?.price?.original > 0;

  return data;
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} data -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {JSX.Element}
 *     -
 *     Default
 *     prices,
 *     without
 *     rebates
 *     or
 *     discounts.
 */
export const renderDefaultPrices = (data = {}) => {
  let is_range = data?.is_price_range;
  let price = data?.price;

  if (is_range) {
    let are_range_prices_equal = getArePricesEqual(price);
    if (are_range_prices_equal) {
      return (
        <div className={`relative -ml-[44px] mt-3 w-fit font-bold text-white`}>
          <SvgButtonTwo className="mx-auto h-[62px] w-fit" />
          <div className="buttonText">
            {currencyFormat(price?.min?.price?.original)}
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className={`relative -ml-[44px] mt-3 w-fit font-bold text-white`}>
        <SvgButtonTwo className="mx-auto h-[62px] w-fit" />
        <div className="buttonText">
          {currencyFormat(price?.price?.original)}
        </div>
      </div>
    );
  }
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} data -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {JSX.Element}
 *     -
 *     Prices
 *     after
 *     discount.
 */
export const renderDiscountPrices = (data = {}) => {
  let is_range = data?.is_price_range;
  let price = data?.price;

  const discount_number = (price?.min?.length > 0 && price?.max?.length > 0)  ? Math.abs(
    price?.min?.price?.original - price?.min?.price?.discount,
  ) : Math.abs(price?.price?.original - price?.price?.discount);

  const discount_percent = Math.ceil(
    (discount_number /( (price?.min?.length > 0 && price?.max?.length > 0) ? price?.min?.price?.original : price?.price?.original)) * 100,
  );

  if (is_range) {
    let are_range_prices_equal = getArePricesEqual(price);

    if (are_range_prices_equal) {
      return (
        <div className="flex flex-row items-center">
          <div
            className={`relative -ml-[44px] mt-3 w-fit font-bold text-white`}
          >
            <SvgButtonTwo className="mx-auto h-[62px] w-fit" />
            <div className="buttonText">
              {currencyFormat(price?.min?.price?.discount)}
            </div>
          </div>
          <div className={`group relative -ml-[40px] mt-2 line-through`}>
            {currencyFormat(price?.min?.price?.original)}
          </div>
          {data?.is_details && (
            <div className="ml-3 mt-2 bg-primary rounded-lg px-5 py-[3px] text-white">
              -{discount_percent}%
            </div>
          )}
        </div>
      );
    }
  } else {
    return (
      <div className="flex flex-row items-center">
        <div className={`relative -ml-[44px] mt-3 w-fit font-bold text-white`}>
          <SvgButtonTwo className="mx-auto h-[62px] w-fit" />
          <div className="buttonText">
            {currencyFormat(price?.price?.discount)}
          </div>
        </div>
        <div className={`group relative -ml-[40px] mt-2 line-through`}>
          {currencyFormat(price?.price?.original)}
        </div>
        {data?.is_details && (
            <div className="ml-3 mt-2 rounded-lg bg-primary px-5 py-[3px] text-white">
              -{discount_percent}%
            </div>
          )}
      </div>
    );
  }
};
