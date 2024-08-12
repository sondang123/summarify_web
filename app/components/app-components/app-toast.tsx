import React from "react";
import { ToastContainer } from "react-toastify";
export const AppToast: React.FC = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      style={{ zIndex: "10000000" }}
      pauseOnHover
    />
  );
};
