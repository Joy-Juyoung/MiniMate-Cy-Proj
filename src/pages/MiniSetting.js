import React, { useEffect } from "react";
import MiniHomeFrame from "../components/MiniHome/MiniHomeFrame";
import PostRightFrame from "../components/MiniHome/PostRightFrame";
import PostLeftFrame from "../components/MiniHome/PostLeftFrame";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";
import MiniSettingRight from "../components/MiniHome/MiniSettingRight";
import { useParams } from "react-router-dom";
import { fetchMinihomeByUsername } from "../redux/miniHomeSlice";

const MiniSetting = ({ me }) => {
  const dispatch = useDispatch();
  const { domain } = useParams();
  const { user } = useSelector((state) => state.user);
  const { userHome } = useSelector((state) => state.miniHome);
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(
        fetchMinihomeByUsername({ username: domain })
      );
      if (fetchMinihomeByUsername.fulfilled.match(result)) {
        const ownerId = result.payload?.owner;
      }
    };
    fetchData();
  }, [dispatch, domain]);

  return (
    <>
      <MiniHomeFrame
        nav="Setting"
        LeftContent={<PostLeftFrame />}
        RightContent={<MiniSettingRight userHome={userHome} me={me} />}
      />
    </>
  );
};

export default MiniSetting;
