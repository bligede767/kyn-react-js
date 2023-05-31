import './App.css';
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
import SendMessage from './pages/SendMessage';

function App() {
  return (
    <div className="App wrapper">
      <Router>
        <MySidebar />
        <div className="main_content">
          <div className="container ">
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/addcar" element={<AddCar />} />
              <Route exact path="/message" element={<SendMessage />} />
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

export default App;
