import React, { memo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { getPopular } from "../../api";
import EmptyDataMessage from "../../components/EmptyDataMessage";
import Cards from "../../components/Cards";
import Layout from "../../components/Layout";
import Loading from "../../UI/Loading";

const Popular = memo(() => {
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPopular(page)
      .then((res) => {
        setPopular((prevState) => [...prevState, ...res.results]);

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
  }, [page]);

  return (
    <Layout title="Popular">
      <Loading loading={isLoading} isFullHeight>
        <EmptyDataMessage isEmpty={!popular.length} isFullHeight>
          <InfiniteScroll
            dataLength={popular.length}
            next={() => setPage(page + 1)}
            hasMore={hasMore}
            loader={
              <div className="text-lg text-center pt-5 pb-10">Loading...</div>
            }
          >
            <Cards title="Popular movies" data={popular} />
          </InfiniteScroll>
        </EmptyDataMessage>
      </Loading>
    </Layout>
  );
});

export default Popular;
