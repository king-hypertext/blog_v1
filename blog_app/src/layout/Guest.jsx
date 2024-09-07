import React from 'react'
import '../assets/styles/auth.css';
import { Outlet } from 'react-router-dom'
import DateTime from '../utilities/DateTime';
function GuestLayout({ props }) {
    console.log(window.location.pathname);

    if (window.location.pathname == '/auth/login' || window.location.pathname == '/auth/create-account') {
        document.body.style.backgroundColor = '#067373';
    }
    return (
        <div className="auth-wrapper">
            <h3 className='h3 text-center fw-bold my-3'>OOKINGSLEY BLOG| {props.title}</h3>
            <Outlet />
            <div className="d-flex justify-content-center">
                <DateTime date time />
            </div>
        </div>
    )
}

export default GuestLayout
