import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import img1 from "../assets/images/hero/DSC01272-desktop_2ff158f5-896e-48a7-84b2-47ceef25585c.webp";
import img2 from "../assets/images/hero/IMG_9101.webp";
import img3 from "../assets/images/hero/DSC07986-copy-banner.webp";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
const Hero = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      effect={"fade"}
    >
      <SwiperSlide>
        <img src={img1} alt="img" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2} alt="img" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3} alt="img" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Hero;
