import './App.css';
import Home from './pages/Home';
import ViewCar from './pages/ViewCar'
import MySidebar from "./components/MySidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import SearchCars from './pages/SearchCars';
import AddCar from './pages/AddCar'

function App() {
  return (
    <div className="App wrapper">
      <Router>
        <MySidebar />
        <div className="main_content">
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
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
    </div>
  );
}

export default App;
