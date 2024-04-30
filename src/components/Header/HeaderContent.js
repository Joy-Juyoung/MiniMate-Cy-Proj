// import React from 'react';
// import { Link } from 'react-router-dom';
// import Buttons from '../Buttons';

// import HeaderNav from './HeaderNav';
// import HeaderDropdown from './HeaderDropdown';

// const HeaderContent = ({
//   scrollNav,
//   logo,
//   location,
//   navigate,
//   user,
//   handleBellClick,
//   dropdownRef,
//   dropdownOpen,
//   setDropdownOpen,
//   dispatch,
// }) => {
//   return (
//     <div
//       className='header font-work w-full flex items-center justify-between py-3 md:py-6 px-10 2xl:px-40'
//       style={{
//         backgroundColor: scrollNav ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
//       }}
//     >
//       <Link to='/' className='flex gap-2 items-center'>
//         <div className='w-12 h-12 md:w-14 md:h-14 flex items-center p-1 md:p-2'>
//           <img src={logo} alt='logo' />
//         </div>
//         <span className='text-xl md:text-2xl text-black font-semibold'>
//           MINIMATE
//         </span>
//       </Link>

//       <HeaderNav location={location} navigate={navigate} />

//       <div className='hidden md:flex gap-4 items-center text-xl md:text-2xl'>
//         <button onClick={handleBellClick}>
//           <FaRegBell />
//         </button>
//         <button>
//           <TbShoppingCart />
//         </button>

//         <HeaderDropdown
//           dropdownRef={dropdownRef}
//           isOpen={dropdownOpen}
//           toggleDropdown={setDropdownOpen}
//           navigate={navigate}
//           dispatch={dispatch}
//           user={user}
//         />
//       </div>

//       <div className='flex md:hidden text-2xl'>
//         <button>
//           <MdMenu />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HeaderContent;
