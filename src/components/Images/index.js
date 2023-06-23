import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "../../assets/styles/media.scss";

import { getMovieImages } from "../../api";
import Loading from "../../UI/Loading";
import Modal from "../../UI/Modal";
import { BACKDROP_NOT_FOUND, BACKDROP_URL } from "../../utils/constants";
import EmptyDataMessage from "../EmptyDataMessage";

const Images = ({ id }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [photoPath, setPhotoPath] = useState("");

  useEffect(() => {
    getMovieImages(id)
      .then((res) => {
        console.log(res);
        setImages(res.backdrops);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.status_message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleClick = (path) => {
    setIsOpenModal(true);
    setPhotoPath(path);
  };

  return (
    <Loading loading={isLoading}>
      <EmptyDataMessage isEmpty={!images.length}>
        <div className="media_outer fade_in">
          <div className="media_inner">
            {images.map((photo, i) => {
              const { file_path } = photo;

              const src = file_path
                ? BACKDROP_URL + file_path
                : BACKDROP_NOT_FOUND;

              return (
                <div key={i} className="media_item">
                  <figure>
                    <picture>
                      <LazyLoadImage
                        src={src}
                        alt="media"
                        effect="blur"
                        onClick={() => handleClick(file_path)}
                      />
                    </picture>
                  </figure>
                </div>
              );
            })}
            <Modal open={isOpenModal} setOpen={setIsOpenModal}>
              <img src={BACKDROP_URL + photoPath} alt="media" />
            </Modal>
          </div>
        </div>
      </EmptyDataMessage>
    </Loading>
  );
};

export default Images;
