import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import s from "./styles.module.scss";

const Card = memo(({ src, alt }) => {
  return (
    <figure className={s.figure}>
      <picture className={s.picture}>
        <LazyLoadImage
          effect="blur"
          src={src}
          alt={alt}
          wrapperClassName={s.image}
        />
      </picture>
    </figure>
  );
});

export default Card;
