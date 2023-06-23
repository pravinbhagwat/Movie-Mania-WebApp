import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";

import Card from "../../UI/Card";
import FavoriteButton from "../../UI/FavoriteButton";
import RenderIf from "../RenderIf";
import { POSTER_NOT_FOUND, POSTER_URL } from "../../utils/constants";

const breakpoints = {
  640: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 4,
  },
  1024: {
    slidesPerView: 5,
  },
  1440: {
    slidesPerView: 6,
  },
  1700: {
    slidesPerView: 7,
  },
};

const Carousel = ({ title = "", data = [] }) => {
  return (
    <div className="px-5">
      <RenderIf isTrue={!!title}>
        <div className="ml-3 mb-5">
          <div className="text-2xl font-[500] max-md:text-xl">{title}</div>
        </div>
      </RenderIf>
      <Swiper
        className="mySwiper"
        freeMode={true}
        navigation={true}
        slidesPerView={3}
        spaceBetween={10}
        breakpoints={breakpoints}
        modules={[Navigation, FreeMode]}
      >
        {data?.map((card) => {
          const { id, title, poster_path, profile_path, name, character } =
            card;
          const path = name && character ? profile_path : poster_path;
          const link = name && character ? `/person/${id}` : `/movie/${id}`;

          return (
            <SwiperSlide key={id}>
              <div className="relative group">
                <Link to={link}>
                  <Card
                    src={path ? POSTER_URL + path : POSTER_NOT_FOUND}
                    alt={title}
                  />
                </Link>
                <RenderIf isTrue={!name && !character}>
                  <FavoriteButton movie={card} />
                </RenderIf>
              </div>
              <RenderIf isTrue={name && character}>
                <div className="grid mt-3">
                  <h3 className="text-base font-[500] max-md:text-sm">
                    {name}
                  </h3>
                  <p className="text-[#70757a] font-[500] max-md:text-xs">
                    {character}
                  </p>
                </div>
              </RenderIf>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
