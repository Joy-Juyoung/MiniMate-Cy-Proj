import React, { useEffect, useState } from "react";
import MiniHomeFrame from "../components/MiniHome/MiniHomeFrame";
import HomeLeft from "../components/MiniHome/HomeLeft";
import VisitorContents from "../components/MiniHome/VisitorContents";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMinihomeByUsername } from "../redux/miniHomeSlice";
import { fetchOneUser } from "../redux/userSlice";

const MiniVisitor = ({ me }) => {
  const dispatch = useDispatch();
  const { domain } = useParams();
  const { user } = useSelector((state) => state.user);
  const { userHome } = useSelector((state) => state.miniHome);
  const [homeOwnerId, setHomeOwnerId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(
        fetchMinihomeByUsername({ username: domain })
      );
      if (fetchMinihomeByUsername.fulfilled.match(result)) {
        const ownerId = result.payload?.owner;
        setHomeOwnerId(ownerId);
      }
    };
    fetchData();
  }, [dispatch, domain]);

  useEffect(() => {
    if (homeOwnerId) {
      dispatch(fetchOneUser({ userId: homeOwnerId }));
    }
  }, [dispatch, homeOwnerId]);
  return (
    <>
      <MiniHomeFrame
        nav="Visitor"
        user={user}
        userHome={userHome}
        LeftContent={<HomeLeft me={me} userHome={userHome} user={user} />}
        RightContent={<VisitorContents me={me} />}
      />
    </>
  );
};

export default MiniVisitor;
