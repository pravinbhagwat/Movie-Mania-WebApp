import React, { memo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { getTopRated } from "../../api";
import Layout from "../../components/Layout";
import EmptyDataMessage from "../../components/EmptyDataMessage";
import Cards from "../../components/Cards";
import Loading from "../../UI/Loading";

const TopRated = memo(() => {
  const [topRated, setTopRated] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopRated(page)
      .then((res) => {
        setTopRated((prevTopRated) => [...prevTopRated, ...res.results]);

        if (page === res.total_pages) {
          setHasMore(false);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return (
    <Layout title="Top rated">
      <Loading loading={isLoading} isFullHeight>
        <EmptyDataMessage isEmpty={!topRated.length} isFullHeight>
          <InfiniteScroll
            dataLength={topRated.length}
            next={() => setPage(page + 1)}
            hasMore={hasMore}
            loader={
              <div className="text-lg text-center pt-5 pb-10">Loading...</div>
            }
          >
            <Cards title="Top rated movies" data={topRated} />
          </InfiniteScroll>
        </EmptyDataMessage>
      </Loading>
    </Layout>
  );
});

export default TopRated;
