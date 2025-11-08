import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import './assets/css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/organization" element={<About />} />
            <Route path="/about/vision" element={<About />} />
            <Route path="/about/mission" element={<About />} />
            <Route path="/about/values" element={<About />} />
            <Route path="/about/founder" element={<About />} />
            <Route path="/about/co-founder" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/corporate" element={<Programs />} />
            <Route path="/programs/educational" element={<Programs />} />
            <Route path="/programs/certification" element={<Programs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/photos" element={<Gallery />} />
            <Route path="/gallery/videos" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;