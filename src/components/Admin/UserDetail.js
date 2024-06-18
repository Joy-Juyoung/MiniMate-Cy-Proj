import React from "react";
import MinniFemale from "../../assets/minimi2.png";
import MinniMale from "../../assets/minimi1.png";
import { IoMdClose } from "react-icons/io";

const UserDetail = ({ user, setSelectedUser }) => {
  return (
    <div className="h-full p-4 my-4 rounded shadow-lg">
      <div className="flex items-center justify-between w-full ">
        <h3 className="text-lg font-semibold">User Detail</h3>
        <button onClick={() => setSelectedUser("")}>
          <IoMdClose />
        </button>
      </div>
      <div className="grid items-center justify-center w-full h-full grid-cols-2">
        <img
          src={
            !user?.minime_img
              ? user?.gender === "male"
                ? MinniMale
                : MinniFemale
              : user?.minime_img
          }
          alt="Minime"
          className="w-[20rem] h-[15rem] drop-shadow-xl object-contain"
        />
        <div>
          <p className="mb-4">
            <strong className="text-[0.7rem]">Name</strong>
            <br /> {user.username}
          </p>
          <p className="mb-4">
            <strong className="text-[0.7rem]">Email</strong> <br />
            {user.email}
          </p>

          <p className="mb-4">
            <strong className="text-[0.7rem]">Gender</strong> <br />
            {user.gender}
          </p>
          <p className="mb-4">
            <strong className="text-[0.7rem]">Birth</strong>
            <br />
            {user?.birth?.substring(0, user?.birth?.indexOf("T"))}
          </p>
          <p className="mb-4">
            <strong className="text-[0.7rem]">ID</strong>
            <br />
            {user._id}
          </p>
        </div>
        {/* <p>
          <strong>Status:</strong> {user.status}
        </p> */}
        {/* <h4 className='mt-4 mb-2 text-lg font-semibold'>User History</h4>
        <ul>
          {user.history.map((item, index) => (
            <li key={index}>
              <p>
                <strong>Action:</strong> {item.action}
              </p>
              <p>
                <strong>Timestamp:</strong> {item.timestamp}
              </p>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default UserDetail;
