import React from "react";

const NoticeModal = ({
  closeModal,
  children,
  requestId,
  friendId,
  userHome,
}) => {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      {friendId || requestId || userHome ? (
        <div className="bg-white rounded-md shadow-md">{children}</div>
      ) : (
        <div className="p-8 bg-white rounded-md shadow-md">{children}</div>
      )}
    </div>
  );
};

export default NoticeModal;
