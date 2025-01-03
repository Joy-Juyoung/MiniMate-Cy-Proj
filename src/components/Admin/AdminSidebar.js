import React, { useState } from 'react';
import { FaUsers, FaBox, FaListAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='w-full pb-8'>
      <h1 className='text-3xl font-semibold mb-4'>Admin</h1>
      <ul className='w-full flex justify-between gap-4'>
        <li
          className={`w-full text-[0.7rem] flex gap-4 items-center justify-center border cursor-pointer rounded-lg py-2 ${
            location.pathname === '/admin/user'
              ? 'font-bold bg-black text-white'
              : ''
          }`}
          onClick={() => navigate('/admin/user')}
        >
          <FaUsers className='text-xl' />
          <span>User</span>
        </li>
        <li
          className={`w-full text-[0.7rem] flex gap-4 items-center justify-center border cursor-pointer rounded-lg py-2 ${
            location.pathname === '/admin/category'
              ? 'font-bold bg-black text-white'
              : ''
          }`}
          onClick={() => navigate('/admin/category')}
        >
          <FaListAlt className='text-xl' />
          <span>Category</span>
        </li>
        <li
          className={`w-full text-[0.7rem] flex gap-4 items-center justify-center border cursor-pointer rounded-lg py-2 ${
            location.pathname === '/admin/product'
              ? 'font-bold bg-black text-white'
              : ''
          }`}
          onClick={() => navigate('/admin/product')}
        >
          <FaBox className='text-xl' />
          <span>Product</span>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
