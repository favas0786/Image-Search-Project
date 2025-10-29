import React from 'react';

const LoginPage = () => {
  const googleLogin = () => {
    // This URL must match your backend auth route
    window.open('http://localhost:5001/auth/google', '_self');
  };
  const githubLogin = () => {
    window.open('http://localhost:5001/auth/github', '_self');
  };
  const facebookLogin = () => {
    window.open('http://localhost:5001/auth/facebook', '_self');
  };

  return (
    <div className="login-page">
      <h2>Welcome to Image Search</h2>
      <p>Please log in to continue</p>
      <div className="login-buttons">
        <button className="login-btn google" onClick={googleLogin}>
          Login with Google
        </button>
        <button className="login-btn github" onClick={githubLogin}>
          Login with GitHub
        </button>
        <button className="login-btn facebook" onClick={facebookLogin}>
          Login with Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginPage;