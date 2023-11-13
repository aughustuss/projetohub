import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
interface SlideProps {
    children: React.ReactNode;
    slideWidth?: string;
}
const Slide = ({ children }: SlideProps) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        autoplay
        freeMode
        modules={[Navigation, Pagination, EffectCoverflow]}
        className={`w-full bg-transparent rounded-lg bg-none`}
        grabCursor
        centeredSlides
        effect={'coverflow'}
      >
        {children}
      </Swiper>
    </>
  );
};

export default Slide;
