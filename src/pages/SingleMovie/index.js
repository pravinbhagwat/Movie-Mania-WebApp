import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails } from "../../api";
import Layout from "../../components/Layout";
import EmptyDataMessage from "../../components/EmptyDataMessage";
import Details from "../../components/Details";
import Tabs from "../../components/Tabs";
import Recommended from "../../components/Recommended";
import Loading from "../../UI/Loading";

const SingleMovie = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => {
        setDetails(res);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.status_message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <Layout title={details.title}>
      <Loading loading={isLoading} isFullHeight>
        <EmptyDataMessage
          isEmpty={Object.keys(details).length === 0}
          isFullHeight
        >
          <Details {...details} />
          <Tabs id={id} />
          <Recommended id={id} />
        </EmptyDataMessage>
      </Loading>
    </Layout>
  );
};

export default SingleMovie;
