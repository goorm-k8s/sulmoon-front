import React from 'react';

import './App.css';
import Login from './Login';
import Navbar from './Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Login" exact element={<Login />} />
        <Route path='/oauth/kakao/callback' element={<Auth />} />
      </Routes>
    </Router>
  );
}


