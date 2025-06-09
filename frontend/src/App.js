import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import Signup from './User/Signup';
import Login from './User/Login';
import Home from './Home/Home';
import Header from './Components/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './Components/Footer';
import Canteen from './Canteen/Canteen';
import './App.css';
import Order from './Orders/Order';
import About from "./Home/About";
import Cart from './cart/viewCart';
import TrackOrder from './cart/trackOrder';

function App() {

  return (
    <AuthProvider>
    <div className="app-container">
      <Header className="fixed-header" />
      <div className="content">
        <Routes>
         
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home />}/>
          <Route path="/canteen" element={<Canteen />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorder" element={<TrackOrder />} />
        </Routes>
        </div>
        <Footer className="fixed-footer" />
      
    </div>
    </AuthProvider>
  )
}

export default App;