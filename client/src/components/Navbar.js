import React from 'react';

const Navbar = ({ user }) => {
  const logout = () => {
    // This URL must match your backend auth route
    window.open('http://localhost:5001/auth/logout', '_self');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-logo">ImageSearch</span>
        <div className="navbar-menu">
          {user && (
            <>
              <span className="navbar-user">Hi, {user.displayName}</span>
              <button className="navbar-btn" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;