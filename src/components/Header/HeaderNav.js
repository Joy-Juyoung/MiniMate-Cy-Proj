import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Buttons from "../Buttons";
import { IoMdSettings } from "react-icons/io";

const HeaderNav = ({ me }) => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("me", me);

  return (
    <div className="items-center justify-center hidden md:flex">
      <Buttons
        onClick={() => navigate("/")}
        title="HOME"
        containerStyles={`text-xl font-semibold px-2 py-1
          hover:text-hightColor ${
            location.pathname === "/" ? "text-hightColor underline underline-offset-8" : "transparent"
          }`}
      />
      <Buttons
        onClick={() => navigate("/shop")}
        title="SHOP"
        containerStyles={`text-xl font-semibold px-4 py-1
          hover:text-hightColor ${
            location.pathname === "/shop" ? "text-hightColor underline underline-offset-8" : "transparent"
          }`}
      />
      {me?.username.toLowerCase().includes("admin") && (
        <Buttons
          onClick={() => navigate("/admin/user")}
          title="Admin"
          containerStyles={`text-xl font-semibold pr-4 pl-2 py-1
            hover:text-hightColor ${
              location.pathname === "/admin/user" ? "text-hightColor underline underline-offset-8" : "transparent "
            }`}
          iconLeft={<IoMdSettings />}
          iconStyles="mr-1"
        />
      )}
    </div>
  );
};

export default HeaderNav;
