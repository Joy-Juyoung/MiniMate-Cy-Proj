import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLeft from "../components/MiniHome/HomeLeft";
import HomeRight from "../components/MiniHome/HomeRight";
import MiniHomeFrame from "../components/MiniHome/MiniHomeFrame";
import { fetchMe, fetchOneUser, fetchUserItems } from "../redux/userSlice";
import { fetchMinihomeByUsername } from "../redux/miniHomeSlice";
import { fetchCategories } from "../redux/categorySlice";

const MiniHome = () => {
  const dispatch = useDispatch();
  const { me, user } = useSelector((state) => state.user);
  const { miniHome, userHome } = useSelector((state) => state.miniHome);
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchMe());
    dispatch(fetchOneUser({ userId: userHome?.owner }));
  }, [dispatch]);

  console.log("user", user);

  useEffect(() => {
    if (me?.username) {
      dispatch(fetchMinihomeByUsername({ username: me.username }));
    }
  }, [dispatch, me?.username]);

  useEffect(() => {
    if (me?._id) {
      dispatch(fetchCategories());
      dispatch(fetchUserItems({ userId: me?._id }));
    }
  }, [dispatch, me?._id]);

  const updateUserHome = () => {
    if (me?.username) {
      dispatch(fetchMinihomeByUsername({ username: me.username }));
    }
  };

  return (
    <>
      <MiniHomeFrame
        me={me}
        user={user}
        userHome={userHome}
        categories={categories}
        LeftContent={
          <HomeLeft
            me={me}
            userHome={userHome}
            categories={categories}
            updateUserHome={updateUserHome}
            user={user}
          />
        }
        RightContent={
          <HomeRight
            me={me}
            userHome={userHome}
            categories={categories}
            updateUserHome={updateUserHome}
            user={user}
          />
        }
      />
    </>
  );
};

export default MiniHome;
