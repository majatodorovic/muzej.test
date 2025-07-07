import RenderSlider from "./RenderSlider";

const Slider = ({ banners }) => {
  return (
    <div className="line2" data-aos="fade-up">
      <div className={``}>{banners && <RenderSlider banners={banners} />}</div>
    </div>
  );
};

export default Slider;
