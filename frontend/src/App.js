import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './Dashboard';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('username') || '');

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
