import React, { Component, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import useProfile from '../util/UserInfo';

export default function MySidebar(props) {
  const { token, profile } = useProfile();
  const navigate = useNavigate();

  // console.log(profile?.role)
  return (
    <div className="sidebar">
      <Link to="/">
        <h2>🏘 KYN</h2>
      </Link>
      <ul>
        {token ?
          <li><Link to="/"><i className="fas fa-home"></i>🏠 Home</Link></li>
          : <></>}
        {(token && profile?.role === 'ROLE_ADMIN') ?
          <li><Link to="/admin/users"><i className="fas fa-home"></i>👥 User Management</Link></li>
          : <></>}
        {(token && profile?.role === 'ROLE_ADMIN') ?
          <li><Link to="/admin/cars"><i className="fas fa-home"></i>🚘 Car Management</Link></li>
          : <></>}
        {token ?
          <li><Link to="/profile"><i className="fas fa-home"></i>👤 Profile</Link></li>
          : <></>}
        {!token ?
          <li><Link to="/login"><i className="fas fa-home"></i>📲 Login</Link></li> : <></>}
        {token ?
          <li><i className="fas fa-project-diagram"></i><SearchBar /></li>
          : <></>}
        {token ?
          <li><Link to="/login" onClick={() => {
            const isLogout = props?.onLogout()
            if (isLogout) {
              navigate('/login', { replace: true });
            }
          }}><i className="fas fa-home"></i>🚪 Log Out</Link></li>
          : <></>}
      </ul>
    </div>
  )

}