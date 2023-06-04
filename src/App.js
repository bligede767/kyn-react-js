import './App.css';
import React, { Component } from 'react';
import Home from './pages/Home';
import ViewCar from './pages/ViewCar'
import MySidebar from "./components/MySidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SearchCars from './pages/SearchCars';
import AddCar from './pages/AddCar'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { ACCESS_TOKEN } from './constants'
import { getCurrentUser } from './util/APIUtils'
import OAuth2RedirectHandler from './user/oauth2/OAuth2RedirectHandler';
import Profile from './user/profile/Profile'
import UserManagement from './admin/UserManagement';
import EditProfileModal from './components/EditProfilePage'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false
        });
      }).catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  handleLogout() {
    try {
      localStorage.removeItem(ACCESS_TOKEN);
      this.setState({
        authenticated: false,
        currentUser: null
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }
  render() {
    return (
      <div className="App wrapper">
        <Router>
          <MySidebar authenticated={this.state.authenticated} onLogout={this.handleLogout} />
          <div className="main_content">
            <div className="container ">
              <Routes>
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/update-user/:id" element={<EditProfileModal />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login authenticated={this.state.authenticated} />} />
                <Route path="/profile" element={<Profile data={this.state} />} />
                <Route path="/signup" element={<SignUp authenticated={this.state.authenticated} />} />
                <Route path="/addcar" element={<AddCar />} />
                <Route path="/viewCar/:cid" element={<ViewCar />} />
                <Route path="/search/by/:filter/q/:q" element={<SearchCars />} />
                <Route path="/search/by/:filter/year/:q" element={<SearchCars />} />
                <Route path="/search/by/:filter/min/:min" element={<SearchCars />} />
                <Route path="/search/by/:filter/max/:max" element={<SearchCars />} />
                <Route path="/search/by/:filter/min/:min/max/:max" element={<SearchCars />} />
              </Routes>
            </div>
          </div>
        </Router>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.7.2/dist/js/bootstrap.bundle.min.js"></script>
      </div>
    );
  }
}
export default App;
