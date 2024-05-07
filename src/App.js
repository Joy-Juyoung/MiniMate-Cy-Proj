import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Account,
  Cart,
  Home,
  Login,
  MiniDiary,
  MiniHome,
  MiniPhoto,
  MiniSetting,
  MiniVideo,
  MiniVisitor,
  Profile,
  Register,
  ResetPassword,
  Shop,
} from './pages';
import { Header } from './components/Header';
import BgImg from './assets/patternBg2.png';
import { Footer } from './components';
import { userData } from './redux/tempData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from './redux/authSlice';
import { useEffect } from 'react';

// function Layout() {
// const { user } = useSelector((state) => state.user);
// const location = useLocation();
// // console.log(user);

// return user?.token ? (
//   <>
//     <Header />
//     <Outlet />
//   </>
// ) : (
//   <Navigate to='/login' state={{ from: location }} replace />
// );
// }

const HeaderWrapper = () => (
  <div className='2xl:px-[12rem]'>
    <Header user={userData} />
    <ToastContainer />
    <Outlet className='' />
    <Footer />
  </div>
);

function App() {
  const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem('profile'));
  // useEffect(() => {
  //   dispatch(setUser(user));
  // }, []);
  // const { user } = useSelector((state) => state.user);

  return (
    <div
      className='w-full h-full font-poppins bg-[#ffffff]'
      style={{
        backgroundImage: `url('${BgImg}')`,
        backgroundSize: '8%',
        backgroundRepeat: 'repeat',
        minHeight: '100vh',
        // opacity: '100%',
      }}
    >
      <Routes>
        {/* <Route  element={<Layout />}> */}
        <Route path='/' element={<HeaderWrapper />}>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/account' element={<Account user={'userData'} />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/:domain/home' element={<MiniHome />} />
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
