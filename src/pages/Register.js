import React, { useEffect, useState } from "react";
import LogoDark from "../assets/logo-dark.png";
import { Buttons, TextInput } from "../components";
import { Link, useNavigate } from "react-router-dom";
import BgImg from "../assets/pattern.png";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMsgSignup, setErrMsgSignup] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birth: "",
    gender: "male",
    phone_number: "",
    password: "",
    passwordConfirm: "",
  });

  const { loading, signupSuccess, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signupUser(formData));
  };

  useEffect(() => {
    if (signupSuccess) {
      console.log("Registration successful, navigating to /login");
      navigate("/login");
    } else if (error) {
      setErrMsgSignup(error);
    }
  }, [signupSuccess, error, navigate]);

  return (
    <div
      className="w-full h-[100vh] flex items-center justify-center sm:p-6 p-0"
      style={{
        backgroundImage: `url('${BgImg}')`,
        backgroundSize: "15%",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-[#fff] opacity-60"></div>
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
            <img src={LogoDark} alt="logo" />
          </div>
          <span className="text-2xl font-semibold text-[#F37125]">
            MiniMate
          </span>
        </div>

        <div className="text-base font-semibold text-ascent-1">
          Create your account
        </div>
        <form className="flex flex-col py-4" onSubmit={handleSubmit}>
          {errMsgSignup && (
            <span className="text-sm text-[#f64949fe] mt-0.5">
              {errMsgSignup}
            </span>
          )}
          <TextInput
            type="text"
            name="username"
            placeholder="Username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            required
            styles="w-full"
          />
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
            styles="w-full"
          />
          <TextInput
            type="date"
            name="birth"
            placeholder="Date of Birth"
            label="Date of Birth"
            value={formData.birth}
            onChange={handleChange}
            required
            styles="w-full"
          />
          <div className="flex flex-col w-full mt-4">
            <label className="text-sm">Gender</label>
            <div className="flex items-center mt-2">
              <label className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
          <TextInput
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            label="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            styles="w-full"
          />
          <TextInput
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
            styles="w-full"
          />
          <TextInput
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            label="Confirm Password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
            styles="w-full"
          />
          <Buttons
            type="submit"
            containerStyles="inline-flex justify-center rounded-md bg-[#F37125] mt-6 px-8 py-3 text-base font-medium text-white outline-none"
            title="Sign up"
          />
        </form>

        <div className="flex items-center justify-center text-sm text-center text-ascent-2">
          Already has an account?
          <div
            onClick={() => navigate("/login")}
            className="text-[#F37125] font-semibold ml-2 cursor-pointer"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
