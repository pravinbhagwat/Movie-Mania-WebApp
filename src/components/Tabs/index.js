import React, { memo, useState } from "react";

import Cast from "../Cast";
import Videos from "../Videos";
import Images from "../Images";
import Reviews from "../Reviews";

const title = ["Cast", "Videos", "Images", "Reviews"];

const TabNavItem = ({ title, tab, tabName, setTabName }) => {
  return (
    <button
      className={`text-base font-[500] ${
        tabName === tab
          ? "text-[#1976d2] bg-[#0e0e0e]"
          : "text-[#70757a] bg-[#1f1f1f]"
      } w-full py-4 duration-200 ease-linear hover:text-[#1976d2] hover:bg-[#0e0e0e] max-md:text-sm`}
      onClick={() => setTabName(tab)}
    >
      {title}
    </button>
  );
};

const TabContent = ({ tab, tabName, children }) => {
  return tabName === tab ? <>{children}</> : null;
};

const Tabs = memo(({ id }) => {
  const [tabName, setTabName] = useState("Cast");

  return (
    <>
      <div className="flex">
        {title.map((el, i) => {
          return (
            <TabNavItem
              key={i}
              title={el}
              tab={el}
              tabName={tabName}
              setTabName={setTabName}
            />
          );
        })}
      </div>

      <TabContent tab="Cast" tabName={tabName}>
        <Cast id={id} />
      </TabContent>
      <TabContent tab="Videos" tabName={tabName}>
        <Videos id={id} />
      </TabContent>
      <TabContent tab="Images" tabName={tabName}>
        <Images id={id} />
      </TabContent>
      <TabContent tab="Reviews" tabName={tabName}>
        <Reviews id={id} />
      </TabContent>
    </>
  );
});

export default Tabs;
