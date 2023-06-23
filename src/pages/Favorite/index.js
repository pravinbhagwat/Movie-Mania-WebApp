import React from "react";
import { useAppContext } from "../../context";

import Layout from "../../components/Layout";
import EmptyDataMessage from "../../components/EmptyDataMessage";
import Cards from "../../components/Cards";
import Button from "../../UI/Button";

const Favorite = () => {
  const { favorites, handleClearFavorites } = useAppContext();

  return (
    <Layout title="Favorite">
      <EmptyDataMessage
        title="Favorite list is empty"
        isEmpty={!favorites.length}
        isFullHeight
      >
        <Cards title="Favorite Movies" data={favorites} />
        <div className="flex justify-center pt-5 pb-10">
          <Button onClick={handleClearFavorites}>Clear</Button>
        </div>
      </EmptyDataMessage>
    </Layout>
  );
};

export default Favorite;
