import React, { useEffect, useState } from "react";
import MiniHomeFrame from "../components/MiniHome/MiniHomeFrame";
import PostRightFrame from "../components/MiniHome/PostRightFrame";
import PostLeftFrame from "../components/MiniHome/PostLeftFrame";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";
import MiniSettingRight from "../components/MiniHome/MiniSettingRight";
import { useLocation, useParams } from "react-router-dom";
import { fetchMinihomeByUsername } from "../redux/miniHomeSlice";
import MiniSettingLeft from "../components/MiniHome/MiniSettingLeft";

const MiniSetting = ({ me }) => {
  const dispatch = useDispatch();
  const { domain } = useParams();
  const { user } = useSelector((state) => state.user);
  const { userHome } = useSelector((state) => state.miniHome);
  const location = useLocation();

  // Extract folder from the URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const folderFromUrl = queryParams.get("folder");

  // Set initial state based on URL or default to "public"
  const [selectedFolder, setSelectedFolder] = useState(
    folderFromUrl || "public"
  );

  useEffect(() => {
    if (folderFromUrl) {
      setSelectedFolder(folderFromUrl);
    }
  }, [folderFromUrl]);

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
        user={user}
        me={me}
        userHome={userHome}
        LeftContent={
          <MiniSettingLeft
            userHome={userHome}
            me={me}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
          />
        }
        RightContent={
          <MiniSettingRight
            userHome={userHome}
            user={user}
            me={me}
            selectedFolder={selectedFolder}
          />
        }
      />
    </>
  );
};

export default MiniSetting;
