// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   FindNewMate,
//   MateList,
//   MateSidebar,
//   MyRequests,
// } from "../components/Mate";

// const TabButton = ({ isActive, onClick, children }) => (
//   <button
//     className={`mateButton w-full border border-black px-4 py-2 mb-6
//     rounded-lg transition-colors duration-300
//               ${
//                 isActive
//                   ? "bg-black text-white"
//                   : "hover:bg-gray-100 text-black"
//               }`}
//     onClick={onClick}
//   >
//     {children}
//   </button>
// );

// const Mate = ({ me }) => {
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState("findNewMate");
//   const requests = useSelector((state) => state.friend.request);
//   const { user, users } = useSelector((state) => state.user);

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "findNewMate":
//         return (
//           <FindNewMate me={me} requests={requests} users={users} user={user} />
//         );
//       case "mateList":
//         return (
//           <MateList me={me} requests={requests} users={users} user={user} />
//         );
//       case "myRequests":
//         return <MyRequests me={me} requests={requests} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="px-10 pt-12 mateContainer pb-28 sm:pb-12 sm:px-20 md:px-40">
//       <MateSidebar />
//       <div className="flex-1 px-10 py-16 2xl:px-40">
//         {activeTab === "findNewMate" && <FindNewMate />}
//         {renderTabContent()}
//       </div>

//     </div>
//   );
// };

// export default Mate;
