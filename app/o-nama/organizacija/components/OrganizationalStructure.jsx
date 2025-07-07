"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import WorldBanner from "./WorldBanner";
import {
  useWorkingUnitsTree,
  useEmployeesByUnit,
} from "@/hooks/ecommerce.hooks";
import Image from "next/image";
import SvgButtonThree from "@/components/svg/Paths/SvgButtonThree";

// const getInitials = (fullName) => {
//   if (!fullName) return "";
//   const parts = fullName.trim().split(" ");
//   return parts.length >= 2
//     ? parts[0][0].toUpperCase() + "." + parts[1][0].toUpperCase()
//     : parts[0][0].toUpperCase();
// };

const OrganizationalStructure = ({ banners }) => {
  // Fetch all working units
  const { data: workingUnits, isLoading: isLoadingUnits } =
    useWorkingUnitsTree();

  if (isLoadingUnits) {
    return <div className="sectionPaddingB">Loading...</div>;
  }

  return (
    <div data-aos="fade-up" className="sectionPaddingB">
      {workingUnits?.map((unit) => {
        const prevRef = useRef(null);
        const nextRef = useRef(null);
        // Fetch employees for this specific unit
        const { data: employees, isLoading: isLoadingEmployees } =
          useEmployeesByUnit(unit.id);

        return (
          <div key={unit.id} className="mb-28">
            <div className="sectionPaddingX items-left flex w-full justify-start sm:justify-between">
              <h2 className="fontForum titleH2 !text-left">{unit.name}</h2>
            </div>
            <div className="sectionPaddingX relative mt-[100px] 3xl:mt-[140px]">
              {employees?.items?.length > 0 && (
                <div className="absolute -top-[86px] right-3 z-50 flex gap-4 lg:right-5 xl:right-20 2xl:right-[120px] 3xl:-top-[120px]">
                  <button
                    ref={prevRef}
                    className="clipPathLeftArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white 3xl:h-[120px] 3xl:w-[120px]"
                  >
                    <Image
                      src="/icons/arrow.svg"
                      alt="arrow"
                      width={40}
                      height={40}
                      className="h-[40px] w-[40px] rotate-180 3xl:h-[60px] 3xl:w-[60px]"
                    />
                  </button>
                  <button
                    ref={nextRef}
                    className="clipPathRightArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white 3xl:h-[120px] 3xl:w-[120px]"
                  >
                    <Image
                      src="/icons/arrow.svg"
                      alt="arrow"
                      width={40}
                      height={40}
                      className="h-[40px] w-[40px] 3xl:h-[60px] 3xl:w-[60px]"
                    />
                  </button>
                </div>
              )}

              {isLoadingEmployees ? (
                <div className="text-center">Loading employees...</div>
              ) : employees?.items?.length > 0 ? (
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={10}
                  loop={employees?.items?.length > 1}
                  slidesPerView={3}
                  onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1360: { slidesPerView: 4 },
                    1620: { slidesPerView: 5 },
                  }}
                >
                  {employees?.items?.map((employee, employeeIndex) => {
                    return (
                      <SwiperSlide key={employee.id || employeeIndex}>
                        <div className="relative">
                          <Image
                            alt={employee.first_name + " " + employee.last_name}
                            src="/icons/user.png"
                            width={80}
                            height={80}
                            className="buttonText transform invert"
                          />
                          <SvgButtonThree />
                        </div>
                        <div className="mt-4 text-center text-black">
                          <div className="text-lg">
                            <span>{employee?.title}</span>{" "}
                            {employee.first_name + " " + employee.last_name}
                          </div>
                          <div className="text-sm">
                            {employee.working_position}
                          </div>
                          {employee.email && (
                            <div className="notranslate text-sm text-primary">
                              {employee.email}
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <div className="text-center text-gray-500">
                  No employees found
                </div>
              )}
            </div>

            {unit.id === 3 && (
              <div className="mt-28">
                <WorldBanner banners={banners} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrganizationalStructure;
