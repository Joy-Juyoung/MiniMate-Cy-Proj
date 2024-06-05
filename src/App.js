import React, { useEffect } from 'react';
import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  Shop,
} from './pages';
import { Header } from './components/Header';
import BgImg from './assets/patternBg2.png';
import { Footer } from './components';
import 'react-toastify/dist/ReactToastify.css';
import { fetchMe } from './redux/userSlice';
import ProtectedRoute from './ProtectedRoute';
import Mate from './pages/Mate';

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
  const tokenFromStorage = localStorage.getItem('token');

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
      className='w-full h-[100vh] font-poppins bg-[#ffffff]'
      // style={{
      //   backgroundImage: location.pathname === '/' ? `url('${BgImg}')` : '',
      //   backgroundSize: '8%',
      //   backgroundRepeat: 'repeat',
      //   minHeight: '100vh',
      // }}
    >
      <Routes>
        <Route path='/' element={<HeaderWrapper me={me} />}>
          <Route path='/' element={<Home me={me} />} />
          <Route path='/shop' element={<Shop />} />
          {/* <Route
            path='/cart'
            element={
              <ProtectedRoute
                element={Cart}
                me={me}
                tokenFromStorage={tokenFromStorage}
              />
            }
          /> */}
          <Route
            path='/cart'
            element={<Cart me={me} tokenFromStorage={tokenFromStorage} />}
          />
          {/* <Route
            path='/account'
            element={
              <ProtectedRoute
                element={Account}
                me={me}
                tokenFromStorage={tokenFromStorage}
              />
            }
          /> */}
          <Route
            path='/account'
            element={<Account me={me} tokenFromStorage={tokenFromStorage} />}
          />
          <Route
            path='/mate'
            element={<Mate me={me} tokenFromStorage={tokenFromStorage} />}
          />
          <Route path='/admin' element={<Admin me={me} />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route
          path='/login'
          element={<Login tokenFromStorage={tokenFromStorage} />}
        />
        <Route path='/:domain/home' element={<MiniHome me={me} />} />
        <Route path='/:domain/photo' element={<MiniPhoto />} />
        <Route path='/:domain/video' element={<MiniVideo />} />
        <Route path='/:domain/diary' element={<MiniDiary />} />
        <Route path='/:domain/visitor' element={<MiniVisitor />} />
        <Route path='/:domain/setting' element={<MiniSetting />} />
      </Routes>
    </div>
  );
}

export default App;
