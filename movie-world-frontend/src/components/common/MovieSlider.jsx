import React, { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Autoplay, Navigation, Pagination } from "swiper/modules";
import MovieCard from "./MovieCard";
export { SliderTypes, InnerClickType } from "./MovieCard";

const MovieSlider = ({
  data = [],
  navigation = false,
  type,
  onClickInnerSlide = () => null,
}) => {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(null);
  const sliders = useMemo(
    () =>
      data.map((item) => (
        <MovieCard
          movie={item}
          type={type}
          onClickInnerSlide={onClickInnerSlide}
        ></MovieCard>
      )),
    [data.length]
  );

  const handleSliderClick = (swiper) => {
    setSelectedSlideIndex(swiper.clickedIndex);
  };

  const modules = [Autoplay, Keyboard, Pagination];
  if (navigation) modules.push(Navigation);

  return (
    <div className="">
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        modules={modules}
        navigation={navigation}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        onClick={handleSliderClick}
      >
        {sliders.map((slide, index) => (
          <SwiperSlide
            className={`transition-transform duration-300 ${
              selectedSlideIndex === index
                ? "transform scale-125 border-2 rounded-md border-blue-600"
                : ""
            }`}
            key={index}
          >
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
