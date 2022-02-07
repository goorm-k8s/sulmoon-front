import React from 'react';

import Login from './pages/Login';
import Navbar from './Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Question_form from './components/Question_form';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Login" exact element={<Login />} />
        <Route path="/oauth/kakao/callback" element={<Auth />} />
        <Route path="/Question_form" exact element={<Question_form/>} />
      </Routes>
    </Router>
  );
}


