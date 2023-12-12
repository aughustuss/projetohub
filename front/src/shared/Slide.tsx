import { Swiper, SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import React from "react";
import { SwiperModule } from "swiper/types";
import { EffectCoverflow } from "swiper/modules";
interface SlideProps {
  children: React.ReactNode | React.ReactElement;
  stretch?: boolean;
  modules: SwiperModule[];
  movies?: boolean;
  scrollBar: boolean;
  hasDarkBg?: boolean;
}
const Slide = ({
  children,
  modules,
  movies,
  scrollBar,
  stretch,
  hasDarkBg
}: SlideProps) => {
  const prevRef = React.useRef(null);
  const nextRef = React.useRef(null);

  const [isSlideActive, setIsSlideActive] = React.useState(true);
  const onSlideChangeStart = () => setIsSlideActive(false);

  const onSlideChangeEnd = (swiper: SwiperClass) => {
    if (swiper.realIndex === 0) {
      setIsSlideActive(true);
    }
  };
  return (
    <>
      <Swiper
        autoplay
        onSlideChangeTransitionEnd={onSlideChangeEnd}
        onSlideChangeTransitionStart={onSlideChangeStart}
        freeMode
        modules={modules}
        className="w-full rounded-lg bg-transparent relative"
        scrollbar={scrollBar}
        grabCursor
        effect={"coverflow"}
        breakpoints={
          !modules.includes(EffectCoverflow)
            ? {
                0: {
                  slidesPerView: movies ? 1.2 : 2,
                  spaceBetween: 10,
                },
                512: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                648: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                768: {
                  slidesPerView: stretch ? 2 : 3,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: stretch ? 3 : 4,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: stretch ? 4 : 5,
                  spaceBetween: stretch ? 20 : 30,
                },
              }
            : {}
        }
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
      >
        {children}
        <div
          className="absolute left-0 top-[40%] cursor-pointer z-20 p-[2px] bg-primaryBg opacity-80 rounded-lg text-white font-semibold"
          ref={prevRef}
        >
          <MdKeyboardArrowLeft size={30} />
        </div>
        <div
          className="absolute right-0 top-[40%] z-20 cursor-pointer p-[2px] bg-primaryBg opacity-80 rounded-lg text-white "
          ref={nextRef}
        >
          <MdKeyboardArrowRight size={30} />
        </div>
        {isSlideActive && (
          <div className={`absolute bottom-0 z-10 right-0 w-[60px] md:w-[100px] h-full bg-gradient-to-r from-transparent  ${hasDarkBg ? "to-primaryBgBorder" : "to-primaryBg"}`} ></div>
        )}
      </Swiper>
    </>
  );
};

export default Slide;
