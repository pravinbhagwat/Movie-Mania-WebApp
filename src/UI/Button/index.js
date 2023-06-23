import React from "react";

import s from "./styles.module.scss";

const Button = (props) => {
  const { disabled = false, onClick = () => {}, children } = props;

  return (
    <button className={s.button} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
