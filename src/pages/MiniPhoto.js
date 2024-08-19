import React, { useEffect, useState } from "react";
import BgImg from "../assets/pattern.png";
import MiniHomeFrame from "../components/MiniHome/MiniHomeFrame";
import PostLeftFrame from "../components/MiniHome/PostLeftFrame";
import PostRightFrame from "../components/MiniHome/PostRightFrame";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchMinihomeByUsername } from "../redux/miniHomeSlice";

const MiniPhoto = ({ me }) => {
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
  const [selectedFolderId, setSelectedFolderId] = useState();

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
        nav="Photo"
        user={user}
        me={me}
        userHome={userHome}
        LeftContent={
          <PostLeftFrame
            userHome={userHome}
            me={me}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
            // selectedFolderId={selectedFolderId}
            setSelectedFolderId={setSelectedFolderId}
          />
        }
        RightContent={
          <PostRightFrame
            selectedFolder={selectedFolder}
            me={me}
            userHome={userHome}
            user={user}
            selectedFolderId={selectedFolderId}
          />
        }
      />
    </>
  );
};

export default MiniPhoto;
