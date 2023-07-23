import React, { useState } from "react";

// Components
import TabItem from "./TabItem";

const Tabs = ({ tabList }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex overflow-x-auto">
        {tabList.map((tab, index) => (
          <TabItem
            key={index}
            text={tab.name}
            isActive={activeTab === index ? true : false}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
      {tabList.map((tab, index) => (
        <div
          key={index}
          className={activeTab === index ? "flex flex-col gap-12" : "hidden"}
        >
          {tab.component}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
