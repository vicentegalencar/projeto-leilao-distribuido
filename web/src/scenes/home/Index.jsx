import React from "react";
import NextAuctions from "./NextAuctions";
import LiveAuction from "./LiveAuction";
const flexBetween = "flex items-center justify-between";
import Unlogged from "../navbar/unlogged";
const Index = () => {
  return (
    <div>
      <Unlogged/>
      <LiveAuction />
      
      {/* <NextAuctions /> */}
    </div>
  );
};

export default Index;
