import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar'; // <-- 1. Import Navbar
import axios from 'axios';

// ... (ProtectedRoute component remains the same) ...

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get('http://localhost:5001/auth/login/success');
        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        console.error('Error checking auth:', err);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="App">
        {/* 2. Add Navbar here, it will show if a user exists */}
        {user && <Navbar user={user} />}
        
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute user={user}>
                {/* 3. Pass user prop to HomePage */}
                <HomePage user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <LoginPage />} 
          />
          <Route 
            path="/login/failed" 
            element={<p>Login failed. Please try again.</p>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;