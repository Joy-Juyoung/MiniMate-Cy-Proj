import React, { useEffect } from "react";
import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Account,
  Admin,
  Cart,
  Home,
  Login,
  MiniDiary,
  MiniHome,
  MiniPhoto,
  MiniSetting,
  MiniVideo,
  MiniVisitor,
  Register,
  ResetPassword,
  History,
  Shop,
} from "./pages";
import { Header } from "./components/Header";
import BgImg from "./assets/patternBg2.png";
import { Footer } from "./components";
import "react-toastify/dist/ReactToastify.css";
import { fetchMe } from "./redux/userSlice";
import ProtectedRoute from "./ProtectedRoute";
import {
  CategoryManagement,
  ProductManagement,
  UserManagement,
} from "./components/Admin";
import { FindNewMate, MateList, MyRequests } from "./components/Mate";

const HeaderWrapper = React.memo(({ me }) => (
  <div>
    <Header me={me} />
    <Outlet me={me} />
    <Footer />
  </div>
));

const useFetchUser = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const tokenFromStorage = localStorage.getItem("token");

  useEffect(() => {
    if (tokenFromStorage) {
      dispatch(fetchMe());
    }
  }, [dispatch, tokenFromStorage]);

  return { me, tokenFromStorage };
};

function App() {
  const { me, tokenFromStorage } = useFetchUser();
  const location = useLocation();

  return (
    <div
      className="w-full h-[100vh] font-poppins bg-[#ffffff]"
      // style={{
      //   backgroundImage: location.pathname === '/' ? `url('${BgImg}')` : '',
      //   backgroundSize: '8%',
      //   backgroundRepeat: 'repeat',
      //   minHeight: '100vh',
      // }}
    >
      <Routes>
        <Route path="/" element={<HeaderWrapper me={me} />}>
          <Route path="/" element={<Home me={me} />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/cart"
            element={<Cart me={me} tokenFromStorage={tokenFromStorage} />}
          />
          <Route
            path="/user/account"
            element={<Account me={me} tokenFromStorage={tokenFromStorage} />}
          />
          <Route
            path="/user/history"
            element={<History me={me} tokenFromStorage={tokenFromStorage} />}
          />
          <Route
            path="/mate/find"
            element={
              <FindNewMate me={me} tokenFromStorage={tokenFromStorage} />
            }
          />
          <Route
            path="/mate/list"
            element={<MateList me={me} tokenFromStorage={tokenFromStorage} />}
          />
          <Route
            path="/mate/request"
            element={<MyRequests me={me} tokenFromStorage={tokenFromStorage} />}
          />
          <Route path="/admin/user" element={<UserManagement me={me} />} />
          <Route
            path="/admin/category"
            element={<CategoryManagement me={me} />}
          />
          <Route
            path="/admin/product"
            element={<ProductManagement me={me} />}
          />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login tokenFromStorage={tokenFromStorage} />}
        />
        <Route path="/:domain/home" element={<MiniHome me={me} />} />
        <Route path="/:domain/photo" element={<MiniPhoto me={me} />} />
        <Route path="/:domain/video" element={<MiniVideo me={me} />} />
        <Route path="/:domain/diary" element={<MiniDiary me={me} />} />
        <Route path="/:domain/visitor" element={<MiniVisitor me={me} />} />
        <Route path="/:domain/setting" element={<MiniSetting me={me} />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
