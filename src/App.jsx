import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import LegalMentions from './pages/LegalMentions';
import Partners from './pages/Partners';
import TneGa from './pages/TneGa';
import TneKa from './pages/TneKa';
import TneMa from './pages/TneMa';
import TneLa from './pages/TneLa';
import TneRa from './pages/TneRa';
import TneVa from './pages/TneVa';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <ScrollToTop />
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    <Route path="/legal-mentions" element={<LegalMentions />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/engines/tnega" element={<TneGa />} />
                    <Route path="/engines/tneka" element={<TneKa />} />
                    <Route path="/engines/tnema" element={<TneMa />} />
                    <Route path="/engines/tnela" element={<TneLa />} />
                    <Route path="/engines/tnera" element={<TneRa />} />
                    <Route path="/engines/tneva" element={<TneVa />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
