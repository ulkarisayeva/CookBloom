import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Header from './layout/Header';
import Footer from './layout/Footer';
import About from './components/About';
import Home from "./components/Home";
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile'
import Recipes from './components/Recipes';



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route  path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipes" element={<Recipes />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
