import axios from "axios";
import { BASE_URL, API_KEY } from "../utils/constants";

axios.defaults.baseURL = BASE_URL;

const getURL = (endpoint) => {
  return `${endpoint}?api_key=${API_KEY}&language=en-US`;
};

export const search = async (page, query) => {
  const { data } = await axios.get(
    `search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}`
  );
  return data;
};

export const getNowPlaying = async () => {
  const { data } = await axios.get(getURL("movie/now_playing"));
  return data;
};

export const getPopular = async (page) => {
  const { data } = await axios.get(
    `movie/popular?api_key=${API_KEY}&language=en-US${
      page ? `&page=${page}` : "&page=1"
    }`
  );
  return data;
};

export const getTopRated = async (page) => {
  const { data } = await axios.get(
    `movie/top_rated?api_key=${API_KEY}&language=en-US${
      page ? `&page=${page}` : "&page=1"
    }`
  );
  return data;
};

export const getGenres = async () => {
  const { data } = await axios.get(getURL("genre/movie/list"));
  return data;
};

export const getSingleGenre = async (id, page) => {
  const { data } = await axios.get(
    `discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${id}&page=${page}&sort_by=popularity.desc`
  );
  return data;
};

export const getMovieDetails = async (id) => {
  const { data } = await axios.get(getURL(`movie/${id}`));
  return data;
};

export const getRecommended = async (id) => {
  const { data } = await axios.get(getURL(`movie/${id}/recommendations`));
  return data;
};

export const getPerson = async (id) => {
  const { data } = await axios.get(getURL(`person/${id}`));
  return data;
};

export const getPersonMovies = async (id) => {
  const { data } = await axios.get(getURL(`person/${id}/movie_credits`));
  return data;
};

export const getCast = async (id) => {
  const { data } = await axios.get(getURL(`movie/${id}/credits`));
  return data;
};

export const getMovieImages = async (id) => {
  const { data } = await axios.get(
    `movie/${id}/images?api_key=${API_KEY}&language=en-US&include_image_language=null`
  );
  return data;
};

export const getMovieVideos = async (id) => {
  const { data } = await axios.get(getURL(`movie/${id}/videos`));
  return data;
};

export const getReviews = async (id) => {
  const { data } = await axios.get(getURL(`movie/${id}/reviews`));
  return data;
};
