import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

import s from "./styles.module.scss";
import Portal from "./Portal";

const Modal = ({ children, open, setOpen }) => {
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }, [open]);

  if (!open) return null;

  return (
    <Portal>
      <div className={s.modal_outer}>
        <button onClick={handleClose} className={s.button}>
          <FaTimes size="30px" />
        </button>
        <div className={s.modal_inner} onClick={handleClose}>
          <div className={s.modal_container}>
            <div
              className={s.modal_content}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
