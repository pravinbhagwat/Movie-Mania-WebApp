import React from "react";

import RenderIf from "../../components/RenderIf";
import ReadMore from "../../UI/ReadMore";
import { POSTER_NOT_FOUND, POSTER_URL } from "../../utils/constants";
import { dateFormat } from "../../utils/helpers";

const Details = ({
  profile_path,
  name,
  birthday,
  deathday,
  place_of_birth,
  biography,
}) => {
  let poster;
  profile_path
    ? (poster = POSTER_URL + profile_path)
    : (poster = POSTER_NOT_FOUND);

  const infoBlockClasses =
    "grid gap-y-1 [&>h3]:text-lg [&>h3]:font-[500] [&>p]:text-[rgba(255,255,255,0.9)]";

  return (
    <div className="grid grid-cols-[280px_1fr] gap-5 px-5 pt-10 pb-10 max-md:grid-cols-1 max:md-justify-items-start max-md:pb-5">
      <div>
        <img
          src={poster}
          alt={name}
          className="rounded object-cover w-full max-h-[380px] max-md:object-contain"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-[500] max-md:text-xl">{name}</h1>
        <RenderIf isTrue={birthday}>
          <div className={infoBlockClasses}>
            <h3>Birthday</h3>
            <p>
              {dateFormat(birthday)}
              {deathday === null ? "" : ` — ${dateFormat(deathday)}`}
            </p>
          </div>
        </RenderIf>
        <RenderIf isTrue={place_of_birth}>
          <div className={infoBlockClasses}>
            <h3>Place of Birth</h3>
            <p>{place_of_birth}</p>
          </div>
        </RenderIf>
        <RenderIf isTrue={biography}>
          <div className={infoBlockClasses}>
            <h3>Biography</h3>
            <ReadMore text={biography} limit={400} />
          </div>
        </RenderIf>
      </div>
    </div>
  );
};

export default Details;
