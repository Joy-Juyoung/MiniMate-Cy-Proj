// // // import React, { useEffect, useState } from 'react';
// // import LogoDark from '../assets/logo-dark.png';
// // import { Buttons, Loading, TextInput } from '../components';
// // import { Link, useNavigate } from 'react-router-dom';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { toast } from 'react-toastify';
// // // import { useForm } from 'react-hook-form';
// // import BgImg from '../assets/pattern.png';
// // // import { signupUser } from '../redux/authSlice';

// const Register = () => {
//   // const {
//   //   register,
//   //   handleSubmit,
//   //   getValues,
//   //   formState: { errors },
//   // } = useForm({
//   //   mode: 'onChange',
//   // });
//   const navigate = useNavigate();

//   // const onSubmit = async (data) => {};

//   // const [errMsg, setErrMsg] = useState('');
//   // const [isSubmitting, setIsSubmitting] = useState(false);
//   // const dispatch = useDispatch();

//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     birth: '',
//     gender: '',
//     phone_number: '',
//     password: '',
//     passwordConfirm: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(signupUser(formData));
//   };

//   // dispatch(signupUser(formData))
//   // .unwrap()
//   // .then(() => {
//   //   navigate('/login');
//   // })
//   // .catch((error) => {
//   //   console.error('Signup error:', error);
//   // });

//   return (
//     // <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center sm:p-6 p-0'>
//     //   <div className='w-full h-[100vh] sm:w-1/2 xl:w-1/3 2xl:w-1/4 sm:h-fit p-6 lg:p-8 flex flex-col justify-center bg-primary rounded-xl overflow-hidden shadow-xl'>
//     <div
//       className='w-full h-[100vh] flex items-center justify-center sm:p-6 p-0 '
//       style={{
//         backgroundImage: `url('${BgImg}')`,
//         backgroundSize: '15%',
//         backgroundRepeat: 'repeat',
//       }}
//     >
//       <div className='fixed inset-0 transition-opacity'>
//         <div className='absolute inset-0 bg-[#fff] opacity-60 '></div>
//       </div>
//       <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
//       &#8203;
//       <div
//         className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6 opacity-90'
//         role='dialog'
//         aria-modal='true'
//         aria-labelledby='modal-headline'
//       >
//         <div
//           onClick={() => navigate('/')}
//           className='w-full flex gap-2 items-center mb-6 cursor-pointer'
//         >
//           <div className='text-white w-16 h-16 flex items-center'>
//             <img src={LogoDark} alt='logo' />
//           </div>
//           <span className='text-2xl font-semibold text-[#F37125]'>
//             MiniMate
//           </span>
//         </div>

//         <p className='text-ascent-1 text-base font-semibold'>
//           Create your account
//         </p>

//         <form className='py-4 flex flex-col' onSubmit={handleSubmit}>
//           <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
//             <TextInput
//               label='Username'
//               placeholder='Username'
//               type='text'
//               name='username'
//               value={formData.username}
//               onChange={handleChange}
//               required
//               styles='w-full'
//             />
//           </div>
//           {/* <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
//             <TextInput
//               label='email'
//               placeholder='Email'
//               type='email'
//               name='email'
//               value={formData.email}
//               onChange={handleChange}
//               required
//               styles='w-full'
//             />
//           </div> */}
//           {/* <div className='w-full flex flex-col sm:flex-row gap-1 md:gap-2'>
//             <TextInput
//               label='birth'
//               placeholder='Birth'
//               type='date'
//               name='birth'
//               value={formData.birth}
//               onChange={handleChange}
//               required
//               styles='w-full'
//             />
//             <TextInput
//               label='Gender'
//               placeholder='Gender'
//               type='text'
//               name='gender'
//               value={formData.gender}
//               onChange={handleChange}
//               required
//               styles='w-full'
//             />
//           </div> */}
//           {/* <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
//             <TextInput
//               label='Phone'
//               placeholder='Phone'
//               type='text'
//               name='phone_number'
//               value={formData.phone_number}
//               onChange={handleChange}
//               required
//               styles='w-full'
//             />
//           </div> */}
//           {/* <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
//             <TextInput
//               label='Password'
//               placeholder='Password'
//               type='password'
//               name='password'
//               value={formData.password}
//               onChange={handleChange}
//               required
//               styles='w-full'
//             />
//           </div> */}
//           {/* <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
//             <TextInput
//               label='Confirm Password'
//               placeholder='Confirm Password'
//               type='password'
//               name='passwordConfirm'
//               value={formData.passwordConfirm}
//               onChange={handleChange}
//               required
//               styles='w-full'
//             />
//           </div> */}
//           <Buttons
//             type='submit'
//             containerStyles={`inline-flex justify-center rounded-md bg-[#F37125] mt-6 px-8 py-3 text-base font-medium text-white outline-none`}
//             title='Create Account'
//           />
//         </form>

