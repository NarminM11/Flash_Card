import './App.css';
import React from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/Home';
import FlashcardsPage from './components/FlashCards';
import ContactPage from "./components/Contact"
import Navbar from './components/Navbar';


function App() {
    return (
        <BrowserRouter>
        <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/flashcards" element={<FlashcardsPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                </Routes>
        </BrowserRouter>
    );
}

export default App;