import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

import { getReviews } from "../../api";
import EmptyDataMessage from "../EmptyDataMessage";
import ReadMore from "../../UI/ReadMore";
import Loading from "../../UI/Loading";
import { dateFormat } from "../../utils/helpers";

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getReviews(id)
      .then((res) => {
        setReviews(res.results);
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
      <EmptyDataMessage isEmpty={!reviews.length}>
        <div className="mt-5 mb-20 fade_in">
          <div className="grid grid-cols-2 items-start gap-5 px-5 max-md:grid-cols-1">
            {reviews.map((review) => {
              const { id, author, created_at, content } = review;

              return (
                <div key={id} className="grid gap-y-3">
                  <div className="flex items-center gap-x-3">
                    <FaUserCircle style={{ width: 30, height: 30 }} />
                    <div>
                      <h4 className="text-base">{author}</h4>
                      <p className="text-xs">{dateFormat(created_at)}</p>
                    </div>
                  </div>
                  <ReadMore text={content} limit={400} />
                </div>
              );
            })}
          </div>
        </div>
      </EmptyDataMessage>
    </Loading>
  );
};

export default Reviews;
