import React, { useState } from "react";

const ReadMore = ({ text, limit }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <p className="text-[rgba(255,255,255,0.9)] leading-[1.5]">
      {text?.length <= limit ? (
        text
      ) : (
        <>
          {isReadMore ? text : `${text?.slice(0, limit)}...`}
          <button
            className="text-sm text-[#1976d2] ml-1"
            onClick={() => setIsReadMore(!isReadMore)}
          >
            {isReadMore ? "Read Less" : "Read More"}
          </button>
        </>
      )}
    </p>
  );
};

export default ReadMore;
