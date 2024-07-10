import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRequest,
  fetchRequestsByReceiver,
  fetchRequestsBySender,
} from "../../redux/friendSlice";
import NoticeModal from "../Modal/NoticeModal";
import ViewRequest from "../Modal/ViewRequest";
import { fetchOneUser } from "../../redux/userSlice";
import MateSidebar from "./MateSidebar";

const MyRequests = ({ me, requests }) => {
  const dispatch = useDispatch();
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [requestId, setRequestId] = useState("");
  // const { send, receive } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.user);
  const { send, receive } = useSelector((state) => state.friend);

  useEffect(() => {
    dispatch(fetchRequestsByReceiver({ userId: me?._id }));
    dispatch(fetchRequestsBySender({ userId: me?._id }));
  }, [dispatch]);
  // console.log("send", send);
  // console.log("receive", receive);

  const handleRequest = (id) => {
    setRequestId(id);
    setOpenRequestModal(true);
  };

  const closeModal = () => {
    setOpenRequestModal(false);
  };

  return (
    <div className="flex flex-col w-full h-full px-10 pt-8 pb-24 lg:pb-16 sm:px-20 md:px-40">
      <MateSidebar />
      <div>
        {/* <div className="flex flex-col items-start w-full">
          <h2 className="mb-4 mr-4 text-xl font-semibold">My Request</h2>
        </div> */}
        <div className="grid grid-cols-2 gap-4 h-[55vh]">
          <div>
            <h2 className="p-2 font-semibold">My Send List</h2>
            {send && send.length > 0 ? (
              <div className="h-full overflow-y-auto rounded-md shadow-md">
                <table className="w-full text-left border-collapse text-[0.8rem] mt-2">
                  <thead>
                    <tr className="bg-[#eee] border-b border-[#bbb]">
                      <th className="p-2 font-normal text-center">#</th>
                      <th className="p-2 font-normal">RECEIVER</th>
                      <th className="p-2 font-normal">YOUR NICKNAME</th>
                      <th className="p-2 font-normal">RECEIVER NICKNAME</th>
                      {/* <th className="p-2 font-normal">DATE</th> */}
                      <th className="p-2 font-normal text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {send.map((request, index) => (
                      <tr key={request._id} className="border-t border-[#bbb]">
                        <td className="p-2 text-center">{index + 1}</td>
                        <td className="p-2">{request.receiver.username}</td>
                        <td className="p-2">{request.sender_nick_name}</td>
                        {/* <td className='p-2'>{request.receiver.username}</td> */}
                        <td className="p-2">{request.receiver_nick_name}</td>
                        {/* <td className="p-2">
                        {request.createdAt.substring(
                          0,
                          request.createdAt.indexOf("T")
                        )}
                      </td> */}
                        <td className="p-2 text-center">
                          <button
                            className="border rounded-lg p-2 text-[0.7rem]"
                            onClick={() => handleRequest(request._id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {openRequestModal && (
                  <NoticeModal closeModal={closeModal} requestId={requestId}>
                    <ViewRequest
                      closeModal={() => setOpenRequestModal(false)}
                      me={me}
                      requestId={requestId}
                      send={send}
                      receive={receive}
                    />
                  </NoticeModal>
                )}
              </div>
            ) : (
              <div className="text-center text-[#bbb] pt-5 shadow-md overflow-y-auto h-full bg-white ">
                No send list found.
              </div>
            )}
          </div>
          <div>
            <h2 className="p-2 font-semibold">My Request List</h2>
            {receive && receive.length > 0 ? (
              <div className="h-full overflow-y-auto rounded-md shadow-md">
                <table className="w-full text-left border-collapse text-[0.8rem] mt-2">
                  <thead>
                    <tr className="bg-[#eee] border-b border-[#bbb]">
                      <th className="p-2 font-normal text-center">#</th>
                      <th className="p-2 font-normal">SENDER</th>
                      <th className="p-2 font-normal">SENDER NICKNAME</th>
                      <th className="p-2 font-normal">YOUR NICKNAME</th>
                      {/* <th className="p-2 font-normal">DATE</th> */}
                      <th className="p-2 font-normal text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {receive.map((request, index) => (
                      <tr key={request._id} className="border-t border-[#bbb]">
                        <td className="p-2 text-center">{index + 1}</td>
                        <td className="p-2">{request.sender.username}</td>
                        <td className="p-2">{request.sender_nick_name}</td>
                        {/* <td className='p-2'>{request.receiver.username}</td> */}
                        <td className="p-2">{request.receiver_nick_name}</td>
                        {/* <td className="p-2">
                        {request.createdAt.substring(
                          0,
                          request.createdAt.indexOf("T")
                        )}
                      </td> */}
                        <td className="p-2 text-center">
                          <button
                            className="bg-black text-white rounded-lg p-2 text-[0.7rem]"
                            onClick={() => handleRequest(request._id)}
                          >
                            View Request
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {openRequestModal && (
                  <NoticeModal closeModal={closeModal} requestId={requestId}>
                    <ViewRequest
                      closeModal={() => setOpenRequestModal(false)}
                      me={me}
                      requestId={requestId}
                      send={send}
                      receive={receive}
                    />
                  </NoticeModal>
                )}
              </div>
            ) : (
              <div className="text-center text-[#bbb] pt-5 shadow-md overflow-y-auto h-full bg-white ">
                No requests found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
