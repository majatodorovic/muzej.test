"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { Autoplay } from "swiper/modules";
import Aos from "aos";

function extractYoutubeId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regex);
  return match ? match[1] : null;
}

const RenderBanner = ({ banner }) => {
  switch (banner.type) {
    case "image": {
      return (
        <Image
          src={banner?.image ?? "/"}
          alt={banner?.title ?? "Alt"}
          width={0}
          height={0}
          sizes={`100vw`}
          className="clipPathSlider h-[600px] w-full object-cover"
          priority
        />
      );
    }
    case "video_link": {
      const videoProvider = banner.video_provider;
      const videoUrl = banner.video_url;

      const src =
        videoProvider === "youtube"
          ? `https://www.youtube.com/embed/${extractYoutubeId(
              videoUrl,
            )}?autoplay=1&mute=1&loop=1&playsinline=1&controls=0&playlist=${extractYoutubeId(
              videoUrl,
            )}`
          : `${videoUrl}?autoplay=1&muted=1&loop=1&background=1&playsinline=1}`;

      return (
        <iframe
          className="pointer-events-none aspect-[960/1550] h-full w-full object-cover md:aspect-[1920/800]"
          width={banner.width}
          height={banner.height}
          src={src}
          style={{ border: "none" }}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }
    case "video": {
      return (
        <>
          <video
            key={banner?.file}
            width={banner?.file_data?.banner_position?.width}
            height={banner?.file_data?.banner_position?.height}
            className="h-full w-full bg-fixed object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source src={convertHttpToHttps(banner?.file)} type="video/mp4" />
            <source
              src={convertHttpToHttps(banner?.file.replace(".mp4", ".webm"))}
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </>
      );
    }
    default:
      break;
  }
};

const RenderSlider = ({ banners }) => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    swiperRef.current?.swiper.slideTo(index);
  };

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="relative h-auto">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop={banners.length > 1}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        className="h-[950px] overflow-hidden"
      >
        {banners?.map((banner, index) => (
          <SwiperSlide key={index} className="relative h-full !bg-secondary">
            <RenderBanner banner={banner} />
            <Link
              href={banner?.url ?? "/"}
              target={banner?.target ?? "_self"}
              className="absolute left-0 top-0 z-[49] h-full w-full transition-all duration-500"
            >
              <div className="sectionPaddingX absolute bottom-[50px] left-0 flex w-full items-center justify-between gap-6 text-left max-md:flex-col max-md:items-start lg:bottom-[90px]">
                {banner?.title && (
                  <div className="flex items-stretch gap-2 xl:gap-3">
                    <h1
                      className="fontSpectral text-4xl leading-tight text-black lg:text-5xl xl:text-7xl 3xl:text-8xl"
                      dangerouslySetInnerHTML={{ __html: banner?.title }}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  {banner?.subtitle && (
                    <div
                      className="text-medium text-lg text-black xl:text-3xl"
                      dangerouslySetInnerHTML={{ __html: banner?.subtitle }}
                    />
                  )}
                  {banner?.text && (
                    <p
                      className="text-lg font-light text-black xl:text-xl"
                      dangerouslySetInnerHTML={{ __html: banner?.text }}
                    ></p>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {banners.length > 1 && (
        <div className="absolute right-12 top-[520px] z-50 flex gap-4 max-md:hidden 3xl:top-[500px]">
          <button
            onClick={() =>
              handleSlideChange(
                currentSlide === 0 ? banners.length - 1 : currentSlide - 1,
              )
            }
            className="clipPathLeftArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white 3xl:h-[120px] 3xl:w-[120px]"
          >
            <Image
              src="/icons/arrow.svg"
              alt="Previous"
              width={60}
              height={60}
              className="h-[40px] w-[40px] rotate-180 3xl:h-[60px] 3xl:w-[60px]"
            />
          </button>
          <button
            onClick={() =>
              handleSlideChange(
                currentSlide === banners.length - 1 ? 0 : currentSlide + 1,
              )
            }
            className="clipPathRightArrow flex h-20 w-20 items-center justify-center bg-lightGreen text-lg font-semibold text-white 3xl:h-[120px] 3xl:w-[120px]"
          >
            <Image
              src="/icons/arrow.svg"
              alt="Next "
              width={60}
              height={60}
              className="h-[40px] w-[40px] 3xl:h-[60px] 3xl:w-[60px]"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default RenderSlider;
