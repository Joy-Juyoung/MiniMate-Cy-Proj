import React from 'react';

const NoticeModal = ({ closeModal, children, requestId }) => {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'
      onClick={handleOutsideClick}
    >
      {!requestId ? (
        <div className='bg-white p-8 rounded-md shadow-md'>{children}</div>
      ) : (
        <div className='rounded-md shadow-md'>{children}</div>
      )}
    </div>
  );
};

export default NoticeModal;
