import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import ChatApp from './components/ChatApp';
import JoinForm from './components/JoinForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<JoinForm />} />
          <Route path="/chat" element={<ChatApp />} />
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;