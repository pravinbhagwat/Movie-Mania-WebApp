import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useAppContext } from "../../context";

const FavoriteButton = ({ movie }) => {
  const { favorites, handleToggleFavorite } = useAppContext();

  return (
    <button
      onClick={() => handleToggleFavorite(movie)}
      className="text-[#1976d2] absolute top-0 right-0 w-[45px] h-[45px] p-2 duration-200 ease-linear invisible opacity-0 group-hover:visible group-hover:opacity-100 max-md:visible max-md:opacity-100"
    >
      {favorites.find((favorite) => favorite.id === movie.id) ? (
        <AiFillHeart style={{ width: "100%", height: "100%" }} />
      ) : (
        <AiOutlineHeart style={{ width: "100%", height: "100%" }} />
      )}
    </button>
  );
};

export default FavoriteButton;
