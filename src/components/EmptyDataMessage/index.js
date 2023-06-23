import React from "react";

const EmptyDataMessage = ({
  title = "No data available",
  isEmpty = true,
  isFullHeight = false,
  children,
}) => {
  return isEmpty ? (
    <div
      className={`fade_in text-xl text-center flex justify-center items-center px-5 ${
        isFullHeight ? "h-screen max-lg:h-[calc(100vh-60px)]" : "h-[50vh]"
      }`}
    >
      {title}
    </div>
  ) : (
    children
  );
};

export default EmptyDataMessage;
