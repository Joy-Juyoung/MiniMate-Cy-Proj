import React, { useState } from 'react';

import {
  CategoryManagement,
  ProductManagement,
  UserManagement,
  ProductUpload,
  AdminSidebar,
} from '../components/Admin';

const Admin = ({ me }) => {
  const [selectedSection, setSelectedSection] = useState('user');

  const renderSection = () => {
    switch (selectedSection) {
      case 'user':
        return <UserManagement />;
      case 'category':
        return <CategoryManagement me={me} />;
      case 'product':
        return <ProductManagement />;
      default:
        return null;
    }
  };

  return (
    <div className='w-full h-[100vh] flex flex-row py-16 px-10 2xl:px-40 '>
      <AdminSidebar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      {/* Main Content */}
      <div className='flex-1 py-16 px-10 2xl:px-40'>
        {selectedSection === 'user' && <UserManagement />}
        {renderSection()}
      </div>
    </div>
  );
};

export default Admin;
