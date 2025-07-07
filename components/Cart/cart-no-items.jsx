import Link from "next/link";
import SvgButtonOne from "../svg/Paths/SvgButtonOne";

export const CartNoItems = () => {
  return (
    <div className="sectionPaddingY sectionPaddingX flex items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-3xl border border-primary p-10 text-center shadow-lg">
        <div className="text-center">
          <span className="text-2xl font-medium">Vaša korpa</span>
        </div>
        <div className="mt-6 text-center text-lg font-medium">
          Trenutno ne postoji sadržaj u Vašoj korpi.
        </div>
        <div className="mt-10">
          <Link href="/" className="relative w-full max-w-[350px]">
            <SvgButtonOne className="h-[62px] w-full max-sm:h-[52px]" />
            <div className="buttonText !left-0 !w-[300px] !px-0 max-sm:!text-sm">
              Vrati se na početnu stranu
            </div>
          </Link>
        </div>
        <div className="help-container mt-10 text-center">
          <p className="font-medium">Pomoć pri kupovini:</p>
          <ul className="mt-2">
            <li>
              - Ukoliko Vam je potrebna pomoć u svakom trenutku nas možete
              kontaktirati pozivom na broj{" "}
              <a href={`tel:${process.env.TELEPHONE}`}>
                {process.env.TELEPHONE}
              </a>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
