import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/pagination";

import "./Swiper.scss";

const SwiperComponent = ({ items = [] }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  if (!items.length) return <p>{t("swiperComponent.no_products_found")}</p>;

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={24}
      loop={items.length > 4}
      pagination={{ clickable: true }}
      breakpoints={{
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      modules={[Pagination]}
      className="product-swiper"
    >
      {items.map((item) => (
        <SwiperSlide key={item._id}>
          <div className="product-swiper__item">
            <div className="product-swiper__card">
              <img
                className="product-swiper__card__image"
                src={
                  item.image ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={item.title}
              />
              <div className="product-swiper__card__info">
                <p className="product-swiper__card__name">{item.title}</p>
                <p className="product-swiper__card__price">
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="product-swiper__overlay">
              <Link
                className="product-swiper__overlay-link"
                to={`/products/${item._id}`}
              >
                {t("swiperComponent.details")}
              </Link>
              <button
                className="product-swiper__overlay__add"
                onClick={() => handleAddToCart(item)}
              >
                {t("swiperComponent.add_to_cart")}
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
      {showNotification && (
        <div className="product-swiper__notification">
          <div className="notification-content">
            {t("swiperComponent.added_to_cart")}
          </div>
        </div>
      )}
    </Swiper>
  );
};

export default SwiperComponent;
