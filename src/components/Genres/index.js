import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getGenres } from "../../api";
import EmptyDataMessage from "../EmptyDataMessage";
import Loading from "../../UI/Loading";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getGenres()
      .then((res) => {
        setGenres(res.genres);
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
      <EmptyDataMessage isEmpty={!genres.length}>
        <div className="px-5 pt-8">
          <div className="ml-3 mb-5">
            <div className="text-2xl font-[500] max-md:text-xl">Genres</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
              const { id, name } = genre;
              return (
                <Link
                  to={`/genre/${id}/${name}`}
                  key={id}
                  className="text-base text-[#70757a] bg-[#1f1f1f] rounded py-1 px-3 duration-200 ease-linear hover:text-white"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      </EmptyDataMessage>
    </Loading>
  );
};

export default Genres;
