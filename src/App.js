import './App.css';
import Home from './pages/Home';
import ViewCar from './pages/ViewCar'
import MyNavbar from "./components/MyNavbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import SearchCars from './pages/SearchCars';

function App() {
  return (
    <div className="App">
      <Router>
        <MyNavbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/viewCar/:cid" element={<ViewCar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
