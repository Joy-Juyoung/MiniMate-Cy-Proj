import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Account,
  Cart,
  Home,
  Login,
  MiniHome,
  Profile,
  Register,
  ResetPassword,
  Shop,
} from './pages';
import { Header } from './components/Header';
import BgImg from './assets/patternBg2.png';
import { Footer } from './components';

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
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <div
      className='w-full h-full font-poppins bg-white'
      style={{
        backgroundImage: `url('${BgImg}')`,
        backgroundSize: '15%',
        backgroundRepeat: 'repeat',
      }}
    >
      <Routes>
        {/* <Route  element={<Layout />}> */}
        <Route path='/' element={<HeaderWrapper />}>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/account' element={<Account />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/minihome' element={<MiniHome />} />
      </Routes>
    </div>
  );
}

export default App;
