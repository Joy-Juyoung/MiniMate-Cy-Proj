import React, { useState } from 'react';
import LogoDark from '../assets/logo-dark.png';
import { Buttons, Loading, TextInput } from '../components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {};

  const [errMsg, setErrMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-2/3 h-fit p-6 lg:p-8 flex flex-col justify-center bg-primary rounded-xl overflow-hidden shadow-xl'>
        <div className='w-full flex gap-2 items-center mb-6'>
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
        <form
          className='py-4 flex flex-col gap-5='
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
            <TextInput
              name='firstName'
              label='First Name'
              placeholder='First Name'
              type='text'
              styles='w-full'
              register={register('firstName', {
                required: 'First Name is required!',
              })}
              error={errors.firstName ? errors.firstName?.message : ''}
            />

            <TextInput
              label='Last Name'
              placeholder='Last Name'
              type='lastName'
              styles='w-full'
              register={register('lastName', {
                required: 'Last Name do no match',
              })}
              error={errors.lastName ? errors.lastName?.message : ''}
            />
          </div>

          <TextInput
            name='email'
            placeholder='email@example.com'
            label='Email Address'
            type='email'
            register={register('email', {
              required: 'Email Address is required',
            })}
            styles='w-full'
            error={errors.email ? errors.email.message : ''}
          />

          <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
            <TextInput
              name='password'
              label='Password'
              placeholder='Password'
              type='password'
              styles='w-full'
              register={register('password', {
                required: 'Password is required',
              })}
              error={errors.password ? errors.password?.message : ''}
            />

            <TextInput
              label='Confirm Password'
              placeholder='Password'
              type='password'
              styles='w-full'
              register={register('cPassword', {
                validate: (value) => {
                  const { password } = getValues();

                  if (password != value) {
                    return 'Passwords do no match';
                  }
                },
              })}
              error={
                errors.cPassword && errors.cPassword.type === 'validate'
                  ? errors.cPassword?.message
                  : ''
              }
            />
          </div>

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
              title='Create Account'
            />
          )}
        </form>
        <p className='text-ascent-2 text-sm text-center'>
          Already has an account?
          <Link
            to='/login'
            className='text-[#F37125] font-semibold ml-2 cursor-pointer'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
