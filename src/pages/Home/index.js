import React from "react";

import { ReactComponent as TMDB_LOGO } from "../../assets/images/tmdb_logo.svg";

import NowPlaying from "../../components/NowPlaying";
import Genres from "../../components/Genres";
import Popular from "../../components/Popular";
import TopRated from "../../components/TopRated";
import Layout from "../../components/Layout";

const Home = () => {
  return (
    <Layout title="Home">
      <NowPlaying />
      <Genres />
      <Popular />
      <TopRated />
      <div className="flex flex-col justify-center items-center gap-y-3 py-8 px-5">
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noreferrer"
          className="flex [&>svg]:w-[200px] max-md:[&>svg]:w-[150px]"
        >
          <TMDB_LOGO />
        </a>
        <div className="font-[500] text-[#70757a]">Build on React By Pravin• 2023</div>
      </div>
    </Layout>
  );
};

export default Home;
