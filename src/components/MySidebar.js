import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

export default function MySidebar() {
  return (
    <div class="sidebar">
      <Link to="/">
        <h2>XYZ Car</h2>
      </Link>
      <ul>
        <li><Link to="/"><i class="fas fa-home"></i>Home</Link></li>
        {/* <li><Link to="/"><i class="fas fa-home"></i>Profile</Link></li> */}
        {/* <li><Link to="/login"><i class="fas fa-home"></i>Login</Link></li> */}
        {/* <li><Link to="/signup"><i class="fas fa-home"></i>Sign Up</Link></li> */}
        <li><Link to="/message"><i class="fas fa-home"></i>Message</Link></li>
        <li><i class="fas fa-project-diagram"></i><SearchBar /></li>
      </ul>
    </div>
  )
}
