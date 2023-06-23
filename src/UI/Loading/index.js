import React from "react";
import s from "./styles.module.scss";

const Loading = ({ loading = true, isFullHeight = false, children }) => {
  return loading ? (
    <div
      className={`flex justify-center items-center ${
        isFullHeight ? "h-screen max-lg:h-[calc(100vh-60px)]" : "h-[50vh]"
      }`}
    >
      <div className={s.loader} />
    </div>
  ) : (
    children
  );
};

export default Loading;
