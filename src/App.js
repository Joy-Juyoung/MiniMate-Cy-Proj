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
  Profile,
  Register,
  ResetPassword,
  Shop,
} from './pages';
import { Header } from './components/Header';
import BgImg from './assets/patternBg2.png';
import { Footer } from './components';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { fetchMe } from './redux/userSlice';

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

const HeaderWrapper = ({ me }) => (
  <div className='2xl:px-[12rem]'>
    <Header me={me} />
    <Outlet me={me} className='' />
    <Footer />
  </div>
);

function App() {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const tokenFromStorage = localStorage.getItem('token');

  useEffect(() => {
    // const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      dispatch(fetchMe());
    }
  }, [dispatch]);

  // console.log('me', me.username);

  return (
    <div
      className='w-full h-full font-poppins bg-[#ffffff]'
      style={{
        backgroundImage: `url('${BgImg}')`,
        backgroundSize: '8%',
        backgroundRepeat: 'repeat',
        minHeight: '100vh',
      }}
    >
      <Routes>
        {/* <Route  element={<Layout />}> */}
        <Route path='/' element={<HeaderWrapper me={me} />}>
          <Route path='/' element={<Home me={me} />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart me={me} />} />
          <Route path='/admin' element={<Admin me={me} />} />
          <Route
            path='/account'
            element={<Account me={me} tokenFromStorage={tokenFromStorage} />}
          />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route
          path='/login'
          element={<Login tokenFromStorage={tokenFromStorage} />}
        />
        {/* <Navigate to='/login' /> */}

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
