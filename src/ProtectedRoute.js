import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { me, loading } = useSelector((state) => state.user);

  if (loading) {
    return null; // 로딩 중일 때는 아무것도 렌더링하지 않음
  }

  return me ? <Element {...rest} /> : <Navigate to='/' />;
};

export default ProtectedRoute;
