import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";

import "./Swiper.scss";

const SwiperComponent = ({ items }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={24}
      loop={true}
      navigation={false}
      pagination={{ clickable: true }}
      breakpoints={{
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      modules={[Pagination, Navigation]}
      className="product-swiper"
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="product-swiper__card">
            <div className="product-swiper__card__image" />
            <div className="product-swiper__card__info">
              <p className="product-swiper__card__name">{item.name}</p>
              <p className="product-swiper__card__price">{item.price}</p>
            </div>
            <button className="product-swiper__card__button">
              Add to Cart
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
