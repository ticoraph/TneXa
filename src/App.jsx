import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import LegalMentions from './pages/LegalMentions';
import Partners from './pages/Partners';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    <Route path="/legal-mentions" element={<LegalMentions />} />
                    <Route path="/partners" element={<Partners />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
