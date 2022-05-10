import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
export default function Toast() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
}
