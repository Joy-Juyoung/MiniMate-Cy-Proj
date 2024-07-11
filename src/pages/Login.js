import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, loginUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom"; // import BgImg from '../assets/pattern.png';
import { Buttons, Loading, TextInput } from "../components";
import BgImg from "../assets/pattern.png";
import Logo from "../assets/logo-dark.png";

const LoginPage = ({ tokenFromStorage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, success, error, user, fail } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClicked(!clicked);
    // console.log('formData', formData);
    dispatch(loginUser(formData));
    // .then(() => {
    // console.log("fail", fail);
    // console.log("error", error);
    console.log("success", success);
    // if (fail) {
    //   setErrMsg(fail);
    // }
    // // const tokenFromStorage = localStorage.getItem('token');
    // if (success === false) {
    //   setErrMsg(fail);
    // } else if (success) {
    //   // navigate("/");
    //   setClicked(!clicked);
    // }
    // if (success) {
    //   navigate("/");
    // } else {
    //   setErrMsg(fail);
    // }
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    } else {
      setErrMsg(fail);
    }
  }, [dispatch, clicked, success, fail, error]);

  return (
    <div
      className="w-full h-[100vh] flex items-center justify-center sm:p-6 p-0 "
      style={{
        backgroundImage: `url('${BgImg}')`,
        backgroundSize: "15%",
      }}
    >
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-white opacity-60 "></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      &#8203;
      <div
        className="inline-block p-6 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-2xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full opacity-90"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div
          onClick={() => navigate("/")}
          className="flex items-center w-full gap-2 mb-6 cursor-pointer"
        >
          <div className="flex items-center w-16 h-16 text-white">
            <img src={Logo} alt="logo" />
          </div>
          <span className="text-2xl font-semibold text-hightColor">
            MiniMate
          </span>
        </div>

        <p className="text-base font-semibold text-ascent-1">
          Log in to your account
        </p>

        <form className=" py-4 flex flex-col gap-5=" onSubmit={handleSubmit}>
          {errMsg && (
            <span className={`text-sm text-[#f64949fe] mt-0.5`}>{errMsg}</span>
          )}
          <TextInput
            type="email"
            name="email"
            label="Email Address"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            styles="w-full"
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            styles="w-full pr-10"
          />
          <Buttons
            type="submit"
            containerStyles={`inline-flex justify-center rounded-md bg-[#F37125] mt-6 px-8 py-3 text-base font-medium text-white outline-none`}
            title="Login"
          />
        </form>
        <p className="text-sm text-center text-ascent-2">
          Don't have an account?
          <Link
            to="/register"
            className="text-[#F37125] font-semibold ml-2 cursor-pointer"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
