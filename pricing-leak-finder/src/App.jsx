import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Landing from './components/Landing.jsx';
import Quiz from './components/Quiz.jsx';
import Report from './components/Report.jsx';

export default function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </HashRouter>
  );
}
