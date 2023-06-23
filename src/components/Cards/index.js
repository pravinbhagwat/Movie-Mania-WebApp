import React, { memo } from "react";
import { Link } from "react-router-dom";

import Card from "../../UI/Card";
import FavoriteButton from "../../UI/FavoriteButton";
import RenderIf from "../RenderIf";
import { POSTER_NOT_FOUND, POSTER_URL } from "../../utils/constants";

const Cards = memo(({ title, data = [] }) => {
  return (
    <div className="py-10 px-5">
      <RenderIf isTrue={!!title}>
        <h1 className="text-3xl font-[500] capitalize mb-7 ml-3 max-md:text-2xl fade_in">
          {title}
        </h1>
      </RenderIf>
      <div className="cards_grid">
        {data?.map((card) => {
          const { id, poster_path, title } = card;
          return (
            <div
              key={id}
              className="relative group duration-200 ease-linear hover:scale-[1.03]"
            >
              <Link to={`/movie/${id}`}>
                <Card
                  src={
                    poster_path ? POSTER_URL + poster_path : POSTER_NOT_FOUND
                  }
                  alt={title}
                />
              </Link>
              <FavoriteButton movie={card} />
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Cards;
