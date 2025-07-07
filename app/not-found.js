"use client";
import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";
import Image from "next/image";
import Link from "next/link";

export const metadata = () => {
  return {
    title: "404 | Prirodnjački muzej",
    description: "Dobrodošli na Prirodnjački muzej",
    
  };
};

const notFound = () => {
  return (
    <div className="sectionPaddingY sectionPaddingX flex items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-3xl border border-primary p-10 text-center shadow-lg">
        <Image src={"/icons/404.png"} alt="404" width={100} height={100} />
        <h1 className="font-bold text-[18px] mt-10">
          Stranica koju tražite ne postoji ili je premeštena.
        </h1>
        <h2 className="font-normal text-[15px] mt-3">
          Proverite da li ste uneli ispravan URL.
        </h2>
        <div className="mt-10">
          <Link href="/" className="relative w-full max-w-[350px]">
            <SvgButtonOne className="h-[62px] w-full max-sm:h-[52px]" />
            <div className="buttonText !left-0 !w-[300px] !px-0 max-sm:!text-sm">
              Vrati se na početnu stranu
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default notFound;
