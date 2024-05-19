import React, { useState } from 'react';
import LogoDark from '../assets/logo-dark.png';
import { Buttons, Loading, TextInput } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import BgImg from '../assets/pattern.png';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    birth: '',
    gender: '',
    phone_number: '',
    password: '',
    passwordConfirm: '',
  });

  const { loading, success, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData))
      .then(() => {
        // console.log(error);
        if (!error) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Register Error:', error);
      });
  };

  // console.log(' success', success);

  return (
    <div
      className='w-full h-[100vh] flex items-center justify-center sm:p-6 p-0 '
      style={{
        backgroundImage: `url('${BgImg}')`,
        backgroundSize: '15%',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className='fixed inset-0 transition-opacity'>
        <div className='absolute inset-0 bg-[#fff] opacity-60 '></div>
      </div>
      <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
      &#8203;
      <div
        className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6 opacity-90'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
      >
        <div
          onClick={() => navigate('/')}
          className='w-full flex gap-2 items-center mb-6 cursor-pointer'
        >
          <div className='text-white w-16 h-16 flex items-center'>
            <img src={LogoDark} alt='logo' />
          </div>
          <span className='text-2xl font-semibold text-[#F37125]'>
            MiniMate
          </span>
        </div>

        <p className='text-ascent-1 text-base font-semibold'>
          Create your account
        </p>
        <form className='py-4 flex flex-col' onSubmit={handleSubmit}>
          {error && (
            <span className='text-sm text-[#f64949fe] mt-0.5'>{error}</span>
          )}
          <TextInput
            type='text'
            name='username'
            placeholder='Username'
            label='Username'
            value={formData.username}
            onChange={handleChange}
            required
            styles='w-full'
          />
          <TextInput
            type='email'
            name='email'
            placeholder='Email'
            label='Email'
            value={formData.email}
            onChange={handleChange}
            required
            styles='w-full'
          />
          <TextInput
            type='date'
            name='birth'
            placeholder='Date of Birth'
            label='Date of Birth'
            value={formData.birth}
            onChange={handleChange}
            required
            styles='w-full'
          />
          <TextInput
            type='text'
            name='gender'
            placeholder='Gender'
            label='Gender'
            value={formData.gender}
            onChange={handleChange}
            required
            styles='w-full'
          />
          <TextInput
            type='tel'
            name='phone_number'
            placeholder='Phone Number'
            label='Phone Number'
            value={formData.phone_number}
            onChange={handleChange}
            required
            styles='w-full'
          />
          <TextInput
            type='password'
            name='password'
            placeholder='Password'
            label='Password'
            value={formData.password}
            onChange={handleChange}
            required
            styles='w-full'
          />
          <TextInput
            type='password'
            name='passwordConfirm'
            placeholder='Confirm Password'
            label='Confirm Password'
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
            styles='w-full'
          />
          <Buttons
            type='submit'
            containerStyles={`inline-flex justify-center rounded-md bg-[#F37125] mt-6 px-8 py-3 text-base font-medium text-white outline-none`}
            title='Sign up'
          />
        </form>

        <p className='text-ascent-2 text-sm text-center flex justify-center items-center'>
          Already has an account?
          <div
            onClick={() => navigate('/login')}
            className='text-[#F37125] font-semibold ml-2 cursor-pointer'
          >
            Login
          </div>
        </p>
      </div>
    </div>
  );
};

export default Register;
