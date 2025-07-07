"use client";

import {
  useAddPromoCode,
  usePromoCodeOptions,
  usePromoCodesList,
  useRemovePromoCode,
} from "@/hooks/ecommerce.hooks";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import SvgInput from "../svg/Paths/SvgInput";
import SvgButtonOne from "../svg/Paths/SvgButtonOne";

const BUTTON_STATES = {
  APPLY: "Primeni",
  ACTIVATE: "Aktiviraj kupon",
  REMOVE: "Ukloni",
};

export const PromoCode = () => {
  const queryClient = useQueryClient();

  const [promoCode, setPromoCode] = useState("");
  const [buttonText, setButtonText] = useState(BUTTON_STATES.APPLY);

  const {
    mutate: activatePromoCode,
    isPending,
    data,
    isSuccess: is_activated,
  } = useAddPromoCode();

  const { mutate: deletePromoCode, isSuccess: is_deleted } =
    useRemovePromoCode();
  const { data: opt } = usePromoCodeOptions();
  const { data: codes_list, refetch: refetchList } = usePromoCodesList();

  const handleAddPromoCode = (promo_code, number_of_codes) => {
    if (number_of_codes > 1) {
      activatePromoCode({ promo_codes: [promo_code] });
      setPromoCode("");
      setButtonText(BUTTON_STATES.APPLY);
    } else {
      activatePromoCode({ promo_codes: [promo_code] });
    }
  };

  const handleDeletePromoCode = (id_promo_code) => {
    if (id_promo_code) {
      deletePromoCode({ id_promo_code: id_promo_code });
      setPromoCode("");
      setButtonText(BUTTON_STATES.APPLY);
    }
    return null;
  };

  const handlePromoCode = (action) => {
    if (action === "add") {
      return handleAddPromoCode(promoCode, opt?.number_of_promo_codes);
    }

    if (action === "remove") {
      return handleDeletePromoCode(codes_list?.[0]?.id_promo_code);
    }
  };

  useEffect(() => {
    refetchList();
    queryClient?.invalidateQueries({ queryKey: ["summary"] });
  }, [is_deleted, is_activated]);

  useEffect(() => {
    if (!data?.success) {
      setButtonText(BUTTON_STATES.ACTIVATE);
    }

    if (data?.success && opt?.number_of_promo_codes === 1) {
      setButtonText(BUTTON_STATES.REMOVE);
    }
  }, [data]);

  useEffect(() => {
    if (codes_list?.length === 1 && opt?.number_of_promo_codes === 1) {
      setButtonText(BUTTON_STATES.REMOVE);
      setPromoCode(codes_list?.[0]?.code);
    } else {
      if (opt?.number_of_promo_codes > 1) {
        setButtonText(BUTTON_STATES.ACTIVATE);
        setPromoCode("");
      }
    }
  }, [codes_list, opt?.number_of_promo_codes]);

  if (opt?.active) {
    return (
      <div className="flex w-full flex-col">
        <h2 className="text-xl">Kupon</h2>
        <div className="relative mt-4 w-full">
          <SvgInput fill="#fff" />
          <input
            placeholder={`Ovde unesite kupon`}
            disabled={
              opt?.number_of_promo_codes === 1 && codes_list?.length === 1
            }
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            type={`text`}
            className="mainInput2"
          />
        </div>

        <button
          disabled={isPending || promoCode?.length === 0}
          onClick={() => {
            if (opt?.number_of_promo_codes === 1 && codes_list?.length === 1) {
              handlePromoCode("remove");
            } else {
              handlePromoCode("add");
            }
          }}
          className={`relative ml-auto mt-6`}
        >
          <SvgButtonOne className="mx-auto h-[52px] w-[250px]" fill="#fff" />
          <div className="buttonText w-[250px] !text-primary">
            <span>{buttonText}</span>
          </div>
        </button>
      </div>
    );
  }
};
