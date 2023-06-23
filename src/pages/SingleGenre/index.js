import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { getSingleGenre } from "../../api";

import Layout from "../../components/Layout";
import EmptyDataMessage from "../../components/EmptyDataMessage";
import Cards from "../../components/Cards";
import Loading from "../../UI/Loading";

const SingleGenre = () => {
  const { id, name } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSingleGenre(id, page)
      .then((res) => {
        setMovies((prevState) => [...prevState, ...res.results]);

        if (page === res.total_pages) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, page]);

  return (
    <Layout title={name}>
      <Loading loading={isLoading} isFullHeight>
        <EmptyDataMessage isEmpty={!movies.length} isFullHeight>
          <InfiniteScroll
            dataLength={movies.length}
            next={() => setPage(page + 1)}
            hasMore={hasMore}
            loader={<div className="text-lg text-center mb-10">Loading...</div>}
          >
            <Cards title={name} data={movies} />
          </InfiniteScroll>
        </EmptyDataMessage>
      </Loading>
    </Layout>
  );
};

export default SingleGenre;
