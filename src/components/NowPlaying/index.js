import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Rate from "rc-rate";

import s from "./styles.module.scss";

import { getNowPlaying } from "../../api";
import EmptyDataMessage from "../EmptyDataMessage";
import RenderIf from "../RenderIf";
import Loading from "../../UI/Loading";
import { BACKDROP_URL, BACKDROP_NOT_FOUND } from "../../utils/constants";

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getNowPlaying()
      .then((res) => {
        setNowPlaying(res.results);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.status_message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Loading loading={isLoading}>
      <EmptyDataMessage isEmpty={!nowPlaying.length}>
        <div className="fade_in">
          <Swiper
            className="mySwiper"
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
          >
            {nowPlaying.map((movie) => {
              const { id, title, overview, backdrop_path, vote_average } =
                movie;
              const backdrop = backdrop_path
                ? BACKDROP_URL + backdrop_path
                : BACKDROP_NOT_FOUND;

              return (
                <SwiperSlide key={id}>
                  <div
                    className={`${s.image} relative w-full h-[600px] max-md:h-[350px]`}
                  >
                    <LazyLoadImage
                      effect="blur"
                      src={backdrop}
                      alt={title || "movie"}
                    />
                  </div>
                  <div className="bg-gradient-to-r from-[rgb(0,0,0)] to-[rgba(0,0,0,0.2)] absolute top-0 w-full h-full">
                    <div className="flex flex-col justify-center items-start w-[50%] h-full pl-14 max-md:w-full max-md:p-5">
                      <Link
                        to={`/movie/${id}`}
                        className="text-4xl font-[700] text-white max-md:text-2xl"
                      >
                        {title}
                      </Link>
                      <RenderIf isTrue={vote_average !== 0}>
                        <div className="flex items-center my-2">
                          <Rate
                            value={vote_average / 2}
                            count={5}
                            disabled={true}
                            allowHalf={true}
                          />
                        </div>
                      </RenderIf>
                      <RenderIf isTrue={!!overview}>
                        <div className="text-base line-clamp-2 max-md:text-sm">
                          {overview}
                        </div>
                      </RenderIf>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </EmptyDataMessage>
    </Loading>
  );
};

export default NowPlaying;
