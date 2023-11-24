import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Features from './components/Features';
import Footer from './components/Footer';
import TokenSale from './components/TokenSale';
import Team from './components/Team';
import Contact from './components/Contact';
import SignupForm from './components/SignupForm';

import "./App.css"


const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bt-2" element={<Features />} />
          <Route path="/token-sale" element={<TokenSale />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignupForm />} />
          {/* Agrega rutas para otras secciones */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
