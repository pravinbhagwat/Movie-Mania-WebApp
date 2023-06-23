import React, { useEffect, useState } from "react";

import { getCast } from "../../api";
import EmptyDataMessage from "../EmptyDataMessage";
import Carousel from "../Carousel";
import Loading from "../../UI/Loading";

const Cast = ({ id }) => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCast(id)
      .then((res) => {
        setCast(res.cast);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.status_message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <Loading loading={isLoading}>
      <EmptyDataMessage isEmpty={!cast.length}>
        <div className="pt-5 pb-10 max-md:pb-5">
          <Carousel data={cast} />
        </div>
      </EmptyDataMessage>
    </Loading>
  );
};

export default Cast;
