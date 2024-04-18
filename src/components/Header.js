import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoLight from '../assets/logo-light.png';
import LogoDark from '../assets/logo-dark.png';
import { SetTheme } from '../redux/theme';
import { Logout } from '../redux/userSlice';
import { BsMoon, BsSunFill } from 'react-icons/bs';
import { FaRegCircleUser, FaCircleUser } from 'react-icons/fa6';
import { TbShoppingCart } from 'react-icons/tb';
import Buttons from './Buttons';

const Header = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  const handleTheme = () => {
    const themeValue = theme === 'light' ? 'dark' : 'light';

    dispatch(SetTheme(themeValue));
  };

  // console.log('theme', theme);

  // const handleSearch = async (data) => {};
  return (
    <div className='header w-full flex items-center justify-between py-3 md:py-6 px-24 bg-secondary '>
      {/* Left */}
      <Link to='/' className='flex gap-3 items-center'>
        <div className='w-16 h-16  flex items-center'>
          <img src={LogoDark} alt='logo' />
        </div>

        <span className='text-2xl font-semibold text-[#F37125]'>MiniMate</span>
      </Link>

      {/* Center */}
      <div className='flex gap-3 items-center'>
        <Buttons
          onClick={() => navigate('/')}
          title='HOME'
          containerStyles={`text-xl font-semibold px-4 md:px-6 py-1 md:py-2
            hover:text-[#F37125] ${
              location.pathname === '/'
                ? 'text-[#F37125] underline underline-offset-8'
                : 'text-ascent-1'
            }`}
        />
        <Buttons
          onClick={() => navigate('/shop')}
          title='SHOP'
          containerStyles={`text-xl font-semibold px-4 md:px-6 py-1 md:py-2
            hover:text-[#F37125] ${
              location.pathname === '/shop'
                ? 'text-[#F37125] underline underline-offset-8'
                : 'text-ascent-1'
            }`}
        />
      </div>

      {/* Right */}
      <div className='flex gap-4 items-center text-ascent-1 text-xl md:text-2xl '>
        <div>{theme === 'light' ? <FaRegCircleUser /> : <FaCircleUser />}</div>
        <div>
          <TbShoppingCart />
        </div>

        <button onClick={() => handleTheme()}>
          {theme === 'light' ? <BsSunFill /> : <BsMoon />}
        </button>

        <div>
          {!user ? (
            <Buttons
              onClick={() => dispatch(Logout())}
              title='Log Out'
              containerStyles='text-sm font-semibold text-ascent-1 px-4 md:px-6 py-1 md:py-2 border-2 border-[#666] rounded-full'
            />
          ) : (
            <Buttons
              onClick={() => navigate('/login')}
              title='Log In'
              containerStyles='text-sm font-semibold text-ascent-1 px-4 md:px-6 py-1 md:py-2 border-2 border-[#666] rounded-full'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
