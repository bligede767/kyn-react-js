import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

export default function MySidebar(props) {
  return (
    <div class="sidebar">
      <Link to="/">
        <h2>XYZ Car</h2>
      </Link>
      <ul>
        {props.authenticated ?
          <li><Link to="/"><i class="fas fa-home"></i>Home</Link></li>
          : <></>}
        {!props.authenticated ?
          <li><Link to="/login"><i class="fas fa-home"></i>Login</Link></li> : <></>}
        {props.authenticated ?
          <li><i class="fas fa-project-diagram"></i><SearchBar /></li>
          : <></>}
        {props.authenticated ?
          <li><Link onClick={props.onLogout}><i class="fas fa-home"></i>Log Out</Link></li>
          : <></>}
      </ul>
    </div>
  )

}