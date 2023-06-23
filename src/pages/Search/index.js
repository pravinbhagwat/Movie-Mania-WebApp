import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { search } from "../../api";
import Layout from "../../components/Layout";
import EmptyDataMessage from "../../components/EmptyDataMessage";
import Cards from "../../components/Cards";
import RenderIf from "../../components/RenderIf";
import Loading from "../../UI/Loading";
import Button from "../../UI/Button";

const Search = () => {
  const { name } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    search(1, name)
      .then((res) => {
        setMovies(res.results);

        if (res.page === res.total_pages) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingInit(false);
      });

    return () => {
      setPage(1);
      setHasMore(true);
    };
  }, [name]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);

    search(page + 1, name)
      .then((res) => {
        setMovies((prevMovies) => [...prevMovies, ...res.results]);
        setPage((prevPage) => prevPage + 1);

        console.log(res);

        if (res.page === res.total_pages) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  };

  return (
    <Layout title={name}>
      <Loading loading={isLoadingInit} isFullHeight>
        <EmptyDataMessage isEmpty={!movies.length} isFullHeight>
          <Cards title={name} data={movies} />
          <RenderIf isTrue={hasMore}>
            <div className="flex justify-center pt-5 pb-10">
              <Button disabled={isLoadingMore} onClick={handleLoadMore}>
                {isLoadingMore ? "Loading..." : "Load more"}
              </Button>
            </div>
          </RenderIf>
        </EmptyDataMessage>
      </Loading>
    </Layout>
  );
};

export default Search;
