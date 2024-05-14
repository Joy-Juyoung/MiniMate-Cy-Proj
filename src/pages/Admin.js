// Admin.js

import React, { useState } from 'react';
import { FaUsers, FaBox, FaListAlt } from 'react-icons/fa';
import {
  CategoryManagement,
  ProductManagement,
  UserManagement,
  ProductUpload,
} from '../components/Admin';

const Admin = () => {
  const [selectedSection, setSelectedSection] = useState('user');

  const renderSection = () => {
    switch (selectedSection) {
      case 'user':
        return <UserManagement />;
      case 'product':
        return <ProductManagement />;
      case 'category':
        return <CategoryManagement />;
      default:
        return null;
    }
  };

  return (
    <div className='w-full h-[100vh] flex flex-row'>
      {/* Sidebar */}
      <div className='bg-gray-200 w-1/4 px-4 py-8'>
        <h1 className='text-3xl font-semibold mb-4'>Admin Panel</h1>
        <ul className='space-y-4'>
          <li
            className={`flex items-center space-x-2 cursor-pointer ${
              selectedSection === 'user' ? 'font-bold' : ''
            }`}
            onClick={() => setSelectedSection('user')}
          >
            <FaUsers className='text-xl' />
            <span>User Management</span>
          </li>
          <li
            className={`flex items-center space-x-2 cursor-pointer ${
              selectedSection === 'product' ? 'font-bold' : ''
            }`}
            onClick={() => setSelectedSection('product')}
          >
            <FaBox className='text-xl' />
            <span>Product Management</span>
          </li>
          <li
            className={`flex items-center space-x-2 cursor-pointer ${
              selectedSection === 'category' ? 'font-bold' : ''
            }`}
            onClick={() => setSelectedSection('category')}
          >
            <FaListAlt className='text-xl' />
            <span>Category Management</span>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className='flex-1 py-16 px-10 2xl:px-40'>
        {/* 상품 업로드 컴포넌트 */}
        {selectedSection === 'product' && <ProductUpload />}
        {/* 나머지 섹션 */}
        {renderSection()}
      </div>
    </div>
  );
};

export default Admin;
