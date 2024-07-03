import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRequestsByReceiver } from "../../redux/friendSlice";
import NoticeModal from "../Modal/NoticeModal";
import ViewRequest from "../Modal/ViewRequest";

const MyRequests = ({ me, requests }) => {
  const dispatch = useDispatch();
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [requestId, setRequestId] = useState("");
  // const { friend } = useSelector((state) => state.friend);

  useEffect(() => {
    dispatch(fetchRequestsByReceiver({ userId: me?._id }));
  }, [dispatch]);
  // console.log('requests', requests);

  // const handleRequestDetails = (senderId) => {
  //   dispatch(fetchOneUser({ userId: senderId }));
  // };
  // console.log('sender', user);

  const handleRequest = (id) => {
    setRequestId(id);
    // dispatch(fetchRequest({ requestId: id }));
    setOpenRequestModal(true);
  };

  const closeModal = () => {
    setOpenRequestModal(false);
  };

  return (
    <div className="flex flex-col w-full">
      {requests && requests.length > 0 ? (
        <>
          <table className="w-full text-left border-collapse text-[0.8rem] mt-2">
            <thead>
              <tr className="bg-[#eee] border-b border-[#bbb]">
                <th className="p-2 font-normal text-center">#</th>
                <th className="p-2 font-normal">SENDER</th>
                <th className="p-2 font-normal">SENDER NICKNAME</th>
                {/* <th className='p-2 font-normal'>Receiver</th> */}
                <th className="p-2 font-normal">YOUR NICKNAME</th>
                <th className="p-2 font-normal">DATE</th>
                <th className="p-2 font-normal text-center"></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id} className="border-t border-[#bbb]">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2">{request.sender?.username}</td>
                  <td className="p-2">{request.sender_nick_name}</td>
                  {/* <td className='p-2'>{request.receiver.username}</td> */}
                  <td className="p-2">{request.receiver_nick_name}</td>
                  <td className="p-2">
                    {request.createdAt.substring(
                      0,
                      request.createdAt.indexOf("T")
                    )}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className="bg-black text-white rounded-lg p-2 text-[0.7rem]"
                      // onClick={() =>
                      //   dispatch(fetchOneUser({ userId: request.sender._id }))
                      // }
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
              />
            </NoticeModal>
          )}
        </>
      ) : (
        <div className="text-center text-[#bbb] mt-5">No requests found.</div>
      )}
    </div>
  );
};

export default MyRequests;