//         <p className='text-ascent-2 text-sm text-center'>
//           Already has an account?
//           <Link
//             to='/login'
//             className='text-[#F37125] font-semibold ml-2 cursor-pointer'
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// // // export default Register;

// // import React, { useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // // import { TextInput } from '../components';
// // import { registerUser } from '../redux/authSlice';

// // const Register = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     birth: '',
// //     gender: '',
// //     phone_number: '',
// //     password: '',
// //     passwordConfirm: '',
// //   });

// //   const { loading, success, error } = useSelector(
// //     (state) => state.registration
// //   );

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     dispatch(registerUser(formData));
// //   };

// //   return (
// //     <div>
// //       <h2>Register</h2>
// //       {loading && <p>Loading...</p>}
// //       {error && <p>Error: {error}</p>}
// //       {success && <p>Registration successful!</p>}
// //       <form onSubmit={handleSubmit}>
// //         <TextInput
// //           type='text'
// //           name='username'
// //           placeholder='Username'
// //           value={formData.username}
// //           onChange={handleChange}
// //         />
// //         <input
// //           type='email'
// //           name='email'
// //           placeholder='Email'
// //           value={formData.email}
// //           onChange={handleChange}
// //         />
// //         <input
// //           type='date'
// //           name='birth'
// //           placeholder='Date of Birth'
// //           value={formData.birth}
// //           onChange={handleChange}
// //         />
// //         <input
// //           type='text'
// //           name='gender'
// //           placeholder='Gender'
// //           value={formData.gender}
// //           onChange={handleChange}
// //         />
// //         <input
// //           type='tel'
// //           name='phone_number'
// //           placeholder='Phone Number'
// //           value={formData.phone_number}
// //           onChange={handleChange}
// //         />
// //         <input
// //           type='password'
// //           name='password'
// //           placeholder='Password'
// //           value={formData.password}
// //           onChange={handleChange}
// //         />
// //         <input
// //           type='password'
// //           name='passwordConfirm'
// //           placeholder='Confirm Password'
// //           value={formData.passwordConfirm}
// //           onChange={handleChange}
// //         />
// //         <button type='submit'>Register</button>
// //       </form>
// //     </div>

// //     // <div
// //     //   className='w-full h-[100vh] flex items-center justify-center sm:p-6 p-0 '
// //     //   style={{
// //     //     backgroundImage: `url('${BgImg}')`,
// //     //     backgroundSize: '15%',
// //     //     backgroundRepeat: 'repeat',
// //     //   }}
// //     // >
// //     //   <div className='fixed inset-0 transition-opacity'>
// //     //     <div className='absolute inset-0 bg-[#fff] opacity-60 '></div>
// //     //   </div>
// //     //   <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
// //     //   &#8203;
// //     //   <div
// //     //     className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6 opacity-90'
// //     //     role='dialog'
// //     //     aria-modal='true'
// //     //     aria-labelledby='modal-headline'
// //     //   >
// //     //     <div
// //     //       onClick={() => navigate('/')}
// //     //       className='w-full flex gap-2 items-center mb-6 cursor-pointer'
// //     //     >
// //     //       <div className='text-white w-16 h-16 flex items-center'>
// //     //         <img src={LogoDark} alt='logo' />
// //     //       </div>
// //     //       <span className='text-2xl font-semibold text-[#F37125]'>
// //     //         MiniMate
// //     //       </span>
// //     //     </div>

