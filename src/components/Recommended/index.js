import React, { useState, useEffect } from "react";

import { getRecommended } from "../../api";
import EmptyDataMessage from "../../components/EmptyDataMessage";
import Carousel from "../../components/Carousel";
import Loading from "../../UI/Loading";

const Recommended = ({ id }) => {
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecommended(id)
      .then((res) => {
        setRecommended(res.results);
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
      <EmptyDataMessage isEmpty={!recommended.length}>
        <div className="pt-10 pb-10 max-md:pt-5">
          <Carousel title="Recommended Movies" data={recommended} />
        </div>
      </EmptyDataMessage>
    </Loading>
  );
};

export default Recommended;
