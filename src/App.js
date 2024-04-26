import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Home,
  Login,
  MiniHome,
  Profile,
  Register,
  ResetPassword,
  Shop,
} from './pages';
import { Header } from './components';
import BgImg from './assets/pattern.png';

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  // console.log(user);

  return user?.token ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}

function App() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      data-theme={theme}
      className='w-full min-h-[100vh] h-[100vh] '
      style={{
        backgroundImage: `url('${BgImg}')`,
        backgroundSize: '15%',
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/minihome' element={<MiniHome />} />
      </Routes>
    </div>
  );
}

export default App;