// //     //     <p className='text-ascent-1 text-base font-semibold'>
// //     //       Create your account
// //     //     </p>

// //     //     <form className='py-4 flex flex-col' onSubmit={handleSubmit}>
// //     //       <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
// //     //         <TextInput
// //     //           label='Username'
// //     //           placeholder='Username'
// //     //           type='text'
// //     //           name='username'
// //     //           value={formData.username}
// //     //           onChange={handleChange}
// //     //           required
// //     //           styles='w-full'
// //     //         />
// //     //       </div>
// //     //       {/* <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
// //     //         <TextInput
// //     //           label='email'
// //     //           placeholder='Email'
// //     //           type='email'
// //     //           name='email'
// //     //           value={formData.email}
// //     //           onChange={handleChange}
// //     //           required
// //     //           styles='w-full'
// //     //         />
// //     //       </div> */}
// //     //       {/* <div className='w-full flex flex-col sm:flex-row gap-1 md:gap-2'>
// //     //         <TextInput
// //     //           label='birth'
// //     //           placeholder='Birth'
// //     //           type='date'
// //     //           name='birth'
// //     //           value={formData.birth}
// //     //           onChange={handleChange}
// //     //           required
// //     //           styles='w-full'
// //     //         />
// //     //         <TextInput
// //     //           label='Gender'
// //     //           placeholder='Gender'
// //     //           type='text'
// //     //           name='gender'
// //     //           value={formData.gender}
// //     //           onChange={handleChange}
// //     //           required
// //     //           styles='w-full'
// //     //         />
// //     //       </div> */}
// //     //       {/* <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
// //     //         <TextInput
// //     //           label='Phone'
// //     //           placeholder='Phone'
// //     //           type='text'
// //     //           name='phone_number'
// //     //           value={formData.phone_number}
// //     //           onChange={handleChange}
// //     //           required
// //     //           styles='w-full'
// //     //         />
// //     //       </div> */}
// //     //       {/* <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
// //     //         <TextInput
// //     //           label='Password'
// //     //           placeholder='Password'
// //     //           type='password'
// //     //           name='password'
// //     //           value={formData.password}
// //     //           onChange={handleChange}
// //     //           required
// //     //           styles='w-full'
// //     //         />
// //     //       </div> */}
// //     //       {/* <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
// //     //         <TextInput
// //     //           label='Confirm Password'
// //     //           placeholder='Confirm Password'
// //     //           type='password'
// //     //           name='passwordConfirm'
// //     //           value={formData.passwordConfirm}
// //     //           onChange={handleChange}
// //     //           required
// //     //           styles='w-full'
// //     //         />
// //     //       </div> */}
// //     //       <Buttons
// //     //         type='submit'
// //     //         containerStyles={`inline-flex justify-center rounded-md bg-[#F37125] mt-6 px-8 py-3 text-base font-medium text-white outline-none`}
// //     //         title='Create Account'
// //     //       />
// //     //     </form>

// //     //     <p className='text-ascent-2 text-sm text-center'>
// //     //       Already has an account?
// //     //       <Link
// //     //         to='/login'
// //     //         className='text-[#F37125] font-semibold ml-2 cursor-pointer'
// //     //       >
// //     //         Login
// //     //       </Link>
// //     //     </p>
// //     //   </div>
// //     // </div>
// //   );
// // };

// // export default Register;
