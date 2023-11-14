import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import React from "react";
interface SlideProps {
  children: React.ReactNode;
  slideWidth?: string;
}
const Slide = ({ children }: SlideProps) => {
  const prevRef = React.useRef(null);
  const nextRef = React.useRef(null);
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
        effect={"coverflow"}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
      >
        {children}
        <div
          className="absolute left-0 top-[40%] cursor-pointer z-10 p-[2px] bg-primaryBg opacity-80 rounded-lg text-white font-semibold"
          ref={prevRef}
        >
          <MdKeyboardArrowLeft size={30} />
        </div>
        <div
          className="absolute right-0 top-[40%] z-10 cursor-pointer p-[2px] bg-primaryBg opacity-80 rounded-lg text-white "
          ref={nextRef}
        >
          <MdKeyboardArrowRight size={30} />
        </div>
      </Swiper>
    </>
  );
};

export default Slide;
