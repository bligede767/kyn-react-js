import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import useProfile from '../util/UserInfo';

export default function MySidebar(props) {
  const { token, profile } = useProfile();

  // console.log(profile?.role)
  return (
    <div className="sidebar">
      <Link to="/">
        <h2>XYZ Car</h2>
      </Link>
      <ul>
        {token ?
          <li><Link to="/"><i className="fas fa-home"></i>Home</Link></li>
          : <></>}
        {(token && profile?.role === 'ROLE_ADMIN') ?
          <li><Link to="/admin/users"><i className="fas fa-home"></i>Admin</Link></li>
          : <></>}
        {token ?
          <li><Link to="/profile"><i className="fas fa-home"></i>Profile</Link></li>
          : <></>}
        {!token ?
          <li><Link to="/login"><i className="fas fa-home"></i>Login</Link></li> : <></>}
        {token ?
          <li><i className="fas fa-project-diagram"></i><SearchBar /></li>
          : <></>}
        {token ?
          <li><Link onClick={props.onLogout}><i className="fas fa-home"></i>Log Out</Link></li>
          : <></>}
      </ul>
    </div>
  )

}