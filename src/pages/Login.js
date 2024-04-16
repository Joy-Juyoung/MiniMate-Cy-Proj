import React, { useState } from 'react';
import LogoDark from '../assets/logo-dark.png';
import { Buttons, Loading, TextInput } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {};

  const [errMsg, setErrMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-2/3 h-fit p-6 lg:p-8 flex flex-col justify-center bg-primary rounded-xl overflow-hidden shadow-xl'>
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
          Log in to your account
        </p>
        <form
          className='py-4 flex flex-col gap-5='
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            name='email'
            placeholder='email@example.com'
            label='Email Address'
            type='email'
            // useForm - register. Allows an input or select element and apply validation rules to React Hook Form
            // By invoking the register function and supplying an input's name
            register={register('email', {
              required: 'Email Address is required',
            })}
            styles='w-full rounded-full'
            labelStyle='ml-2'
            error={errors.email ? errors.email.message : ''}
          />
          <TextInput
            name='password'
            label='Password'
            placeholder='Password'
            type='password'
            styles='w-full rounded-full'
            labelStyle='ml-2'
            register={register('password', {
              required: 'Password is required',
            })}
            error={errors.password ? errors.password?.message : ''}
          />

          {errMsg?.message && (
            <span
              className={`text-sm ${
                errMsg?.status == 'failed'
                  ? 'text-[#f64949fe]'
                  : 'text-[#2ba150fe]'
              } mt-0.5`}
            >
              {errMsg?.message}
            </span>
          )}

          {isSubmitting ? (
            <Loading />
          ) : (
            <Buttons
              type='submit'
              containerStyles={`inline-flex justify-center rounded-md bg-[#F37125] mt-6 px-8 py-3 text-base font-medium text-white outline-none`}
              title='Login'
            />
          )}
        </form>
        <p className='text-ascent-2 text-sm text-center'>
          Don't have an account?
          <Link
            to='/register'
            className='text-[#F37125] font-semibold ml-2 cursor-pointer'
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
