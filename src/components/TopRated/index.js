import React, { useState, useEffect } from "react";

import { getTopRated } from "../../api";
import EmptyDataMessage from "../../components/EmptyDataMessage";
import Carousel from "../../components/Carousel";
import Loading from "../../UI/Loading";

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTopRated()
      .then((res) => {
        setTopRated(res.results);
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
      <EmptyDataMessage isEmpty={!topRated.length}>
        <div className="py-8">
          <Carousel title="Top Rated Movies" data={topRated} />
        </div>
      </EmptyDataMessage>
    </Loading>
  );
};

export default TopRated;
