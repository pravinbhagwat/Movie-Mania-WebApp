import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../context";

const Search = () => {
  const navigate = useNavigate();
  const { search, handleHideSearch } = useAppContext();
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${value}`);
    setValue("");
    handleHideSearch();
  };

  return (
    <div
      className={`bg-[rgba(0,0,0,0.7)] fixed top-0 right-0 w-[calc(100%-90px)] h-full ${
        search ? "visible opacity-100" : "invisible opacity-0"
      } z-[90] duration-200 ease-linear max-lg:w-full max-lg:h-[calc(100%-59px)]`}
      onClick={handleHideSearch}
    >
      <form
        className={`fixed top-0 right-0 w-[calc(100%-90px)] p-4 ${
          search ? "translate-y-0" : "translate-y-[-100%]"
        } duration-200 ease-linear z-[100] max-lg:w-full`}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-base text-black bg-white rounded w-full p-4 duration-200 ease-linear"
        />
      </form>
    </div>
  );
};

export default Search;
