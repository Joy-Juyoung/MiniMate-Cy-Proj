import React from "react";
import MiniHomeFrame from "../components/MiniHome/MiniHomeFrame";
import HomeLeft from "../components/MiniHome/HomeLeft";
import VisitorContents from "../components/MiniHome/VisitorContents";

const MiniVisitor = ({ me }) => {
  return (
    <>
      <MiniHomeFrame
        nav="Visitor"
        LeftContent={<HomeLeft me={me} />}
        RightContent={<VisitorContents me={me} />}
      />
    </>
  );
};

export default MiniVisitor;
