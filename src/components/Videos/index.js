import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaPlay } from "react-icons/fa";

import "../../assets/styles/media.scss";

import { getMovieVideos } from "../../api";
import EmptyDataMessage from "../EmptyDataMessage";
import Loading from "../../UI/Loading";
import Modal from "../../UI/Modal";

const Videos = ({ id }) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [videoPath, setVideoPath] = useState("");

  useEffect(() => {
    getMovieVideos(id)
      .then((res) => {
        setVideos(res.results);
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
    setVideoPath(path);
  };

  return (
    <Loading loading={isLoading}>
      <EmptyDataMessage isEmpty={!videos.length}>
        <div className="media_outer fade_in">
          <div className="media_inner">
            {videos.map((video, i) => {
              const { key, name, type } = video;

              const src = `https://i3.ytimg.com/vi/${key}/maxresdefault.jpg`;

              return (
                <div key={i} className="media_item">
                  <figure>
                    <picture>
                      <LazyLoadImage
                        src={src}
                        alt="media"
                        effect="blur"
                        onClick={() => handleClick(videoPath)}
                      />
                    </picture>
                  </figure>
                  <div className="video_info_outer">
                    <div className="video_icon">
                      <FaPlay onClick={() => handleClick(key)} />
                    </div>
                    <div className="video_info_inner">
                      <h4>{name}</h4>
                      <p>{type}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <Modal open={isOpenModal} setOpen={setIsOpenModal}>
              <iframe
                title="frame"
                src={`https://www.youtube.com/embed/${videoPath}?autoplay=1&mute=1`}
                frameBorder="0"
                allowFullScreen
              />
            </Modal>
          </div>
        </div>
      </EmptyDataMessage>
    </Loading>
  );
};

export default Videos;
