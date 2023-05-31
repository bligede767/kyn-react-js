import './App.css';
import React, { Component } from 'react';
import Home from './pages/Home';
import ViewCar from './pages/ViewCar'
import MySidebar from "./components/MySidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import SearchCars from './pages/SearchCars';
import AddCar from './pages/AddCar'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { ACCESS_TOKEN } from './constants'
import { getCurrentUser } from './util/APIUtils'
import OAuth2RedirectHandler from './user/oauth2/OAuth2RedirectHandler';
// import Alert from 'react-s-alert';
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
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    // Alert.error("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }
  render() {
    return (
      <div className="App wrapper">
        <Router>
          <MySidebar />
          <div className="main_content">
            <div className="container ">
              <Routes>
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/addcar" element={<AddCar />} />
                <Route exact path="/viewCar/:cid" element={<ViewCar />} />
                <Route exact path="/search/by/:filter/q/:q" element={<SearchCars />} />
                <Route exact path="/search/by/:filter/min/:min" element={<SearchCars />} />
                <Route exact path="/search/by/:filter/max/:max" element={<SearchCars />} />
                <Route exact path="/search/by/:filter/min/:min/max/:max" element={<SearchCars />} />
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
