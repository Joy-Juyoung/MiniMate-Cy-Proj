import React from "react";

const NoticeModal = ({ closeModal, children, requestId, friendId }) => {
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
      {!friendId || !requestId ? (
        <div className="bg-white rounded-md shadow-md">{children}</div>
      ) : (
        <div className="rounded-md shadow-md">{children}</div>
      )}
    </div>
  );
};

export default NoticeModal;
