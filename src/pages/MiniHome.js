import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLeft from "../components/MiniHome/HomeLeft";
import HomeRight from "../components/MiniHome/HomeRight";
import MiniHomeFrame from "../components/MiniHome/MiniHomeFrame";
import { fetchOneUser } from "../redux/userSlice";
import { fetchMinihomeByUsername } from "../redux/miniHomeSlice";
import { fetchCategories } from "../redux/categorySlice";
import { useParams } from "react-router-dom";

const MiniHome = ({ me }) => {
  const dispatch = useDispatch();
  const { domain } = useParams();
  const { user } = useSelector((state) => state.user);
  const { userHome } = useSelector((state) => state.miniHome);
  // const { categories } = useSelector((state) => state.categories);
  const [homeOwnerId, setHomeOwnerId] = useState();
  const [myMiniroom, setMyMinieroom] = useState();
  const [myMinime, setMyMinime] = useState();

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [dispatch]);

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
        me={me}
        user={user}
        userHome={userHome}
        // categories={categories}
        LeftContent={<HomeLeft me={me} userHome={userHome} user={user} />}
        RightContent={
          <HomeRight
            me={me}
            userHome={userHome}
            // categories={categories}
            user={user}
          />
        }
      />
    </>
  );
};

export default MiniHome;
