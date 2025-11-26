// components/RedirectToAppropriatePage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from "../redux/store";
const RedirectToAppropriatePage = () => {
  const navigate = useNavigate();
 const token = store.getState().block.token;
  useEffect(() => {
   
    if (token) {
      navigate('/Dashboard', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return null; // or a loading indicator
};

export default RedirectToAppropriatePage;
