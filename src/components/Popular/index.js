import React, { useState, useEffect } from "react";

import { getPopular } from "../../api";
import EmptyDataMessage from "../EmptyDataMessage";
import Carousel from "../../components/Carousel";
import Loading from "../../UI/Loading";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPopular()
      .then((res) => {
        setPopular(res.results);
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
      <EmptyDataMessage isEmpty={!popular.length}>
        <div className="pt-8">
          <Carousel title="Popular Movies" data={popular} />
        </div>
      </EmptyDataMessage>
    </Loading>
  );
};

export default Popular;
