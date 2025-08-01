"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const Nova2 = () => {
  const searchParams = useSearchParams();
  const ticketsId = searchParams.get("tickets");
  const sectionRef = useRef(null);

  useEffect(() => {
    if (ticketsId === "true" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ticketsId]);

  return (
    <div ref={sectionRef} className="text-primary" id="tickets">
      <div className="grid grid-cols-6 gap-10 xl:gap-14">
        {/* POJEDINAČNE POSETE */}
        <div className="col-span-6 lg:col-span-3 xl:col-span-2">
          <h2 className="mb-8 text-2xl font-medium uppercase">
            Pojedinačne posete
          </h2>
          <ul className="space-y-4 font-semibold">
            <li className="flex items-start justify-between gap-2">
              <div>Odrasli</div> <div className="min-w-[65px]">300 RSD</div>
            </li>
            <li className="flex items-start justify-between gap-2">
              <div>
                Deca{" "}
                <span className="font-normal italic">
                  (starija od 8 godina)
                </span>
              </div>{" "}
              <div className="min-w-[65px]">200 RSD</div>
            </li>
            <li className="flex items-start justify-between gap-2">
              <div>
                Porodična karta{" "}
                <span className="font-normal italic">(roditelji sa decom)</span>
              </div>{" "}
              <div className="min-w-[65px]">350 RSD</div>
            </li>
            <li className="flex items-start justify-between gap-2">
              <div>Penzioneri</div> <div className="min-w-[65px]">100 RSD</div>
            </li>
          </ul>

          <h2 className="my-10 text-2xl font-semibold uppercase">
            Prateći program uz aktuelnu izložbu
          </h2>
          <ul className="space-y-4 font-semibold">
            <li className="flex items-start justify-between gap-2">
              <div>
                Radionice za decu{" "}
                <span className="font-normal italic">(do 4. razreda OŠ)</span>
              </div>{" "}
              <div className="min-w-[65px]">400 RSD</div>
            </li>
            <li className="flex items-start justify-between gap-2">
              <div>
                Radionice za decu{" "}
                <span className="font-normal italic">(5–8 razreda OŠ)</span>
              </div>{" "}
              <div className="min-w-[65px]">600 RSD</div>
            </li>
          </ul>

          <h2 className="my-10 text-2xl font-semibold uppercase">
            Proslava rođendana
          </h2>
          <ul className="space-y-4 font-semibold">
            <li className="flex items-start justify-between gap-2">
              <div>Osnovni paket</div>{" "}
              <div className="min-w-[65px]">14.000 RSD</div>
            </li>
          </ul>
        </div>

        {/* GRUPNE POSETE */}
        <div className="col-span-6 lg:col-span-3 xl:col-span-4">
          <h2 className="text-2xl font-semibold uppercase">Grupne posete</h2>
          <p className="mb-2 text-sm">
            Grupna poseta podrazumeva posetu od najmanje 10 osoba
          </p>
          <div className="flex w-full flex-col gap-10">
            <div className="flex w-full flex-col gap-14 xl:flex-row">
              <div className="flex-1">
                <ul className="space-y-4 font-semibold">
                  <li className="flex items-start justify-between gap-2">
                    <div>Odrasli </div>
                    <div className="min-w-[65px]">250 RSD</div>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <div>Predškolska ustanova </div>
                    <div className="min-w-[65px]">150 RSD</div>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <div>Osnovna škola </div>
                    <div className="min-w-[65px]">200 RSD</div>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <div>Srednja škola </div>
                    <div className="min-w-[65px]">200 RSD</div>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <div>Fakulteti </div>
                    <div className="min-w-[65px]">200 RSD</div>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <div>Penzioneri </div>
                    <div className="min-w-[65px]">150 RSD</div>
                  </li>
                </ul>
                <div className="mt-3 text-sm font-normal italic">
                  Cena pojedinačne ulaznice{" "}
                  <span className="font-semibold">SA</span> kustoskim vođenjem
                </div>
              </div>
              <div className="flex-1">
                <ul className="space-y-4 font-semibold">
                  <li className="flex items-start justify-between gap-2">
                    <div>Odrasli </div>
                    <div className="min-w-[65px]">200 RSD</div>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <div>Predškolska ustanova </div>
                    <div className="min-w-[65px]">100 RSD</div>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <div>Osnovna škola </div>
                    <div className="min-w-[65px]">150 RSD</div>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <div>Srednja škola </div>
                    <div className="min-w-[65px]">150 RSD</div>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <div>Fakulteti </div>
                    <div className="min-w-[65px]">150 RSD</div>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <div>Penzioneri </div>
                    <div className="min-w-[65px]">100 RSD</div>
                  </li>
                </ul>
                <div className="mt-3 text-sm font-normal italic">
                  Cena pojedinačne ulaznice{" "}
                  <span className="font-semibold">BEZ</span> kustoskog vođenja
                </div>
              </div>
            </div>
          </div>
          <div className="mt-14 w-full xl:w-1/2">
            <ul className="flex w-full space-y-4 font-semibold">
              <li className="flex w-full items-start justify-between gap-2">
                <div>Za sve grupe</div> <div>800 dinara</div>
              </li>
            </ul>
            <div className="mt-3 text-sm font-normal italic">
              Cena pojedinačne ulaznice{" "}
              <span className="font-semibold">SA</span> kustoskim vođenjem
            </div>
          </div>
          <div className="mt-14 w-full xl:w-1/2">
            <ul className="flex space-y-4 font-semibold">
              <li className="flex w-full items-start justify-between gap-2">
                <div>Za sve grupe</div> <div>800 dinara</div>
              </li>
            </ul>
            <div className="mt-3 text-sm font-normal italic">
              Cena pojedinačne ulaznice{" "}
              <span className="font-semibold">SA</span> kustoskim vođenjem na
              ENGLESKOM JEZIKU
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <h2 className="mb-8 text-2xl font-medium uppercase">
          Pravo na BESPLATNU posetu imaju:
        </h2>
        <div className="flex gap-10 max-md:flex-col xl:gap-20">
          <ul className="space-y-4 font-medium">
            <li>Deca do 8 godina starosti</li>
            <li>Studenti uz prikazan dokument</li>
            <li>Kolege iz drugih muzeja</li>
            <li>
              Članovi Muzejskog društva Srbije{" "}
              <span className="font-normal italic">(uz člansku kartu)</span>
            </li>
          </ul>
          <ul className="space-y-4 font-medium">
            <li>
              Članovi ICOM-a{" "}
              <span className="font-normal italic">(uz člansku kartu)</span>
            </li>
            <li>
              Članovi ULUPUDS-a i ULUS-a{" "}
              <span className="font-normal italic">(uz člansku kartu)</span>
            </li>
            <li>
              Novinari{" "}
              <span className="font-normal italic">(uz legitimaciju)</span>
            </li>
            <li>Osobe sa invaliditetom sa pratiocem</li>
            <li>Četvrtkom u periodu od 10–12 je slobodan ulaz za sve</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nova2;
