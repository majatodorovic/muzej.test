import React from "react";
import SearchProducts from "./SearchProducts";
import Translate from "../Translate/Translate";

function HeaderTop() {
  return (
    <div className="sectionPaddingX flex h-[74px] w-full items-center justify-between bg-primary">
      <div className="text-lg text-white 3xl:text-xl">
        Utorak - Nedelja: 10:00 - 21:00
      </div>
      <div className="flex items-center">
        <SearchProducts />
        <div>
          <Translate />
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
