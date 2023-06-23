import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  const element = document.createElement("div");
  element.classList.add("fixed", "inset-0", "z-[999]");
  const [container] = useState(() => element);

  useEffect(() => {
    document.body.appendChild(container);

    return () => document.body.removeChild(container);
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
