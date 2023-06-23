import React, { useState, useEffect } from "react";

import { getPersonMovies } from "../../api";
import Carousel from "../../components/Carousel";

const Movies = ({ id }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getPersonMovies(id)
      .then((res) => {
        setMovies(res.cast);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.status_message);
      });
  }, [id]);

  return (
    <div className="pt-10 pb-10 max-md:pt-5">
      <Carousel title="Movies" data={movies} />
    </div>
  );
};

export default Movies;
