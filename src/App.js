import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Home,
  Login,
  MiniHome,
  Profile,
  Register,
  ResetPassword,
} from './pages';

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  // console.log(user);

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}

function App() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div data-theme={theme} className='w-full min-h-[100vh]'>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/minihome' element={<MiniHome />} />
      </Routes>
    </div>
  );
}

export default App;
