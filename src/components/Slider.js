import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
// import "./Slider.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = ({ data }) => {
  return (
    <div className="slider_container">
      <div className="elipse" id="upper_elipse"></div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          // dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* <SwiperSlide>
          <div className="slide w-[850px] h-[520px]">dcsvwdvwv</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide w-[850px] h-[520px]">dcsvwdvwv</div>
        </SwiperSlide> */}
        {data
          ? data.map((cid) => {
              return (
                <SwiperSlide key={cid}>
                  <div className="slide w-[850px] h-[520px]">
                    <img
                      src={`https://gateway.lighthouse.storage/ipfs/${cid}`}
                      alt="images"
                      // src={`https://gateway.lighthouse.storage/ipfs/QmZrnjf1iZFY3WnVpJhva3hm9Fa7p2JtekQCrLazS75BSJ`}
                      className="h-[100%]"
                    ></img>
                  </div>
                </SwiperSlide>
              );
            })
          : ""}
      </Swiper>

      <div className="elipse" id="lower_elipse"></div>
    </div>
  );
};

export default Slider;
