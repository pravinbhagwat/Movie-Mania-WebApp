import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import routeList from "./RouteList";
import Search from "./components/Search";
import Navbar from "./UI/Navbar";
import ScrollToTop from "./utils/scrollToTop";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Search />
      <ScrollToTop />
      <Routes>
        {routeList.map((route, i) => {
          return <Route key={i} path={route.path} element={route.element} />;
        })}
      </Routes>
    </Router>
  );
};

export default App;
