import SvgWithImage from "@/components/svg/Paths/SvgWithImage";

const Locations = () => {
  return (
    <section
      data-aos="fade-up"
      className="flex text-center max-md:flex-col lg:mb-20"
    >
      <div className="flex flex-1 flex-col items-center gap-5 bg-primary px-10 py-14 text-white">
        <div className="w-full max-w-[520px]">
          <SvgWithImage image="/images/museum.png" alt="museum" />
        </div>
        <div className="fontForum text-3xl xl:text-4xl">Prirodnjački muzej</div>
        <div className="flex flex-col items-center">
          <p>Njegoševa 51 11111 Beograd, Srbija</p>
          <p className="notranslate">nhmbeo@nhmbeo.rs</p>
          <p>+381 11 344 21 49</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-5 bg-secondary px-10 py-14 text-primary">
        <div className="w-full max-w-[520px]">
          <SvgWithImage image="/images/museum2.jpg" alt="museum" />
        </div>
        <div className="fontForum text-3xl xl:text-4xl">
          Galerija Prirodnjačkog muzeja
        </div>
        <div className="flex flex-col items-center">
          <p>Mali Kalemegdan 5 11108 Beograd, Srbija</p>
          <p className="notranslate">nhmbeo@nhmbeo.rs</p>
        </div>
      </div>
    </section>
  );
};

export default Locations;
