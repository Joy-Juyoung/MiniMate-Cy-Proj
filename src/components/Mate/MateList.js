import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, fetchOneUser } from "../../redux/userSlice";
// import MateSidebar from "./MateSidebar";
import MateHeader from "./MateHeader";
import { fetchMinihomeByUsername } from "../../redux/miniHomeSlice";

const MateList = ({ me }) => {
  const mateRef = useRef(null);
  const dispatch = useDispatch();
  const { miniHome, userHome, loading, error } = useSelector(
    (state) => state.miniHome
  );
  //  useEffect(() => {
  //    dispatch(fetchMinihomeByUsername({ username: me?.username }));
  //    // dispatch(fetchMinihome({ miniHomeId: userHome._id }));
  //  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchMe());
  // }, [dispatch]);

  const handleRequestDetails = (mateId) => {
    dispatch(fetchOneUser({ userId: mateId }));
  };

  // console.log("me.best_friends", me.best_friends);

  const handleClickFriend = (name) => {
    // https://minimate-cy.netlify.app/joytest01
    // console.log(name);
    if (!mateRef.current || mateRef.current.closed) {
      if (me) {
        //  const userDomain = me?.domain;
        // dispatch(fetchMinihomeByUsername({ username: name }));
        const popupUrl = `http://localhost:3000/${name}/home`;
        // const popupUrl = `https://minimate-cy.netlify.app/${userDomain}/home`;
        // const popupUrl = `${userDomain}/home`;
        const popupWidth = 1100;
        const popupHeight = 600;

        // 브라우저 창의 위치와 크기 가져오기
        const screenLeft =
          window.screenLeft !== undefined
            ? window.screenLeft
            : window.screen.left;
        const screenTop =
          window.screenTop !== undefined ? window.screenTop : window.screen.top;

        const screenWidth = window.innerWidth
          ? window.innerWidth
          : document.documentElement.clientWidth
          ? document.documentElement.clientWidth
          : window.screen.width;

        // 팝업 창을 화면의 가로 중앙과 세로 상단에 위치시키기 위한 좌표 계산
        const left = screenLeft + screenWidth / 2 - popupWidth / 2;
        const top = screenTop + 0; // 세로 상단에 위치

        const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;
        mateRef.current = window.open(popupUrl, "_blank", popupFeatures);
      }
    } else {
      mateRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col w-full h-full px-10 pt-8 pb-24 lg:pb-16 sm:px-20 md:px-40">
      {/* <MateSidebar /> */}
      <MateHeader />
      <div>
        <div className="flex flex-col items-start w-full">
          <h2 className="mb-4 mr-4 text-xl font-semibold">Mate List</h2>
        </div>
        <div className="overflow-y-auto h-[55vh] bg-white shadow-md ">
          {me?.best_friends?.length > 0 ? (
            <table className="w-full text-left border-collapse text-[0.8rem] ">
              <thead>
                <tr className="bg-[#eee] border-b border-[#bbb]">
                  <th className="p-2 font-normal text-center">#</th>
                  <th className="p-2 font-normal">MATE</th>
                  <th className="p-2 font-normal">NICKNAME</th>
                  <th className="p-2 font-normal">MY NICKNAME</th>
                  <th className="p-2 font-normal text-center"></th>
                </tr>
              </thead>
              {me.best_friends.map((mate, index) => (
                <tbody key={index}>
                  {mate.friend && (
                    <tr className="border-b border-[#bbb]">
                      <td className="p-2 text-center">{index + 1}</td>
                      <td
                        className="p-2 text-[#2253cf] cursor-pointer underline"
                        onClick={() => handleClickFriend(mate.friend.username)}
                      >
                        {mate.friend.username}
                      </td>
                      <td className="p-2">{mate.friend_nick_name}</td>
                      <td className="p-2">{mate.my_nick_name}</td>
                      <td className="p-2 text-center">
                        <button className="bg-black text-white rounded-lg p-2 text-[0.7rem]">
                          Update
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </table>
          ) : (
            <div className="text-center text-[#bbb] mt-5">
              No friends found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MateList;
