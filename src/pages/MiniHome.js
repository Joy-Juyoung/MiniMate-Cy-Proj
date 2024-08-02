import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLeft from "../components/MiniHome/HomeLeft";
import HomeRight from "../components/MiniHome/HomeRight";
import MiniHomeFrame from "../components/MiniHome/MiniHomeFrame";
import { fetchMe, fetchUserItems } from "../redux/userSlice";
import { fetchMinihomeByUsername } from "../redux/miniHomeSlice";
import { fetchCategories } from "../redux/categorySlice";

const MiniHome = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { miniHome, userHome, loading, error } = useSelector(
    (state) => state.miniHome
  );
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMinihomeByUsername({ username: me?.username }));
  }, [dispatch]);

  // console.log("userHome", userHome);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchUserItems({ userId: me._id }));
  }, [dispatch, me]);

  // console.log('me', me);
  return (
    <>
      <MiniHomeFrame
        // nav="Home"
        me={me}
        userHome={userHome}
        categories={categories}
        LeftContent={
          <HomeLeft me={me} userHome={userHome} categories={categories} />
        }
        RightContent={
          <HomeRight me={me} userHome={userHome} categories={categories} />
        }
      />
    </>
  );
};

export default MiniHome;
