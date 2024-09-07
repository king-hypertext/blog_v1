import React from 'react'
import logo from '../assets/images/icon.svg'
export default function Header() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <a href='/' className="navbar-brand">
          <img src={logo} alt="OOKINGSLEY BLOG" style={{ width: 35 + 'px' }} />
          <span className='text-white text-uppercase'>ookingsley blog</span>
        </a>
        <div className="container-fluid">
          <ul className="nav">
            <li className="nav-item">
              <a href='/' className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href='/about' className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href='/contact' className="nav-link">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
