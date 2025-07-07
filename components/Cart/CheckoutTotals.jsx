import { currencyFormat } from "@/helpers/functions";

const CheckoutTotals = ({ summary }) => {
  return (
    <div className="mt-3">
      <h2 className="text-xl">Vrednost Vaše korpe</h2>
      {/* <div className={`mainInputWrapper w-full !p-1`}> */}
      {/* <div className="mainInput w-full !bg-white !px-10 !py-14"> */}
      <div className="w-full p-5">
        <div className={`flex flex-col`}>
          <div className={`flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <div className={`h-1 w-5 rounded-sm bg-primary`}></div>
              <p className="text-gray-400">Ukupna vrednost korpe:</p>
            </div>
            <p className="w-[150px] text-gray-400">
              {currencyFormat(summary?.totals?.with_vat)}
            </p>
          </div>
          <div className={`flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <div className={`h-1 w-5 rounded-sm bg-primary`}></div>
              <p className="text-gray-400">Popust:</p>
            </div>
            <p className="w-[150px] text-gray-400">
              {summary?.totals?.items_discount_amount +
                summary?.totals?.cart_discount_amount >
                0 && <span>-</span>}
              {currencyFormat(
                summary?.totals?.items_discount_amount +
                  summary?.totals?.cart_discount_amount,
              )}
            </p>
          </div>
          {summary?.totals?.promo_code_amount > 0 && (
            <div
              className={`flex items-center justify-between border-t border-t-white py-2`}
            >
              <div className="flex items-center gap-2">
                <div className={`h-1 w-5 rounded-sm bg-primary`}></div>
                <p className="text-gray-400">Iznos promo koda:</p>
              </div>
              <p className="w-[150px] text-gray-400">
                -{currencyFormat(summary?.totals?.promo_code_amount)}
              </p>
            </div>
          )}
          <div className={`flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <div className={`h-1 w-5 rounded-sm bg-primary`}></div>
              <p className="text-gray-400">Dostava:</p>
            </div>
            <p className="w-[150px] text-gray-400">
              {/* Checkout if the delivery is free */}
              {summary?.totals?.cart_discount >
              summary?.options?.delivery?.free_delivery?.amount ? (
                <span>Besplatna dostava</span>
              ) : (
                <span>{currencyFormat(summary?.totals?.delivery_amount)}</span>
              )}
            </p>
          </div>
          <div className={`flex items-center justify-between pl-7`}>
            <p>Ukupno za naplatu:</p>
            <p className="w-[150px]">
              {currencyFormat(summary?.totals?.total)}
            </p>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default CheckoutTotals;
