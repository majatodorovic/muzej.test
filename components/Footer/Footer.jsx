"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const Footer = () => {
  return (
    <div className="flex flex-col bg-primary text-white lg:flex-row">
      <div className="sectionPaddingX flex-1 py-14">
        <div className="mb-10 flex items-end gap-10 border-b border-white pb-8 text-lg 3xl:text-xl">
          <div className="w-1/2">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo/logo.gif"
                width={170}
                height={95}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex w-1/2 flex-col gap-6 xl:flex-row">
            <div className="flex-1">
              <div className="font-light">Lokacija 1</div>
              <Link href="/kontakt">
                <span className="border-b border-white pb-1">Kancelarije</span>
              </Link>
            </div>
            <div className="flex-1">
              <div className="font-light">Lokacija 2</div>
              <Link href="/kontakt">
                <span className="border-b border-white pb-1">Galerija</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 text-lg xl:grid-cols-2 3xl:text-xl">
          <div>
            <div className="mb-8 text-xl 3xl:text-2xl">O Nama</div>
            <div className="flex flex-col gap-1 font-light">
              <Link href="/o-nama/organizaciona-struktura">
                Organizacija
              </Link>
              <Link href="/o-nama/godisnjak-prirodnjackog-muzeja">
                Godišnjak Prirodnjačkog Muzeja
              </Link>
              <Link href="/o-nama/javno-poslovanje/javne-nabavke">
                Javno Poslovanje
              </Link>
            </div>
          </div>
          <div>
            <div className="mb-8 text-xl 3xl:text-2xl">Istražite</div>
            <div className="flex flex-col gap-1 font-light">
              <Link href="/istrazite/centar-za-markiranje-zivotinja">
                Centar za Markiranje Životinja
              </Link>
              <Link
                href="/istrazite/bulletin-of-the-natural-history-museum-in-belgrade"
                className="notranslate"
              >
                Bulletin of Natural History Museum
              </Link>
              <Link href="/istrazite/glasnik-prirodnjackog-muzeja">
                Glasnik Prirodnjačkog Muzeja
              </Link>
              <Link href="/istrazite/posebna-izdanja-prirodnjackog-muzeja">
                Posebna Izdanja Prirodnjačkog Muzeja
              </Link>
            </div>
          </div>
          <div>
            <div className="mb-8 text-xl 3xl:text-2xl">Posetite nas</div>
            <div className="flex flex-col gap-1 font-light">
              <Link href="/posetite-nas/galerija-prirodnjackog-muzeja">
                Galerija Prirodnjačkog Muzeja
              </Link>
              <Link href="/posetite-nas/izlozba-u-galeriji">
                Izložba u Galeriji
              </Link>
            </div>
          </div>
          <div>
            <div className="mb-8 text-xl 3xl:text-2xl">Kontakt</div>
            <div className="flex flex-col gap-1 font-light">
              <a href="tel:+381 11 3442147">+381 11 3442147</a>
              <a href="mailto:nhmbeo@nhmbeo.rs" className="notranslate">
                nhmbeo@nhmbeo.rs
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Map />
      </div>
    </div>
  );
};

export default Footer;
