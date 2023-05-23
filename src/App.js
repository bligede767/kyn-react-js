import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
