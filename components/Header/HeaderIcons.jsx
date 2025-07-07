"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartBadge } from "@/hooks/ecommerce.hooks";

const HeaderIcons = () => {
  const { data: cartCount } = useCartBadge();

  return (
    <Link href="/korpa" className="relative">
      <Image
        src="/icons/trolley.svg"
        width={21}
        height={21}
        className="h-7 w-7 object-cover"
        alt="shopping-bag"
      />
      <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
        {cartCount}
      </span>
    </Link>
  );
};

export default HeaderIcons;
