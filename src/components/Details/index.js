import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Rate from "rc-rate";

import s from "./styles.module.scss";

import RenderIf from "../../components/RenderIf";
import useMatch from "../../hooks/useMatch";
import {
  POSTER_URL,
  BACKDROP_URL,
  POSTER_NOT_FOUND,
  BACKDROP_NOT_FOUND,
} from "../../utils/constants";
import {
  arrayToString,
  dateFormat,
  moneyConverter,
  timeConverter,
} from "../../utils/helpers";

const Details = memo(
  ({
    backdrop_path,
    poster_path,
    title,
    genres,
    overview,
    release_date,
    runtime,
    budget,
    revenue,
    vote_average,
    vote_count,
    production_countries,
    production_companies,
    spoken_languages,
    status,
    tagline,
  }) => {
    const match = useMatch("(min-width: 1024px)");
    const poster = poster_path ? POSTER_URL + poster_path : POSTER_NOT_FOUND;
    const backdrop = backdrop_path
      ? BACKDROP_URL + backdrop_path
      : BACKDROP_NOT_FOUND;

    const infoBlockClasses = "grid grid-cols-[110px_1fr] [&>h4]:font-[500]";

    return (
      <div className="text-white flex justify-center items-center relative min-h-screen fade_in max-lg:grid max-lg:grid-cols-1 max-lg:p-0 max-lg:h-auto">
        <div
          className={`
            ${s.backdrop} absolute top-0 left-0 w-full h-full z-[-1] max-lg:static max-lg:max-h-[500px]`}
        >
          <LazyLoadImage effect="blur" src={backdrop} alt={title} />
        </div>
        <RenderIf isTrue={match}>
          <div className="relative max-w-[300px]">
            <img
              src={poster}
              alt={title || "movie_title"}
              className="rounded shadow max-w-[100%]"
            />
          </div>
        </RenderIf>

        <div className="grid gap-4 w-[50%] ml-12 max-lg:w-full max-lg:ml-0 max-lg:p-[20px_20px_80px_20px]">
          <h1 className="text-3xl font-[700] max-lg:text-2xl">{title}</h1>
          <div>{arrayToString(genres)}</div>
          <RenderIf isTrue={vote_average !== 0}>
            <div className="flex items-center">
              <Rate
                value={vote_average / 2}
                count={5}
                disabled={true}
                allowHalf={true}
              />
              <div>({vote_count})</div>
            </div>
          </RenderIf>
          <p>{overview}</p>

          <div className="grid gap-y-4">
            <div className={infoBlockClasses}>
              <h4>Status:</h4>
              <p>{status}</p>
            </div>
            <RenderIf isTrue={tagline}>
              <div className={infoBlockClasses}>
                <h4>Tag:</h4>
                <p className="italic">{tagline}</p>
              </div>
            </RenderIf>
            <div className={infoBlockClasses}>
              <h4>Languages:</h4>
              <p>{arrayToString(spoken_languages)}</p>
            </div>
            <div className={infoBlockClasses}>
              <h4>Country:</h4>
              <p>{arrayToString(production_countries)}</p>
            </div>
            <div className={infoBlockClasses}>
              <h4>Release:</h4>
              <p>{dateFormat(release_date)}</p>
            </div>
            <div className={infoBlockClasses}>
              <h4>Runtime:</h4>
              <p>{timeConverter(runtime)}</p>
            </div>
            <div className={infoBlockClasses}>
              <h4>Budget:</h4>
              <p>{moneyConverter(budget)}</p>
            </div>
            <div className={infoBlockClasses}>
              <h4>Revenue:</h4>
              <p>{moneyConverter(revenue)}</p>
            </div>
            <div className={infoBlockClasses}>
              <h4>Production:</h4>
              <p>{arrayToString(production_companies)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Details;
