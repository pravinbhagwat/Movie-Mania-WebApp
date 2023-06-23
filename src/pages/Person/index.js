import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getPerson } from "../../api";

import Layout from "../../components/Layout";
import EmptyDataMessage from "../../components/EmptyDataMessage";
import Details from "../../components/Person/Details";
import Movies from "../../components/Person/Movies";
import Loading from "../../UI/Loading";

const Person = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPerson(id)
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
    <Layout title={details.name}>
      <Loading loading={isLoading} isFullHeight>
        <EmptyDataMessage
          isEmpty={Object.keys(details).length === 0}
          isFullHeight
        >
          <Details {...details} />
          <Movies id={id} />
        </EmptyDataMessage>
      </Loading>
    </Layout>
  );
};

export default Person;
